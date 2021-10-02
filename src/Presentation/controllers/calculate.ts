import { DeliveryResponse, Delivery } from "../../domain/entities";
import { HttpResponse } from "../contracts";
import { CalculatePrice } from "../../domain/usecases";

export class CalculateController {

    constructor(readonly calculatePrice : CalculatePrice){}

    async doGet (delivery : Delivery) : Promise<HttpResponse<DeliveryResponse>>{
        const deliveryResponse = await this.calculatePrice.calculatePrice(delivery);      
        
        return {statusCode : 200, data: deliveryResponse};
    }
}