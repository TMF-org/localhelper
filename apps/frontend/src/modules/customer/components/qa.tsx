import { FAQ } from '@/modules/api/faq/types';
import { StrapiData } from '@/services/api';
import ReactMarkdown from 'react-markdown';

interface Props {
  faq: StrapiData<FAQ>;
}

export const QA = ({ faq }: Props) => {
  const { question, answer } = faq.attributes;
  return (
    <article className="question-answer">
      <h3>{question}</h3>
      <ReactMarkdown>{answer}</ReactMarkdown>
    </article>
  );
};
