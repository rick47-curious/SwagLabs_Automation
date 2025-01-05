import {request} from 'playwright';
import { expect } from 'playwright/test';

export const get = async (url: string,params={})=> {
    let apiRequestContext = await request.newContext();
    return await apiRequestContext.get(url,{timeout: 10000,
        params:{"content-type": 'application/json',...params}});
     
    };

    export const post = async (url:string,requestBody:any,params={})=>{
        let apiRequestContext = await request.newContext();
        return await apiRequestContext.post(url,{timeout: 10000,
            params:{"content-type": 'application/json',...params},
            data: requestBody
        });
    }

    