import { fetchMeHelper } from '@/modules/api/helper/queries';
import { fetchTicket } from '@/modules/api/ticket/queries';
import { HelpRequestDetailsScreen } from '@/modules/dashboard/components/HelpRequestDetails';
import { DashboardLayout } from '@/modules/dashboard/layout';
import { prefetchQueries, prefetchSession } from '@/services/api';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../../_app';

const TicketDetails: NextPageWithLayout = () => {
  const router = useRouter();
  const { ticketId } = router.query;
  return <HelpRequestDetailsScreen ticketId={Number(ticketId)} />;
};

TicketDetails.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

TicketDetails.requireAuth = true;

export default TicketDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ticketId = Number(context.params?.ticketId);

  const { session, redirect } = await prefetchSession(context);
  const { dehydratedState } = await prefetchQueries([
    { queryKey: ['helper', 'me'], queryFn: () => fetchMeHelper(session) },
    {
      queryKey: ['tickets', ticketId],
      queryFn: () => fetchTicket(session, ticketId),
    },
  ]);
  return { props: { session, dehydratedState }, redirect };
};
