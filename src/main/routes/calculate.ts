import {Router} from 'express';
import {CalculateController} from '../../Presentation/controllers/';
import { CalculatePrice } from '../../domain/usecases';
import { CalculatePriceService } from '../../dataprovider/Services';
import { CEPRepository } from '../../dataprovider/contracts';
import { CEPRepositoryImpl } from '../../infraesctructure/repositories/CEPRepositoryImpl';
import { Delivery } from '../../domain/entities';
import { HttpResponse } from '../../Presentation/contracts';


export default (router: Router) : void => {
    router.get('/calculate', async (req, res) => {
        const cepRepository: CEPRepository = new CEPRepositoryImpl();
        const calculatePrice : CalculatePrice = new CalculatePriceService(cepRepository);
        const calculateController : CalculateController = new CalculateController(calculatePrice);

        try{
            if(req.body){
                const delivery : Delivery = JSON.parse(JSON.stringify(req.body));
                const response : HttpResponse = await calculateController.doGet(delivery);
                res.status(response.statusCode).json(response.data);
            }else{
                const responseError : HttpResponse<string> = {statusCode : 500, data: "Formato de entrada inválido"}
                res.status(responseError.statusCode).json(responseError);
            }
        }catch(e){
            console.log("error message: " , e);
            const responseError : HttpResponse<string> = {statusCode : 500, data: "Não foi possível processar solicitação"}
            res.status(responseError.statusCode).json(responseError);
        }
    });
}