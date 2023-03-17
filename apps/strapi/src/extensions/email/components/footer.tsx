import { Box } from './box';
import { Space } from './space';

let footer = {
  display: 'block',
  maxWidth: '450px',
  margin: '0 auto',
  textAlign: 'center',
  align: 'center',
  borderRadius: '0 0 4px 4px',
  background: '#0072C9',
} as const;

let pStyle = {
  maxWidth: '450px',
  textAlign: 'center',
  align: 'center',
} as const;

export const Footer = () => {
  return (
    <tr>
      <td style={footer} valign="top" align="center">
        <Space height="10px" />
        <Box color="#fff" background="transparent">
          <div style={pStyle}>
            Mit freundlichen Grüßen,
            <br />
            <br />
            Dein {process.env.NEXT_PUBLIC_APP_NAME}-Team
          </div>
        </Box>
        <Space height="10px" />
      </td>
    </tr>
  );
};
