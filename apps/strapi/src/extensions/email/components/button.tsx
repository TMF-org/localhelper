import React from 'react';

let styles = {
  success: {
    boxSizing: 'border-box',
    lineHeight: '50px',
    height: '50px',
    color: '#fff',
    fontFamily: 'Arial',
    fontSize: '16px',
    fontWeight: '300',
    padding: '0 15px',
    borderRadius: '3px',
    background: '#0072C9',
    textDecoration: 'none',
    textAlign: 'center',
  },
  error: {
    boxSizing: 'border-box',
    lineHeight: '50px',
    height: '50px',
    color: '#fff',
    fontFamily: 'Arial',
    fontSize: '16px',
    fontWeight: '300',
    padding: '0 15px',
    borderRadius: '3px',
    background: '#D75A4A',
    textDecoration: 'none',
    textAlign: 'center',
  },
  info: {
    boxSizing: 'border-box',
    lineHeight: '50px',
    height: '50px',
    color: '#fff',
    fontFamily: 'Arial',
    fontSize: '16px',
    fontWeight: '300',
    padding: '0 15px',
    borderRadius: '3px',
    background: '#76AAE7',
    textDecoration: 'none',
    textAlign: 'center',
  },
  highlight: {
    boxSizing: 'border-box',
    lineHeight: '50px',
    height: '50px',
    color: '#fff',
    fontFamily: 'Arial',
    fontSize: '16px',
    fontWeight: '300',
    padding: '0 15px',
    borderRadius: '3px',
    background: '#EFCE4A',
    textDecoration: 'none',
    textAlign: 'center',
  },
  grey: {
    boxSizing: 'border-box',
    lineHeight: '50px',
    height: '50px',
    color: '#fff',
    fontFamily: 'Arial',
    fontSize: '16px',
    fontWeight: '300',
    padding: '0 15px',
    borderRadius: '3px',
    background: '#8E8E8E',
    textDecoration: 'none',
    textAlign: 'center',
  },
} as const;

interface Props
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  display?: string;
  type?: string;
  children: React.ReactNode;
}

export const Button = ({ children, display, type, ...linkProps }: Props) => {
  let style = styles[type];
  style.display = display || 'block';
  return (
    <a style={style} {...linkProps}>
      {children}
    </a>
  );
};
