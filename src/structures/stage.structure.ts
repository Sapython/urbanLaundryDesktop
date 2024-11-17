import { Timestamp } from "@angular/fire/firestore";

export type Stage = {
  stage:
    | 'pending'
    | 'pickupAssigned'
    | 'pickupReceived'
    | 'pickupCompleted'
    | 'washInProgress'
    | 'washCompleted'
    | 'deliveryAssigned'
    | 'deliveryCompleted'
    | 'cancelled';
  message: string;
  log: StageLog[];
};
type StageLog = {
  userId: string;
  date: Timestamp;
  additionalData?: any;
  message: string;
  stage:
    | 'pending'
    | 'pickupAssigned'
    | 'pickupReceived'
    | 'pickupCompleted'
    | 'washInProgress'
    | 'washCompleted'
    | 'deliveryAssigned'
    | 'deliveryCompleted'
    | 'cancelled';
};
