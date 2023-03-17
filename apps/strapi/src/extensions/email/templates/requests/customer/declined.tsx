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
  helper: { name: string };
  customer: { name: string };
}

const Template = ({ helper, customer }: Props) => {
  return (
    <HTML>
      <table style={tableStyle} align="center" cellPadding="0" cellSpacing="0">
        <Header />
        <Content>
          <Box>
            <Text padding="">Hallo {customer.name}</Text>
          </Box>

          <Text padding="5px">
            Es tut uns Leid, leider hat {helper.name} keine Kapazitäten frei.
          </Text>

          <Text padding="5px">
            Du kannst aber jederzeit einen weiteren Termin anfragen, oder es bei
            einem anderen Helfer versuchen!
          </Text>

          <Space height="10px" />
        </Content>
        <Footer />
      </table>
    </HTML>
  );
};

export const declinedRequestCustomerTemplate = {
  name: 'requests/declined/customer',
  template: Template,
  subject: 'Deine Anfrage wurde abgelehnt',
};
