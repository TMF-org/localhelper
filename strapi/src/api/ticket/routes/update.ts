/**
 * ticket update routes
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/tickets/:id/cancel',
      handler: 'ticket.cancel',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/tickets/:id/accept',
      handler: 'ticket.accept',
      config: {
        policies: [],
      },
    },
  ],
};
