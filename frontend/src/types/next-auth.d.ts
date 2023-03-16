import type NextAuth from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { MeHelper } from '@/modules/api/helper/types';
import type { StrapiData } from '@/services/api';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id: number | string;
    jwt: string;
    user: User;
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: number | string;
    email: string;
    confirmed: boolean;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    jwt: string;
    /** confirmed */
    cfd: boolean;
  }
}
