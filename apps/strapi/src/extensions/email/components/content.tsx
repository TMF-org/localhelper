import React from 'react';

let body = {
  display: 'block',
  maxWidth: '450px',
  margin: '0 auto',
  padding: '0',
  boxSizing: 'border-box',
} as const;

let content = {
  display: 'block',
  width: '100%',
  padding: '15px',
  boxSizing: 'border-box',
  background: '#fff',
} as const;

interface Props {
  children: React.ReactNode;
}

export const Content = ({ children }: Props) => {
  return (
    <tr style={body}>
      <td style={body} width="100%" valign="top">
        <section style={content}>{children}</section>
      </td>
    </tr>
  );
};
