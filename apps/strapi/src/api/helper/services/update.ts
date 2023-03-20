/**
 * update helper service
 */

import { z } from 'zod';

export const updateMeSchema = z.object({
  name: z.string().nonempty().optional(),
  phone: z.string().optional(),
  geo: z.object({ lat: z.string(), lng: z.string() }).optional(),
  address: z.string().nonempty().optional(),
  summary: z.string().nonempty().optional(),
  about: z.string().nonempty().optional(),
  services: z.array(z.number()).min(1).optional(),
});
export type UpdateMeType = z.infer<typeof updateMeSchema>;

const updateHelperService = {
  async updateMe(
    helperId: number,
    data: UpdateMeType,
    mediaUpload?: any | null,
  ) {
    let currentMedia = null;
    if (mediaUpload !== undefined) {
      // check if helper already has media
      const helper = await strapi.entityService.findOne(
        'api::helper.helper',
        helperId,
        { populate: { media: true } },
      );
      currentMedia = helper.media?.[0];
    }
    if (currentMedia && mediaUpload !== null) {
      // replace existing media
      await strapi
        .service('plugin::upload.upload')
        .replace(currentMedia.id, { data: mediaUpload, file: mediaUpload });
    } else if (currentMedia && mediaUpload === null) {
      // delete existing media
      await strapi.service('plugin::upload.upload').remove(currentMedia);
    }

    // update helper
    const updatedHelper = await strapi.entityService.update(
      'api::helper.helper',
      helperId,
      {
        data,
        files: !currentMedia && mediaUpload ? { media: [mediaUpload] } : null,
        populate: { geo: true, services: true, media: true },
      },
    );
    return updatedHelper;
  },
};

export type UpdateHelperService = typeof updateHelperService;

export default () => updateHelperService;
