import React from 'react';
import { getFrontendUrl } from '../utils';

let header = {
  color: '#fff',
  height: '80px',
  maxWidth: '450px',
  width: '450px',
  margin: '0 auto',
  borderRadius: '4px 4px 0 0',
  borderBottom: '5px solid #0072C9',
  background: '#0072C9',
  fontSize: '0px',
  wordBreak: 'break-word',
} as const;

let headerBox = {
  width: '100%',
} as const;

let logo = {
  width: '160px',
  height: 'auto',
  padding: '0 10px',
  textAlign: 'center',
  marginTop: '24px',
  align: 'center',
} as const;

interface Props {
  children?: React.ReactNode;
}

export const Header = ({ children }: Props) => {
  const logoUrl = getFrontendUrl('image/lokalhelfer.png');
  return (
    <tr
      style={{
        maxWidth: '450px',
      }}
    >
      <td align="center" style={header}>
        <table
          border={0}
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
          style={{
            borderCollapse: 'collapse',
            borderSpacing: '0px',
          }}
        >
          <tbody>
            <tr>
              <td style={headerBox} align="center">
                <img style={logo} width={260} src={logoUrl} />
                {children}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};
