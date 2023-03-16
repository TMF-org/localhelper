import { api, StrapiResponse } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { z } from 'zod';
import { Ticket } from './types';

export const createHelpTicket = async (data: CreateHelpTicket) => {
  const ticket = await api
    .post('tickets', {
      json: { data },
    })
    .json<StrapiResponse<Ticket>>();
  return ticket;
};

// TODO: share between frontend and backend
const createSchema = z
  .object({
    helper: z.number(),
    service: z.number(),

    customer: z.object({
      name: z.string(),
      about: z.string().optional(),
      email: z.string().email(),
      phone: z.string().optional(),
      agb: z.boolean(),
    }),
  })
  .required();

type CreateHelpTicket = z.infer<typeof createSchema>;

export const acceptTicket =
  (session: Session | null) => async (ticketId: number) => {
    if (!session) return;
    return api
      .post(`tickets/${ticketId}/accept`, {
        headers: { Authorization: `Bearer ${session.jwt}` },
      })
      .json<StrapiResponse<Ticket>>();
  };

export const cancelTicket =
  (session: Session | null) => async (ticketId: number) => {
    if (!session) return;
    return api
      .post(`tickets/${ticketId}/cancel`, {
        headers: { Authorization: `Bearer ${session.jwt}` },
      })
      .json<StrapiResponse<Ticket>>();
  };

export const useAcceptTicketMutation = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return useMutation(acceptTicket(session), {
    onSuccess: (data, ticketId) => {
      queryClient.refetchQueries(['tickets']);
      return queryClient.setQueryData(['tickets', ticketId], data);
    },
  });
};

export const useCancelTicketMutation = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return useMutation(cancelTicket(session), {
    onSuccess: (data, ticketId) => {
      queryClient.refetchQueries(['tickets']);
      return queryClient.setQueryData(['tickets', ticketId], data);
    },
  });
};
