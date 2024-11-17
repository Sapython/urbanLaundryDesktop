import { Timestamp } from "@angular/fire/firestore";
import { Service } from "./service.structure";
import { Stage } from "./stage.structure";
import { Address } from "./user.structure";

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
export type Slot = {
    date: Timestamp;
    startTime: Timestamp;
    endTime: Timestamp;
}
export type BookingUserDetails = {
    userId: string;
    pickupAddress:Address;
    deliveryAddress:Address;
    phone: string;
    photoURL: string;
    displayName: string;
    email: string;
}
export type BillingSummary = {
  total: number;
  couponCodeId: string;
  discount: number;
  tax: number;
  grandTotal: number;
};

export type DeliveryItem = {
  itemId: string;
  itemName: string;
  itemPrice: number;
  itemQuantity: number;
  service: 'wash' | 'wash&Iron' | 'dryClean' | 'Iron';
};