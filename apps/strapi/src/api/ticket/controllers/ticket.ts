/**
 * ticket controller
 */

import { factories } from '@strapi/strapi';
import { nanoid } from 'nanoid';
import { z } from 'zod';

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

      const result = await strapi.service('api::ticket.ticket').create({
        data: requestData,
      });

      // TODO: MAIL SENDOUT

      const sanitizedResult = await this.sanitizeOutput(result, ctx);
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
        error: null,
        date: new Date(),
      };
      const newLogs = [logEntry, ...ticket.log];

      const updatedTicket = await strapi.entityService.update(
        'api::ticket.ticket',
        ctx.params.id,
        {
          data: {
            status: 'accepted',
            log: newLogs,
          },
          populate: {
            log: true,
            customer: true,
            service: {
              populate: {
                category: true,
              },
            },
          },
        },
      );

      // TODO: MAIL SENDOUT

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
        error: null,
        date: new Date(),
      };
      const newLogs = [logEntry, ...ticket.log];

      const updatedTicket = await strapi.entityService.update(
        'api::ticket.ticket',
        ctx.params.id,
        {
          data: {
            status: 'declined',
            log: newLogs,
          },
          populate: {
            log: true,
            customer: true,
            service: {
              populate: {
                category: true,
              },
            },
          },
        },
      );

      // TODO: MAIL SENDOUT

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
