"use strict";
import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../../../utils/custom.error";
import Item from "../../../models/item";
import { constants } from "../../../config/constants";


export default  async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    let body = _req.body.grocery
   const checkItem =  await Item.query().where({name:body.name}).resultSize();
   if(checkItem > 0){
    return res.serverError(422, ErrorHandler(new Error('Item already created')))
   }
   let user: any = await Item.query().insert(body);
    return res.success(user)
    
  } catch (error) {
    console.log(error);
    return res.serverError(500, ErrorHandler(error));
  }
};
