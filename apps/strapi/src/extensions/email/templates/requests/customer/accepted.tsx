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
}

const Template = ({ helper, customer }: Props) => {
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

          <Text padding="5px">{helper.name} hat deine Anfrage angenommen.</Text>

          <Space height="15px" />

          <Text fontSize="14px" padding="5px">
            Details zum Helfer:
            <br />
            Name: {helper.name}
            <br />
            {helper.phone && `Telefon: ${helper.phone}`}
            <br />
            E-Mail-Adresse: {helper.email}
            <br />
            Adresse: {helper.address}
          </Text>

          <Space height="10px" />

          <Text fontSize="14px" padding="5px">
            Solltest Du noch Fragen haben, kannst Du uns jederzeit eine Mail an{' '}
            <a href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}>
              {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
            </a>{' '}
            schreiben. Wir melden uns umgehend zurück.
          </Text>
        </Content>
        <Footer />
      </table>
    </HTML>
  );
};

export const acceptedRequestCustomerTemplate = {
  name: 'requests/accepted/customer',
  template: Template,
  subject: 'Deine Anfrage wurde angenommen',
};
