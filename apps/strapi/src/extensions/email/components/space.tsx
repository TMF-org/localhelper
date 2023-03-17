let styles = {
  boxSizing: 'border-box',
  display: 'block',
  width: '100%',
} as const;

interface Props {
  height?: string;
}

export const Space = ({ height }: Props) => {
  return <div style={{ ...styles, height: height ?? '0' }}>&nbsp;</div>;
};
