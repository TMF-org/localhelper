import { renderToStaticMarkup } from 'react-dom/server';

interface MailInput {
  subject: string;
  text: string;
  html: string;
}

interface EmailOptions {
  to: string | { name: string; email: string };
  bcc?: string;
}

interface ReactTemplate<P> {
  template: React.FC<P>;
  subject: string;
}
interface MailSendReturn {
  accepted: string[];
  rejected: string[];
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: {
    from: string;
    to: string[];
  };
  messageId: string;
}

export const mailTemplateService = {
  getTemplate<P>(template: ReactTemplate<P>, data: P): MailInput {
    const Template = template.template;
    const html = renderToStaticMarkup(<Template {...data} />);
    return {
      subject: template.subject,
      text: 'Bitte benutze einen HTML-fähigen E-Mail-Client.',
      html,
    };
  },

  async send(mail: MailInput, options: EmailOptions): Promise<MailSendReturn> {
    const mailService = strapi.plugins['email'].services.email;

    let to = options.to;
    if (typeof options.to === 'object') {
      to = `${options.to.name} <${options.to.email}>`;
    }
    return await mailService.send({
      // from not specified => default from is used (MAIL_FROM env variable)
      to,
      bcc: options.bcc,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
  },
};
export type MailTemplateService = typeof mailTemplateService;
