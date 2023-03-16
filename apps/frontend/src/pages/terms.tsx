import { ContentScreen } from '@/modules/customer/components/ContentScreen';
import { CustomerLayout } from '@/modules/customer/layout';
import { NextPageWithLayout } from './_app';

import { GetStaticProps } from 'next';
import { getMarkdownContent } from '@/services/content';

interface Props {
  markdown: string;
}

const Terms: NextPageWithLayout<Props> = ({ markdown }) => {
  return <ContentScreen markdown={markdown} />;
};

Terms.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default Terms;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { markdown: await getMarkdownContent('terms') },
  };
};
