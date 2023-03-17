import {
  useAcceptTicketMutation,
  useCancelTicketMutation,
} from '@/modules/api/ticket/mutations';
import { useTicket } from '@/modules/api/ticket/queries';
import { Ticket } from '@/modules/api/ticket/types';
import { Button } from '@/modules/common/components/Button';
import { Icon } from '@/modules/common/components/Icon';
import { ServiceCategory } from '@/modules/common/hooks/useServiceCategories';
import { Service } from '@/modules/common/hooks/useServices';
import { StrapiData } from '@/services/api';

const wordingList = {
  sendMail: {
    // old mail wordings for backwards compatibility
    'appointment/created/customer': 'Anfrage wurde erstellt',
    'ticket/accepted/customer': 'Anfragbestätigung wurde gesendet',
    'ticket/canceled/customer': 'Anfrageabsage wurde gesendet',
    'appointment/accepted/customer': 'Anfragbestätigung wurde gesendet',
    'appointment/canceled/customer': 'Anfrageabsage wurde gesendet',
    'appointment/created/store': 'Anfrage wurde versendet',
    // new mail wordings
    'requests/accepted/customer': 'Anfragbestätigung wurde gesendet',
    'requests/declined/customer': 'Anfrageabsage wurde gesendet',
    'requests/created/customer': 'Anfrage wurde erstellt',
    'requests/created/helper': 'Anfrage wurde versendet',
  },
  changeState: {
    accepted: 'Anfrage wurde angenommen',
    declined: 'Anfrage wurde abgelehnt',
    canceledAutomatically: 'Anfrage wurde automatisch storniert',
  },
} as Record<string, Record<string, string>>;

interface DetailProps {
  ticket: StrapiData<Ticket>;
  service?: StrapiData<Service>;
  category?: StrapiData<ServiceCategory>;
  customer?: Ticket['customer'];
}

const Info = ({ ticket }: DetailProps) => {
  const { status } = ticket.attributes;
  return (
    <section className="panel infopanel">
      {status === 'accepted' && (
        <div className="appointment-notice--success">
          <Icon name="success" />
          <p>Die Anfrage wurde akzeptiert</p>
        </div>
      )}

      {status === 'declined' && (
        <div className="appointment-notice--error">
          <Icon name="error" />
          <p>Die Anfrage wurde abgelehnt</p>
        </div>
      )}

      {status === 'canceledAutomatically' && (
        <div className="appointment-notice--error">
          <Icon name="error" />
          <p>Die Anfrage wurde automatisch abgelehnt</p>
        </div>
      )}
    </section>
  );
};

const HelpBox = ({ category, service, customer }: DetailProps) => {
  return (
    <section className="register-box appointment-box">
      <h2 className="headline not-on-mobile">
        <strong>Anfrage</strong>
      </h2>
      <div className="inner">
        {category && <Icon name={category?.attributes.name.toLowerCase()} />}

        <strong>{service?.attributes.name}</strong>
        <h3 className="service">{category?.attributes.name}</h3>
        <ul>
          <li>
            <label>Anmerkung</label>
            <strong>{customer?.about ?? 'Keine weiteren Anmerkungen'}</strong>
          </li>
        </ul>
      </div>
    </section>
  );
};

const Customer = ({ customer }: DetailProps) => {
  return (
    <section className="register-box customer-box">
      <h2 className="headline not-on-mobile">
        <strong>User</strong>
      </h2>
      <div className="inner">
        <Icon name="customer" />

        <ul>
          <li>
            <label className="not-on-mobile">Name</label>
            <strong className="name">{customer?.name}</strong>
          </li>
          <li>
            <label className="not-on-mobile">E-Mail</label>
            <strong>
              <a href={`mailto:${customer?.email}`}>{customer?.email}</a>
            </strong>
          </li>
          <li>
            <label className="not-on-mobile">Telefon</label>
            <strong>{customer?.phone || 'Keine Angabe'}</strong>
          </li>
        </ul>
      </div>
    </section>
  );
};

const History = ({ ticket }: DetailProps) => {
  const log = ticket.attributes.log ?? [];

  return (
    <section className="register-box history-box">
      <h2 className="headline not-on-mobile">
        <strong>Log</strong>
      </h2>

      <div className="inner history-scroll-container">
        <div className="event-scroll">
          <ul className="eventlog">
            <li>
              <time>
                {new Date(ticket.attributes.createdAt).toLocaleString('de-DE')}
              </time>
              <span>Eingehende Anfrage</span>
            </li>
            {log.map((item, i) => (
              <li key={i}>
                <time>
                  {item.date
                    ? new Date(item.date).toLocaleString('de-DE')
                    : '-'}
                </time>
                <span>
                  {wordingList[item.action ?? '']?.[item.result ?? '']}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const Actions = ({ ticket }: DetailProps) => {
  const { mutate: mutateAccept } = useAcceptTicketMutation();
  const { mutate: mutateCancel } = useCancelTicketMutation();

  const status = ticket.attributes.status;

  const accept = () => {
    mutateAccept(ticket.id);
  };

  const cancel = () => {
    mutateCancel(ticket.id);
  };

  let buttons;
  if (status === 'onRequest') {
    buttons = (
      <>
        <Button type="primary" className="only-on-mobile" onClick={accept}>
          <strong>Annehmen</strong>
        </Button>
        <Button type="primary" className="not-on-mobile" onClick={accept}>
          <strong>Anfrage annehmen</strong>
        </Button>
        <Button className="declined only-on-mobile" onClick={cancel}>
          <strong>Ablehnen</strong>
        </Button>
        <Button className="declined not-on-mobile" onClick={cancel}>
          <strong>Anfrage ablehnen</strong>
        </Button>
      </>
    );
  }

  return (
    <>
      <section className="area-actions not-on-mobile">
        <div className="inner">{buttons}</div>
      </section>
      <section className="area-actions only-on-mobile">
        <div className="inner">{buttons}</div>
      </section>
    </>
  );
};

export const HelpRequestDetailsScreen = ({
  ticketId,
}: {
  ticketId: number;
}) => {
  const { data } = useTicket(ticketId);
  const ticket = data?.data;

  const service = ticket?.attributes.service?.data;
  const category = service?.attributes.category.data;

  if (!ticket) return null;

  const detailProps: DetailProps = {
    ticket,
    service,
    category,
    customer: ticket.attributes.customer,
  };

  return (
    <section className="profile-overview">
      <h1>Anfrage</h1>
      <Info {...detailProps} />

      <section className="layout-appointment-details appointments">
        <Customer {...detailProps} />
        <HelpBox {...detailProps} />
        <History {...detailProps} />
        <Actions {...detailProps} />
      </section>
    </section>
  );
};
