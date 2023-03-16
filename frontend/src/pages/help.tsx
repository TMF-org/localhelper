import { fetchFAQ, useFAQ } from '@/modules/api/faq/queries';
import { QA } from '@/modules/customer/components/qa';
import { CustomerLayout } from '@/modules/customer/layout';
import { prefetchQueries } from '@/services/api';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from './_app';

const Help: NextPageWithLayout = () => {
  const { data } = useFAQ();
  const faq = data?.data ?? [];

  const requestFaq = faq.filter((f) => f.attributes.type === 'Sucher');
  const helperFaq = faq.filter((f) => f.attributes.type === 'Helfer');

  return (
    <>
      <section className="section">
        <h2 className="section-headline-no-space">
          <strong>Hilfe für Suchende</strong>
        </h2>

        <div className="faqs">
          {requestFaq.map((qa) => (
            <QA key={qa.id} faq={qa} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-headline-no-space">
          <strong>Hilfe für Helfende</strong>
        </h2>

        <div className="faqs">
          {helperFaq.map((qa) => (
            <QA key={qa.id} faq={qa} />
          ))}
        </div>
      </section>
    </>
  );
};

Help.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default Help;

export const getServerSideProps: GetServerSideProps = async () => {
  const { dehydratedState } = await prefetchQueries([
    { queryKey: ['faq'], queryFn: fetchFAQ },
  ]);
  return { props: { dehydratedState } };
};
