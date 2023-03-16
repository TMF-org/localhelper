import { api } from './api';

export async function signIn(email: string, password: string) {
  const res = await api.post('auth/local', {
    json: {
      identifier: email,
      password,
    },
  });
  return await res.json<AuthLocalResponse>();
}

interface AuthLocalResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
