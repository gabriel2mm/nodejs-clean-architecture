import { Delivery, Product } from "../../domain/entities";
import { CEPRepository } from "../../dataprovider/contracts";
import xlsx from 'xlsx';

export class CEPRepositoryImpl implements CEPRepository{

    async searchCEP(delivery: Delivery) : Promise<Product[]>{
        const workbook = xlsx.readFile("valores.xlsx");
        const shets = workbook.SheetNames;
        const xlData : string = JSON.stringify(xlsx.utils.sheet_to_json(workbook.Sheets[shets[0]]));

        const response : Product[] = [];
        JSON.parse(xlData).map( (d : any) => {
            response.push({cepInicial : d['CEP INICIAL'], cepFinal : d['CEP FINAL'], prazo: d['PRAZO'], preco : d['PREÇO'].replace('R$ ', '').replace(',', '.'), gris: d['GRIS'], advalorem: d['ADVALOREM']});
        });

        return response.filter( p => {
            if(delivery && delivery.cep){
                const cep : number = eval(delivery.cep.replace('-', ''));
                const cepInicial : number = eval(p.cepInicial.replace('-', ''))
                const cepFinal : number = eval(p.cepFinal.replace('-', ''));
                return cep > cepInicial && cep < cepFinal;
            }

            return false;  
        });
    }

}