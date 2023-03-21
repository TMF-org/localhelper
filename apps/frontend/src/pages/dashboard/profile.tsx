import { fetchMeHelper } from '@/modules/api/helper/queries';
import { YourProfile } from '@/modules/dashboard/forms/ProfileForm';
import { DashboardLayout } from '@/modules/dashboard/layout';
import { prefetchQueries, prefetchSession } from '@/services/api';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from '../_app';

const ProfilePage: NextPageWithLayout = () => {
  return <YourProfile />;
};

ProfilePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

ProfilePage.requireAuth = true;
ProfilePage.enableAuth = true;

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { session, redirect } = await prefetchSession(context);
  const { dehydratedState } = await prefetchQueries([
    { queryKey: ['helper', 'me'], queryFn: () => fetchMeHelper(session) },
  ]);
  return { props: { session, dehydratedState }, redirect };
};
