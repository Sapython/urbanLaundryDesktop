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
export interface Cloth {
  id?: string;
  title: string;
  cost: number;
}
