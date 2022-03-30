import { Gender } from '@/enums/gender';

export interface UserPayload {
  username: string;
  gender: Gender;
  forename: string;
  lastname: string;
  address: string;
  zipCode: number;
  city: string;
  birthDate: Date;
  email: string;
  phone: string;
  hasOrder: boolean;
  avatar: string;
}
