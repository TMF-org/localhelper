import React, { Component } from 'react';

let reset = {
  padding: '10px',
  margin: '0 auto',
  background: '#f1f1f1',
  width: '450px !important',
};

interface Props {
  children: React.ReactNode;
}

export const HTML = (props: Props) => {
  return (
    // <html xmlns="http://www.w3.org/1999/xhtml">
    <html>
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </head>

      <body style={reset}>{props.children}</body>
    </html>
  );
};
