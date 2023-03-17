import React from 'react';

let styles = {
  boxSizing: 'border-box',
  display: 'block',
  width: '100%',
} as const;

interface Props {
  height?: string;
  children: React.ReactNode;
}

export const Headline = ({ height, children }: Props) => {
  return <h3 style={{ ...styles, height: height ?? '0' }}>{children}</h3>;
};
