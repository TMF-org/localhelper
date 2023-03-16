import { fetchHelper, useHelper } from '@/modules/api/helper/queries';
import { HelperDetails } from '@/modules/customer/components/helper/HelperDetails';
import { CustomerLayout } from '@/modules/customer/layout';
import { NextPageWithLayout } from '@/pages/_app';
import { prefetchQueries } from '@/services/api';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

const HelperDetailsPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { helperUrl } = query;

  const { data } = useHelper(helperUrl as string);
  const helper = data?.data;

  if (!helper) {
    return <p>Keine Helfer*in gefunden</p>;
  }
  return <HelperDetails helper={helper} />;
};

HelperDetailsPage.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default HelperDetailsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { helperUrl } = ctx.params as any;

  const { dehydratedState } = await prefetchQueries([
    {
      queryKey: ['helper', helperUrl],
      queryFn: () => fetchHelper(helperUrl),
    },
  ]);
  return { props: { dehydratedState } };
};
