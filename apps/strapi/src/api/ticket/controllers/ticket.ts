/**
 * ticket controller
 */

import { factories } from '@strapi/strapi';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { MailTemplateService } from '../../../extensions/email/templateService';
import { acceptedRequestCustomerTemplate } from '../../../extensions/email/templates/requests/customer/accepted';
import { createdRequestCustomerTemplate } from '../../../extensions/email/templates/requests/customer/created';
import { declinedRequestCustomerTemplate } from '../../../extensions/email/templates/requests/customer/declined';
import { createdRequestHelperTemplate } from '../../../extensions/email/templates/requests/helper/created';
import { TicketLogService } from '../services/log';

const createSchema = z
  .object({
    helper: z.number(),
    service: z.number(),

    customer: z.object({
      name: z.string(),
      about: z.string().optional(),
      email: z.string().email(),
      phone: z.string().optional(),
      agb: z.boolean().refine((v) => v, { message: 'notChecked' }),
    }),
  })
  .required();

export default factories.createCoreController(
  'api::ticket.ticket',
  ({ strapi }) => ({
    async create(ctx) {
      const ret = createSchema.safeParse(ctx.request.body?.data ?? {});

      if (ret.success !== true) {
        return ctx.badRequest('Bad Request', { errors: ret.error.issues });
      }

      const requestData = {
        ...ret.data,
        shortID: nanoid(),
        editID: nanoid(),
      };

      const newTicket = await strapi.service('api::ticket.ticket')!.create!({
        data: requestData,
        populate: { helper: true, service: true },
      });

      // send mail
      const mailService = strapi.service(
        'plugin::email.template',
      ) as MailTemplateService;
      const helperTemplate = mailService.getTemplate(
        createdRequestHelperTemplate,
        {
          customer: ret.data.customer as any,
          helper: newTicket.helper,
          service: newTicket.service,
        },
      );
      const customerTemplate = mailService.getTemplate(
        createdRequestCustomerTemplate,
        {
          customer: ret.data.customer as any,
          helper: newTicket.helper,
          service: newTicket.service,
        },
      );
      await mailService.send(helperTemplate, { to: newTicket.helper });
      await mailService.send(customerTemplate, {
        to: ret.data.customer as any,
      });

      const sanitizedResult = await this.sanitizeOutput(newTicket, ctx);
      return this.transformResponse(sanitizedResult);
    },

    async accept(ctx) {
      const helper = await strapi
        .service('api::helper.find')
        .findByUser(ctx.state.user.id);
      if (!helper) return ctx.notFound('no-helper-found');

      const results = await strapi.entityService.findMany(
        'api::ticket.ticket',
        {
          filters: {
            id: ctx.params.id,
            // Limit to owned tickets
            helper: helper.id,
          },
          populate: { log: true },
        },
      );
      const ticket = results[0];
      if (!ticket) return ctx.notFound();

      if (ticket.status !== 'onRequest') {
        return ctx.badRequest('ticket-status-invalid');
      }

      const logEntry = {
        action: 'changeState',
        result: 'accepted',
        date: new Date(),
      };
      const newLogs = [logEntry, ...ticket.log];

      // Update ticket
      let updatedTicket = await strapi.entityService.update(
        'api::ticket.ticket',
        ctx.params.id,
        {
          data: { status: 'accepted', log: newLogs },
          populate: { customer: true },
        },
      );

      // send mail
      const mailService = strapi.service<MailTemplateService>(
        'plugin::email.template',
      );
      const template = mailService.getTemplate(
        acceptedRequestCustomerTemplate,
        {
          customer: updatedTicket.customer,
          helper,
        },
      );
      await mailService.send(template, { to: updatedTicket.customer });

      // add mail send event to log
      updatedTicket = await strapi
        .service<TicketLogService>('api::ticket.log')
        .log(ctx.params.id, {
          action: 'sendMail',
          result: acceptedRequestCustomerTemplate.name,
        });

      const sanitizedResult = await this.sanitizeOutput(updatedTicket, ctx);
      return this.transformResponse(sanitizedResult);
    },

    async cancel(ctx) {
      const helper = await strapi
        .service('api::helper.find')
        .findByUser(ctx.state.user.id);
      if (!helper) return ctx.notFound('no-helper-found');

      const results = await strapi.entityService.findMany(
        'api::ticket.ticket',
        {
          filters: {
            id: ctx.params.id,
            // Limit to owned tickets
            helper: helper.id,
          },
          populate: { log: true },
        },
      );
      const ticket = results[0];
      if (!ticket) return ctx.notFound();

      if (ticket.status !== 'onRequest') {
        return ctx.badRequest('ticket-status-invalid');
      }

      const logEntry = {
        action: 'changeState',
        result: 'declined',
        date: new Date(),
      };
      const newLogs = [logEntry, ...ticket.log];

      // update ticket
      let updatedTicket = await strapi.entityService.update(
        'api::ticket.ticket',
        ctx.params.id,
        {
          data: { status: 'declined', log: newLogs },
          populate: { customer: true },
        },
      );

      // send mail
      const mailService = strapi.service<MailTemplateService>(
        'plugin::email.template',
      );
      const template = mailService.getTemplate(
        declinedRequestCustomerTemplate,
        {
          customer: updatedTicket.customer,
          helper,
        },
      );
      await mailService.send(template, { to: updatedTicket.customer });

      // add mail send event to log
      updatedTicket = await strapi
        .service<TicketLogService>('api::ticket.log')
        .log(ctx.params.id, {
          action: 'sendMail',
          result: declinedRequestCustomerTemplate.name,
        });

      const sanitizedResult = await this.sanitizeOutput(updatedTicket, ctx);
      return this.transformResponse(sanitizedResult);
    },

    async find(ctx) {
      const helper = await strapi
        .service('api::helper.find')
        .findByUser(ctx.state.user.id);
      if (!helper) return ctx.notFound('no-helper-found');

      const sanitizedQueryParams = await this.sanitizeQuery(ctx);

      const results = await strapi.entityService.findMany(
        'api::ticket.ticket',
        {
          ...sanitizedQueryParams,
          filters: {
            $and: [
              sanitizedQueryParams.filters ?? {},
              // Limit to owned tickets
              { helper: helper.id },
            ],
          },
        },
      );
      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults);
    },

    async findOne(ctx) {
      const helper = await strapi
        .service('api::helper.find')
        .findByUser(ctx.state.user.id);
      if (!helper) return ctx.notFound('no-helper-found');

      const sanitizedQueryParams = await this.sanitizeQuery(ctx);

      const result = await strapi.entityService.findMany('api::ticket.ticket', {
        ...sanitizedQueryParams,
        filters: {
          $and: [
            sanitizedQueryParams.filters ?? {},
            {
              id: ctx.params.id,
              // Limit to owned tickets
              helper: helper.id,
            },
          ],
        },
      });
      const sanitizedResult = await this.sanitizeOutput(result[0], ctx);

      return this.transformResponse(sanitizedResult);
    },
  }),
);
