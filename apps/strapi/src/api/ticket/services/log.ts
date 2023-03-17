/**
 * ticket log service
 */

interface LogEntry {
  action: 'changeState' | 'sendMail';
  result: string;
  error?: string;
  date?: Date;
}

const ticketLogService = {
  async log(ticketId: number, logEntry: LogEntry) {
    const ticket = await strapi.entityService.findOne(
      'api::ticket.ticket',
      ticketId,
      { populate: { log: true } },
    );
    if (!ticket) {
      console.error(`ticket ${ticketId} not found, log not saved`);
      return null;
    }

    const newLogs = [
      {
        date: new Date(),
        ...logEntry,
      },
      ...ticket.log,
    ];

    const updatedTicket = await strapi.entityService.update(
      'api::ticket.ticket',
      ticketId,
      {
        data: { log: newLogs },
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
    return updatedTicket;
  },
};

export type TicketLogService = typeof ticketLogService;

export default () => ticketLogService;
