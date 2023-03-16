module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('MAIL_HOST', 'smtp.example.com'),
        port: env('MAIL_PORT', 587),
        auth: {
          user: env('MAIL_USER'),
          pass: env('MAIL_PASS'),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: env('MAIL_FROM', 'hello@example.com'),
        defaultReplyTo: env('MAIL_REPLY_TO'),
      },
    },
  },
});
