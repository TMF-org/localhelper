import {
  Box,
  Content,
  Footer,
  Header,
  HTML,
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
            Vielen Dank für Deine Anmeldung bei{' '}
            {process.env.NEXT_PUBLIC_APP_NAME}.
          </Text>

          <Space height="20px" />

          <Text padding="5px">
            Unser Team wird Deine Eingaben prüfen und sich bei dir melden,
            sobald Dein Account freigeschaltet ist. Danach kannst Du Dich mit
            Deinen Daten <a href={getFrontendUrl('dashboard')}>im Dashboard</a>{' '}
            anmelden.
          </Text>

          <Space height="10px" />

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

export const registeredHelperTemplate = {
  name: 'helper/registered',
  template: Template,
  subject: `Deine Registrierung bei ${process.env.NEXT_PUBLIC_APP_NAME}!`,
};
