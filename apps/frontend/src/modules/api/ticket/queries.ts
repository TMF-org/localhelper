import { api, StrapiResponse } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { Ticket } from './types';

export function fetchTickets(session: Session | null) {
  if (!session) return;
  return api
    .get('tickets', {
      searchParams: {
        populate: 'service,service.category,customer',
      },
      headers: { Authorization: `Bearer ${session.jwt}` },
    })
    .json<StrapiResponse<Ticket[]>>();
}

export function useTickets() {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ['tickets'],
    queryFn: () => fetchTickets(session),
  });
}

export function fetchTicket(session: Session | null, ticketId: number) {
  if (!session) return;
  return api
    .get(`tickets/${ticketId}`, {
      searchParams: {
        populate: 'service,service.category,customer,log',
      },
      headers: { Authorization: `Bearer ${session.jwt}` },
    })
    .json<StrapiResponse<Ticket>>();
}

export function useTicket(ticketId: number) {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ['tickets', ticketId],
    queryFn: () => fetchTicket(session, ticketId),
  });
}
