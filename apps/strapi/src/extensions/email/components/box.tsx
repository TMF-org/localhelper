import React from 'react';

interface Props extends React.CSSProperties {
  children: React.ReactNode;
}

export const Box = ({ children, ...cssProps }: Props) => {
  let style = {
    boxSizing: 'border-box',
    fontFamily: 'Arial',
    textAlign: 'center',
    display: 'block',
    width: '100%',
    margin: '0',

    background: '#F6F6F6',
    color: '#343333',
    padding: '5px 10px',

    ...cssProps,
  } as const;

  return <div style={style}>{children}</div>;
};
