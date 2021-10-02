import {Express, Router} from 'express';
import { readdirSync } from 'fs';

export const setupRoutes = (app : Express) : void => { 

    const router : Router = Router();
    app.use('/api', router);

    readdirSync(`${__dirname}/../routes`).map( async fileName => {
        (await import(`${__dirname}/../routes/${fileName}`)).default(router)
    })
}