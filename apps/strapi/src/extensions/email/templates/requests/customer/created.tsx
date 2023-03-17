import {
  Box,
  Content,
  Footer,
  Header,
  HTML,
  Space,
  Text,
} from '../../../components';

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
}

const Template = ({ helper, customer, service }: Props) => {
  return (
    <HTML>
      <table style={tableStyle} align="center" cellPadding="0" cellSpacing="0">
        <Header />
        <Content>
          <Space height="10px" />

          <Box padding="5px 10px">
            <Text padding="5px">Hallo {customer.name}</Text>
          </Box>

          <Space height="10px" />

          <Text padding="5px">
            wir haben deine Anfrage an {helper.name} gesendet.
          </Text>

          <Space height="10px" />

          <Text padding="5px">
            Es steht der Helfer*in frei, ob sie deiner Anfrage nach
            Unterstützung nachkommt. {helper.name} hat 48 Stunden Zeit, auf die
            Anfrage zu reagieren. <br />
            <br />
            Du erhältst eine weitere Nachricht, sobald {helper.name} die Anfrage
            innerhalb dieses Zeitfensters verbindlich angenommen hat. <br />
            <br />
            Es besteht jedoch auch die Möglichkeit, dass deine Anfrage abgelehnt
            wird. Wenn dies der Fall sein sollte, gibt es sicherlich andere
            Helfer*innen, die dir gerne bei deinem Anliegen helfen.
          </Text>

          <Space height="10px" />

          <Box padding="5px 10px">
            <Text padding="5px">Helfer: {helper.name}</Text>
          </Box>

          <Space height="10px" />

          <Box padding="5px 10px">
            <Text padding="5px">Unterstützungsart: {service.name}</Text>
          </Box>
        </Content>
        <Footer />
      </table>
    </HTML>
  );
};

export const createdRequestCustomerTemplate = {
  name: 'requests/created/customer',
  template: Template,
  subject: 'Deine Anfrage wurde versendet',
};
