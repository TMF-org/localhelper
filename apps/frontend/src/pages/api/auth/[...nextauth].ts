import { signIn } from '@/services/auth';
import { HTTPError } from 'ky';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'password',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        /**
         * This function is used to define if the user is authenticated or not.
         * If authenticated, the function should return an object contains the user data.
         * If not, the function should return `null`.
         */
        if (credentials == null) return null;
        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */
        try {
          const { user, jwt } = await signIn(
            credentials.email,
            credentials.password,
          );
          return { ...user, jwt, name: jwt };
        } catch (error: any) {
          if (error instanceof HTTPError && error.response.status === 401) {
            // invalid credentials, silent error
            return null;
          }
          // other error => throw
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.id = token.sub as string;
      session.jwt = token.name as string;
      session.user = {
        id: token.sub as string,
        email: token.email as string,
        confirmed: token.cfd,
      };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.cfd = user.confirmed;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/',
  },
};

export default NextAuth(authOptions);
