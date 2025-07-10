import {TGender, TRole, TUserStatus} from '@constants/User.ts';

export interface Profile {
  id: number;
  uid: number;
  full_name: string;
  job_position: string;
  gender: TGender;
  phone_number: string;
  email: string;
  employee_id: string;
  createdAt: string;
  updatedAt: string;
  User: {
    id: number;
    role: TRole;
    status: TUserStatus;
  };
  role: TRole;
  status: TUserStatus;
}
