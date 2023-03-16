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

export default () => ({
  async updateMe(helperId: number, data: UpdateMeType) {
    const updatedHelper = await strapi.entityService.update(
      'api::helper.helper',
      helperId,
      { data, populate: { geo: true } },
    );
    return updatedHelper;
  },
});
