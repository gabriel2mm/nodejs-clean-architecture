import { Delivery, DeliveryResponse } from "../entities";

export interface CalculatePrice  {
    calculatePrice : (delivery : Delivery) => Promise<DeliveryResponse>;
} 