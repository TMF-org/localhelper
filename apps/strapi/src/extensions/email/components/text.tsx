import React from 'react';

let styles = {
  color: '#343333',
  boxSizing: 'border-box',
  fontFamily: 'Arial',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center',
  display: 'block',
  width: '100%',
  margin: '0',
} as const;

interface Props extends React.CSSProperties {
  children: React.ReactNode;
}

export const Text = ({ children, ...styleProps }: Props) => {
  return <p style={{ ...styles, ...styleProps }}>{children}</p>;
};
