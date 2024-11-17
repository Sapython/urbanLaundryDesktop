import { Timestamp } from '@angular/fire/firestore';

export type Bookings = {
    slot:Slot;
    otp: string;
    stage: Stage;
    pickupAgentId: string;
    deliveryAgentId: string;
    userId: string;
    billingDetail: BillingSummary;
    services: Service[];
    userDetails:BookingUserDetails;
  };
  type Slot = {
    date: Timestamp;
    startTime: Timestamp;
    endTime: Timestamp;
}
  
  export type BillingSummary = {
    total: number;
    couponCodeId: string;
    discount: number;
    tax: number;
    grandTotal: number;
  };
  
  export interface Service {
    id?: string;
    name: string;
    image: string;
    clothes: Cloth[];
    costPerKg: number;
    type: null | true;
    description: string;
    enabled: boolean;
  }
  
  type BookingUserDetails = {
    userId: string;
    pickupAddress:Address;
    deliveryAddress:Address;
    phone: string;
    photoURL: string;
    displayName: string;
    email: string;
  }

  export interface Cloth {
    id?: string;
    title: string;
    cost: number;
  }

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
      | 'outForDelivery'
      | 'cancelled';
    message: string;
    log: StageLog[];
  };
  type StageLog = {
    userId: string;
    date: Timestamp;
    additionalData?:any;
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
  
  type Address = {
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