import { Timestamp } from "@angular/fire/firestore";

export type Bookings = {
  id?: string;
  name: string;
  phone: string;
  altPhone?: string;
  landMark: string;
  address: string;
  pinCode: string;
  created?: Timestamp;
  total?: number;
  totalPaid?: number;
  noOfKgs?: number;

};

