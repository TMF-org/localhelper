interface Props {
  name?: string;
  url?: string;
  tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const HelperName = ({ name = 'Helfer', tagName = 'h3' }: Props) => {
  const Tag = tagName;
  return (
    <Tag className="store-name">
      <strong>{name}</strong>
    </Tag>
  );
};
