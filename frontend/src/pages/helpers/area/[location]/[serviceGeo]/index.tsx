import {
  useHelpersByDistance,
  fetchHelpersByDistance,
} from '@/modules/api/helper/queries';
import { Results } from '@/modules/customer/components/results/Results';
import { CustomerLayout } from '@/modules/customer/layout';
import { NextPageWithLayout } from '@/pages/_app';
import { prefetchQueries } from '@/services/api';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

const extractFromParams = (params: any) => {
  const location = params.location as string | undefined;
  const [service, geo] =
    (params.serviceGeo as string | undefined)?.split('@') ?? [];
  const [lat = '', lng = ''] = geo?.split(',') ?? [];

  return {
    service,
    location,
    lat,
    lng,
  };
};

const ResultsPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { lat, lng, service } = extractFromParams(query);

  const { data } = useHelpersByDistance({ lat, lng, service });

  return <Results helpers={data?.data ?? []} />;
};

ResultsPage.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default ResultsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { lat, lng, service } = extractFromParams(ctx.params);

  const { dehydratedState } = await prefetchQueries([
    {
      queryKey: ['helpersByDistance', lat, lng, service],
      queryFn: () => fetchHelpersByDistance({ lat, lng, service }),
    },
  ]);
  return { props: { dehydratedState } };
};
