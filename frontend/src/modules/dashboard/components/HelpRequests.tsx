import {
  useAcceptTicketMutation,
  useCancelTicketMutation,
} from '@/modules/api/ticket/mutations';
import { useTickets } from '@/modules/api/ticket/queries';
import { Ticket } from '@/modules/api/ticket/types';
import { Icon } from '@/modules/common/components/Icon';
import { StrapiData } from '@/services/api';
import clsx from 'clsx';
import Link from 'next/link';

const HelpRequestRow = ({
  ticket,
  inactive,
}: {
  ticket: StrapiData<Ticket>;
  inactive?: boolean;
}) => {
  const { mutate: mutateAccept } = useAcceptTicketMutation();
  const { mutate: mutateCancel } = useCancelTicketMutation();

  const onCancel = () => {
    if (inactive) return;
    mutateCancel(ticket.id);
  };
  const onAccept = () => {
    if (inactive) return;
    mutateAccept(ticket.id);
  };

  const service = ticket.attributes.service?.data;
  const category = service?.attributes.category?.data;
  const customer = ticket.attributes.customer;

  return (
    <section className="appointment">
      <article title={ticket.attributes.shortID}>
        <h4>
          <span className="info-icon">
            {category && (
              <Icon name={category?.attributes.name.toLowerCase()} />
            )}
          </span>
          <strong>{category?.attributes.name}</strong>
          <small>{service?.attributes.name}</small>
        </h4>
        <h4>
          <span className="info-icon">
            <Icon name="customer" />
          </span>
          <strong>{customer?.name}</strong>
          <small>{customer?.email}</small>
        </h4>
        <h5>
          <span className={clsx('error', { inactive })} onClick={onCancel}>
            <Icon className="not-on-mobile" name="error" />
            <span>Ablehnen</span>
          </span>
          <span className={clsx('success', { inactive })} onClick={onAccept}>
            <Icon className="not-on-mobile" name="success" />
            <span>Annehmen</span>
          </span>
          <span className="watch">
            <Link href={`/dashboard/tickets/${ticket.id}`}>
              <Icon className="not-on-mobile" name="search" />
              <span>Ansehen</span>
            </Link>
          </span>
        </h5>
      </article>
    </section>
  );
};

const HelpRequests = ({ tickets }: { tickets: StrapiData<Ticket>[] }) => {
  const activeTickets = tickets.filter(
    (ticket) => ticket.attributes.status === 'onRequest',
  );
  const inactiveTickets = tickets.filter(
    (ticket) => ticket.attributes.status !== 'onRequest',
  );

  if (tickets.length === 0) {
    return (
      <div className="no-results">
        <h2>Aktuell liegen keine neuen Anfragen vor</h2>
      </div>
    );
  }
  return (
    <>
      <div className="list">
        {activeTickets.map((ticket) => (
          <HelpRequestRow key={ticket.id} ticket={ticket} />
        ))}
      </div>
      <div className="inactiveList">
        {inactiveTickets.map((ticket) => (
          <HelpRequestRow key={ticket.id} ticket={ticket} inactive />
        ))}
      </div>
    </>
  );
};

export const HelpRequestsScreen = () => {
  const { data } = useTickets();
  const tickets = data?.data ?? [];

  return (
    <section className="profile-overview">
      <h1>Hilfegesuche</h1>

      <HelpRequests tickets={tickets} />
    </section>
  );
};
