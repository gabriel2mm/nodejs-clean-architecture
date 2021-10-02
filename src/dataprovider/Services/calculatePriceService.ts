import { Delivery, Product , DeliveryResponse} from "../../domain/entities";
import { CalculatePrice } from "../../domain/usecases";
import { CEPRepository } from "../contracts";

export class CalculatePriceService implements CalculatePrice{

    constructor(readonly cepRepository : CEPRepository){}

    async calculatePrice(delivery: Delivery) { 
        const products : Product = (await this.cepRepository.searchCEP(delivery))[0];
        if(products){
            const amout = (products.gris * products.preco) + (products.preco * products.advalorem) + (delivery.weight * 0.005);            
            const deliveryResponse : DeliveryResponse = {error : null, amount : eval(amout.toFixed(2)), deadline: products.prazo }

            return deliveryResponse;
        }

        const deliveryResponse : DeliveryResponse = { error : "Não foi possível localizar cep" , deadline: null, amount: null}
        return deliveryResponse;
    }
}