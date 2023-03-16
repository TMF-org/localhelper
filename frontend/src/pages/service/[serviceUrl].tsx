import { fetchService, useService } from '@/modules/common/hooks/useService';
import { ServiceDetails } from '@/modules/customer/components/service/ServiceDetails';
import { CustomerLayout } from '@/modules/customer/layout';
import { useSearchStore } from '@/modules/customer/stores/search';
import { NextPageWithLayout } from '@/pages/_app';
import { prefetchQueries } from '@/services/api';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ServiceDetailsPage: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { serviceUrl } = query;

  const updateSearch = useSearchStore((store) => store.update);

  const { data } = useService(serviceUrl as string);
  const service = data;

  useEffect(() => {
    if (!service) return;
    updateSearch({ service });
  }, [service, updateSearch]);

  if (!service) {
    return <p>Service nicht gefunden</p>;
  }
  return <ServiceDetails service={service} />;
};

ServiceDetailsPage.getLayout = (page) => (
  <CustomerLayout>{page}</CustomerLayout>
);

export default ServiceDetailsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { serviceUrl } = ctx.params as any;

  const { dehydratedState } = await prefetchQueries([
    {
      queryKey: ['service', serviceUrl],
      queryFn: () => fetchService(serviceUrl),
    },
  ]);
  return { props: { dehydratedState } };
};
