"use strict";
import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../../../utils/custom.error";
import Item from "../../../models/item";
// import { constants } from "../../../config/constants";

export default async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Default page is 1
    const limit = parseInt(req.query.limit as string) || 10; // Default limit is 10
    const offset = (page - 1) * limit;

   // Fetch items with pagination
   const itemsQueryResult: any = await Item.query()
               .where('status', '<>', 'deleted').offset(offset).limit(limit);
   const totalSize:any = await Item.query().where('status', '<>', 'deleted').resultSize()

    // Return items
    return res.status(200).json({ 
        success: true,
         items:itemsQueryResult,
         totalItem:totalSize
         })

  } catch (error) {
    console.log(error);
    return res.serverError(500, ErrorHandler(error));
  }
};
