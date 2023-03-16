import { ContentScreen } from '@/modules/customer/components/ContentScreen';
import { CustomerLayout } from '@/modules/customer/layout';
import { NextPageWithLayout } from './_app';

import { GetStaticProps } from 'next';
import { getMarkdownContent } from '@/services/content';

interface Props {
  markdown: string;
}

const Privacy: NextPageWithLayout<Props> = ({ markdown }) => {
  return <ContentScreen markdown={markdown} />;
};

Privacy.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default Privacy;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { markdown: await getMarkdownContent('privacy') },
  };
};
