import React from 'react';

let styles = {
  boxSizing: 'border-box',
  fontFamily: 'Arial',
  fontSize: '16px',
  textAlign: 'center',
  display: 'block',
  width: '100%',
} as const;

interface Props {
  children: React.ReactNode;
}

export const Row = ({ children }: Props) => {
  return <div style={styles}>{children}</div>;
};
