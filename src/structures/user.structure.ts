import { Timestamp } from '@angular/fire/firestore';

export type UserData = {
  id?: string;
  photoURL: string;
  currentAddress?: Address;
  phone: string;
  phoneVerify: boolean;
  email: string;
  currentLanguage: 'english';
  gender?: 'Male' | 'Female' | 'Other';
  termsCondition: boolean;
  displayName: string;
  access: UserAccess;
  emailVerified: boolean;
  dateOfBirth?: Timestamp;
  created: Timestamp;
};

export type Address = {
  address: string;
  landmark: string;
  area: {
    name: string;
    id: string;
  };
  pinCode: string;
  longitude: number;
  latitude: number;
};
export type UserAccess = {
  access: 'admin' | 'agent' | 'customer';
};




