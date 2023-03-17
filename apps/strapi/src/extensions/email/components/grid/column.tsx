import React from 'react';

let styles = {
  boxSizing: 'border-box',
  fontFamily: 'Arial',
  display: 'inline-block',
  width: '100%',
  padding: 0,
} as const;

interface Props extends React.CSSProperties {
  size?: number;
  children: React.ReactNode;
}

export const Column = ({ size: sizeProp, children, ...cssProps }: Props) => {
  let sizes = ['100%', '50%', '33.3334%', '25%'];
  let size = sizeProp || 1;
  let width = sizes[size - 1];

  return <div style={{ ...styles, width, ...cssProps }}>{children}</div>;
};
