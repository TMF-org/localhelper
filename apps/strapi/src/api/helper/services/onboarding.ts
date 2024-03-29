/**
 * onboarding service
 */

import urlSlug from 'url-slug';
import { z } from 'zod';
import { registeredHelperTemplate } from '../../../extensions/email/templates/helper/registered';
import { MailTemplateService } from '../../../extensions/email/templateService';

export const onboardingSchema = z.object({
  name: z.string().trim().nonempty(),
  phone: z.string().trim().optional(),
  email: z.string().trim().email(),
  password: z.string().min(6),

  geo: z.object({ lat: z.number(), lng: z.number() }),
  address: z.string().trim().nonempty(),

  summary: z.string().trim().nonempty(),
  about: z.string().trim().nonempty(),

  services: z.array(z.number()).min(1),
});
export type OnboardingType = z.infer<typeof onboardingSchema>;

const onboardingService = {
  async onboarding(data: OnboardingType, mediaUpload?: any) {
    const url = urlSlug(data.name);

    const existingUser = await strapi.entityService.findMany(
      'plugin::users-permissions.user',
      { filters: { email: data.email }, limit: 1 },
    );
    if (existingUser.length > 0) {
      throw new Error('duplicate-email');
    }
    const existingHelper = await strapi.entityService.findMany(
      'api::helper.helper',
      { filters: { url }, limit: 1 },
    );
    if (existingHelper.length > 0) {
      throw new Error('duplicate-name');
    }

    const roleResult = await strapi.entityService.findMany(
      'plugin::users-permissions.role',
      { filters: { type: 'authenticated' } },
    );
    const authRole = roleResult?.[0];
    if (!authRole) {
      throw new Error('no-authenticated-role');
    }

    const user = await strapi.entityService.create(
      'plugin::users-permissions.user',
      {
        data: {
          username: data.email,
          email: data.email,
          password: data.password,
          role: authRole.id,
          provider: 'local',
        },
      },
    );
    const helper = await strapi.entityService.create('api::helper.helper', {
      data: {
        url,
        name: data.name,
        email: data.email,
        phone: data.phone,
        geo: {
          lat: String(data.geo.lat),
          lng: String(data.geo.lng),
        },
        address: data.address,
        summary: data.summary,
        about: data.about,
        services: data.services,
        user: user.id,
      },
      files: mediaUpload ? { media: [mediaUpload] } : null,
    });

    // notify helper via mail
    const mailService = strapi.service(
      'plugin::email.template',
    ) as MailTemplateService;
    const helperTemplate = mailService.getTemplate(registeredHelperTemplate, {
      helper: data as any,
    });
    await mailService.send(helperTemplate, { to: data as any });

    return helper;
  },
};

export type OnboardingService = typeof onboardingService;

export default () => onboardingService;
