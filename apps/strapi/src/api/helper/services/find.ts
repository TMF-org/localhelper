/**
 * find helper service
 */

export default () => ({
  async findByUser(userId: number) {
    const user = await strapi.entityService.findOne(
      'plugin::users-permissions.user',
      userId,
      {
        populate: {
          helper: { populate: { media: true, services: true, geo: true } },
        },
      },
    );
    const helper = user.helper;
    return helper;
  },
});
