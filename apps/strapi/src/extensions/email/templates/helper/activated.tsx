import {
  Box,
  Button,
  Column,
  Content,
  Footer,
  Header,
  HTML,
  Row,
  Space,
  Text,
} from '../../components';
import { getFrontendUrl } from '../../utils';

let tableStyle = {
  padding: 0,
  margin: 0,
  width: '100%',
  boxSizing: 'border-box',
  height: '100%',
} as const;

interface Props {
  helper: {
    name: string;
  };
}

const Template = ({ helper }: Props) => {
  return (
    <HTML>
      <table style={tableStyle} align="center" cellPadding="0" cellSpacing="0">
        <Header />
        <Content>
          <Space height="10px" />

          <Box padding="5px 10px">
            <Text padding="5px">Hallo {helper.name},</Text>
          </Box>

          <Space height="20px" />

          <Text padding="5px">
            Du bist hiermit als Helfer*in bei {process.env.NEXT_PUBLIC_APP_NAME}{' '}
            freigegeben.
            <br />
            Wir freuen uns sehr, Dich dabei zu haben!
          </Text>

          <Space height="20px" />

          <Text padding="5px">
            Sobald jemand Deine Unterstützung anfragt, bekommst Du eine Mail von
            uns. Ebenso ist es jederzeit möglich Anfragen{' '}
            <a href={getFrontendUrl('dashboard')}>im Dashboard</a> zu verwalten.
            Zum Login benötigst Du Deine E-Mail und das Passwort aus der
            Registrierung.
          </Text>

          <Space height="20px" />

          <Row>
            <Column size={1} padding="10px 0 10px 5px">
              <Button type="success" href={getFrontendUrl('dashboard')}>
                zum Dashboard
              </Button>
            </Column>
          </Row>

          <Space height="20px" />

          <Text fontSize="14px" padding="5px">
            Wende Dich bei Rückfragen gerne an{' '}
            {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
          </Text>
        </Content>
        <Footer />
      </table>
    </HTML>
  );
};

export const activatedHelperTemplate = {
  name: 'helper/activated',
  template: Template,
  subject: `Du bist jetzt Helfer*in bei ${process.env.NEXT_PUBLIC_APP_NAME}!`,
};
