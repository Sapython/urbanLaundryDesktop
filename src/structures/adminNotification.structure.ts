import { Timestamp } from '@angular/fire/firestore';

export type Notification = {
  read: boolean;
  message: string; 
  timestamp: Timestamp;
  link:string;
};
