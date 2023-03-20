/**
 * helper controller
 */

import { factories } from '@strapi/strapi';
import * as geolib from 'geolib';
import { onboardingSchema } from '../services/onboarding';
import { UpdateHelperService, updateMeSchema } from '../services/update';
import { sanitize } from '@strapi/utils';

const { contentAPI } = sanitize;

export default factories.createCoreController(
  'api::helper.helper',
  ({ strapi }) => ({
    async findByUrl(ctx) {
      const { url } = ctx.params;
      if (typeof url !== 'string') {
        return ctx.badRequest({
          statusCode: 400,
          error: 'bad request',
          message: 'bad request',
        });
      }
      const helpers = await strapi.entityService.findMany(
        'api::helper.helper',
        {
          fields: ['name', 'summary', 'about', 'url'],
          filters: {
            bookable: true,
            url,
          },
          limit: 1,
          populate: { services: true, media: true },
        },
      );
      if (helpers.length < 1) {
        return ctx.notFound({
          statusCode: 404,
          error: 'not found',
          message: 'not found',
        });
      }
      const sanitizedResults = await this.sanitizeOutput(helpers[0], ctx);
      return this.transformResponse(sanitizedResults);
    },

    async findByDistance(ctx) {
      const contentType = strapi.contentType('api::helper.helper');
      const sanitizedQueryParams = await contentAPI.query(
        ctx.query,
        contentType,
        ctx.state.auth,
      );

      const { lat, lng, service } = sanitizedQueryParams;
      if (!lat || !lng) {
        return ctx.badRequest({
          statusCode: 400,
          error: 'bad request',
          message: 'bad request',
        });
      }

      let serviceId: number;
      if (service) {
        const serviceData = (
          await strapi.entityService.findMany('api::service.service', {
            filters: { url: service },
            limit: 1,
          })
        )[0];
        if (!serviceData) {
          return ctx.badRequest({
            statusCode: 400,
            error: 'bad request',
            message: 'bad request',
          });
        }
        serviceId = serviceData.id;
      }

      const entities = await strapi.entityService.findMany(
        'api::helper.helper',
        {
          fields: ['name', 'summary', 'about', 'url'],
          filters: {
            ...(serviceId ? { services: serviceId } : {}),
            bookable: true,
          },
          populate: { geo: true, media: true },
        },
      );

      let results: any[] = [];
      let curRadius = 30;
      let tries = 4;
      do {
        results = entities
          .map((entity) => ({
            ...entity,
            distance: geolib.getDistance(
              { latitude: entity.geo.lat, longitude: entity.geo.lng },
              { latitude: lat, longitude: lng },
              100,
            ),
          }))
          .filter((entity) => entity.distance < curRadius * 1000);

        curRadius += 160;
        tries--;
      } while (results.length < 10 && tries > 0);

      // sort by distance
      results.sort((a, b) => a.distance - b.distance);

      const sanitizedResults = await this.sanitizeOutput(
        results.map((helper) => ({
          ...helper,
          // remove exact geo coordinates from response
          geo: undefined,
        })),
        ctx,
      );
      return this.transformResponse(sanitizedResults);
    },

    async findMe(ctx) {
      const helper = await strapi
        .service('api::helper.find')
        .findByUser(ctx.state.user.id);
      if (!helper) return ctx.notFound('no-helper-found');

      return this.transformResponse(helper);
    },

    async updateMe(ctx) {
      const helper = await strapi
        .service('api::helper.find')
        .findByUser(ctx.state.user.id);
      if (!helper) return ctx.notFound('no-helper-found');

      let mediaUpload = ctx.request.files['files.media'];
      // if media is null, existing file should be deleted
      if (!mediaUpload && ctx.request.body['files.media'] === 'null') {
        mediaUpload = null;
      }

      let data =
        typeof ctx.request.body?.data === 'string'
          ? JSON.parse(ctx.request.body?.data)
          : ctx.request.body?.data;

      const parse = updateMeSchema.safeParse(data ?? {});
      if (parse.success !== true) {
        return ctx.badRequest('validation-error', {
          errors: parse.error.issues,
        });
      }

      const updatedHelper = await strapi
        .service<UpdateHelperService>('api::helper.update')
        .updateMe(helper.id, parse.data, mediaUpload);
      return this.transformResponse(updatedHelper);
    },

    async onboarding(ctx) {
      const files = ctx.request.files;
      const parse = onboardingSchema.safeParse(ctx.request.body?.data ?? {});
      if (parse.success !== true) {
        return ctx.badRequest('validation-error', {
          errors: parse.error.issues,
        });
      }
      try {
        const newHelper = await strapi
          .service('api::helper.onboarding')
          .onboarding(parse.data, files?.[0]);

        const sanitizedResults = await this.sanitizeOutput(newHelper, ctx);
        return this.transformResponse(sanitizedResults);
      } catch (e: any) {
        if (e.message.startsWith('duplicate-')) {
          return ctx.badRequest(e.message);
        }
        throw e;
      }
    },
  }),
);
