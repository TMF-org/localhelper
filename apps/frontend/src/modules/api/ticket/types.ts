import { Service } from '@/modules/common/hooks/useServices';
import { StrapiResponse } from '@/services/api';

export interface Ticket {
  shortID: string;
  editID: string;
  status: 'onRequest' | string;
  customer?: {
    name: string;
    email: string;
    about: string;
    phone?: string;
    city?: string;
    agb: boolean;
  };
  service?: StrapiResponse<Service>;
  log?: Log[];
  createdAt: string;
  updatedAt: string;
}

interface Log {
  action?: string;
  result?: string;
  error?: string;
  date?: string;
}
