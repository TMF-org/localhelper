import ReactMarkdown from 'react-markdown';

interface Props {
  markdown: string;
}

export const ContentScreen = ({ markdown }: Props) => {
  return (
    <section className="field space article">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </section>
  );
};
