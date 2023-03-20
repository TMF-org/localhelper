import { api, StrapiResponse } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { z } from 'zod';
import { handleStrapiError } from '../utils';
import { Helper, MeHelper } from './types';

export const onboardHelper = async (data: OnboardingType) => {
  try {
    const response = await api.post('onboarding', {
      json: { data },
    });
    const helper = response.json<StrapiResponse<Helper>>();
    return helper;
  } catch (e: any) {
    await handleStrapiError(e);
    throw e;
  }
};

// TODO: share between frontend and backend
export const onboardingSchema = z.object({
  name: z.string().nonempty(),
  phone: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),

  geo: z.object({ lat: z.number(), lng: z.number() }),
  address: z.string().nonempty(),

  summary: z.string().nonempty(),
  about: z.string().nonempty(),

  services: z.array(z.number()).min(1),
});

type OnboardingType = z.infer<typeof onboardingSchema>;

export const updateMeHelper =
  (session: Session | null) => async (data: UpdateMeType) => {
    if (!session) return;
    try {
      const { media, ...dataWithoutMedia } = data;
      const formData = new FormData();
      if (media) {
        formData.append('files.media', media, media.name);
      } else if (media === null) {
        // mark media for deletion
        formData.append('files.media', 'null');
      }
      formData.append('data', JSON.stringify(dataWithoutMedia));

      const response = await api.put('helpers/me', {
        body: formData,
        headers: {
          Authorization: `Bearer ${session.jwt}`,
        },
      });
      const helper = response.json<StrapiResponse<MeHelper>>();
      return helper;
    } catch (e: any) {
      await handleStrapiError(e);
      throw e;
    }
  };

export const useUpdateMeMutation = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return useMutation(updateMeHelper(session), {
    onSuccess: (data) => {
      return queryClient.setQueryData(['helper', 'me'], data);
    },
  });
};

// TODO: share between frontend and backend
export const updateMeSchema = z.object({
  name: z.string().nonempty().optional(),
  phone: z.string().optional(),
  geo: z.object({ lat: z.string(), lng: z.string() }).optional(),
  address: z.string().nonempty().optional(),
  summary: z.string().nonempty().optional(),
  about: z.string().nonempty().optional(),
  services: z.array(z.number()).min(1).optional(),
  media: z
    .custom<File>((v) => v instanceof File)
    .nullable()
    .optional(),
});
export type UpdateMeType = z.infer<typeof updateMeSchema>;
