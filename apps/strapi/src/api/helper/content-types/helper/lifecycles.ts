import { activatedHelperTemplate } from '../../../../extensions/email/templates/helper/activated';
import { MailTemplateService } from '../../../../extensions/email/templateService';

export default {
  async beforeUpdate(event) {
    const { data, where } = event.params;

    const helperBefore = await strapi
      .service('api::helper.helper')
      .findOne(where.id, {});

    const helperChangedToBookable =
      helperBefore.bookable === false && data.bookable === true;
    if (helperChangedToBookable) {
      // helper was marked "bookable" => notify helper via mail
      const mailService = strapi.service(
        'plugin::email.template',
      ) as MailTemplateService;
      const helperTemplate = mailService.getTemplate(activatedHelperTemplate, {
        helper: data,
      });
      await mailService.send(helperTemplate, { to: data });
    }
  },
};
