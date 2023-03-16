import { fetchMeHelper } from '@/modules/api/helper/queries';
import { fetchTickets } from '@/modules/api/ticket/queries';
import { HelpRequestsScreen } from '@/modules/dashboard/components/HelpRequests';
import { DashboardLayout } from '@/modules/dashboard/layout';
import { prefetchQueries, prefetchSession } from '@/services/api';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from '../_app';

const Dashboard: NextPageWithLayout = () => {
  return <HelpRequestsScreen />;
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

Dashboard.requireAuth = true;

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { session, redirect } = await prefetchSession(context);
  const { dehydratedState } = await prefetchQueries([
    { queryKey: ['helper', 'me'], queryFn: () => fetchMeHelper(session) },
    { queryKey: ['tickets'], queryFn: () => fetchTickets(session) },
  ]);
  return { props: { session, dehydratedState }, redirect };
};
