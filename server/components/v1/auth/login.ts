"use strict";
import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../../../utils/custom.error";
import passport from "../../../middlewares/passport.middleware";
import { constants } from "../../../config/constants";


export default  async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    return passport.authenticate('local', async (err:any, data:any) => {
      
      if (err) {
        console.log("Login Function Error=> ", err.message);
        if (err.message && err.message === constants.error.auth.userNotVerified) {
          return res.serverError(701, ErrorHandler(new Error(constants.error.auth.userNotVerified)));
        } else {
          return res.serverError(400, ErrorHandler(err));
        }
      }
      console.log('checkinggg',data);
      
      return res.success(data);
    })(_req, res, _next);
  } catch (error) {
    console.log(error);
    return res.serverError(500, ErrorHandler(error));
  }
};
