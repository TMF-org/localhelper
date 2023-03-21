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
} from '../../../components';
import { getFrontendUrl } from '../../../utils';

let tableStyle = {
  padding: 0,
  margin: 0,
  width: '100%',
  boxSizing: 'border-box',
  height: '100%',
} as const;

interface Props {
  helper: {
    url: string;
    phone?: string;
    name: string;
    email: string;
    address: string;
  };
  customer: {
    name: string;
  };
  service: {
    name: string;
  };
  annotation?: string;
}

const Template = ({ helper, customer, service, annotation }: Props) => {
  return (
    <HTML>
      <table style={tableStyle} align="center" cellPadding="0" cellSpacing="0">
        <Header />
        <Content>
          <Space height="10px" />

          <Text color="#0072C9" fontSize="28px">
            Neue Anfrage
          </Text>

          <Space height="20px" />

          <Box background="#F3F3F3">
            <Text padding="10px 5px" fontSize="18px">
              Hallo {helper.name}
            </Text>
          </Box>

          <Box>
            <Text padding="5px" fontSize="20px" margin="4px">
              {customer.name} hat angefragt: {service.name}
            </Text>
          </Box>

          <Space height="20px" />

          {annotation && (
            <Box padding="5px 10px" margin="0">
              <Text padding="5px" margin="0 0 5px 0">
                Anmerkung: {annotation}
              </Text>
            </Box>
          )}

          <Space height="10px" />

          <Text color="#A2A2A2">
            Wir alle wissen, manche Hilfsanfragen erfordern eine schnelle
            Antwort. Deswegen freut sich {customer.name} über eine schnelle Zu-
            oder Absage. Dafür hast du 48 Stunden Zeit. Wenn du nicht darauf
            reagierst, erhält {customer.name} automatisch eine Absage.
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

          <Text color="#A2A2A2">
            Solltest du noch Fragen haben, kannst du dich jederzeit über unsere
            Mail {process.env.NEXT_PUBLIC_SUPPORT_EMAIL} an uns wenden. Wir
            melden uns umgehend zurück.
            <br />
            <br />
          </Text>

          <Space height="10px" />
        </Content>
        <Footer />
      </table>
    </HTML>
  );
};

export const createdRequestHelperTemplate = {
  name: 'requests/created/customer',
  template: Template,
  subject: `Neue Anfrage über ${process.env.NEXT_PUBLIC_APP_NAME}`,
};
