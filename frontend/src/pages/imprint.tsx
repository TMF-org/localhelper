import { ContentScreen } from '@/modules/customer/components/ContentScreen';
import { CustomerLayout } from '@/modules/customer/layout';
import { NextPageWithLayout } from './_app';

import { GetStaticProps } from 'next';
import { getMarkdownContent } from '@/services/content';

interface Props {
  markdown: string;
}

const Imprint: NextPageWithLayout<Props> = ({ markdown }) => {
  return <ContentScreen markdown={markdown} />;
};

Imprint.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default Imprint;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { markdown: await getMarkdownContent('imprint') },
  };
};
