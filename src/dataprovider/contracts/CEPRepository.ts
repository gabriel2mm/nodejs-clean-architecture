import { Delivery, Product} from "../../domain/entities";

export interface CEPRepository{
    searchCEP : (delivery : Delivery) => Promise<Product[]>
}