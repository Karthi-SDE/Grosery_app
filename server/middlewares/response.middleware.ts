"use strict";
import { constants } from "../config/constants";
import { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
      interface Response {
        success: (data?: JSON) => Response;
        serverError: (code: number, data: JSON) => Response;
        unauthorized: () => Response;
      }
    }
  }

export default (_req: Request, res: Response, next: NextFunction) => {
  res.success = (data?: JSON) => {
        return res.status(200).json({ success: true, ...data });
  };
  res.serverError = (code: number, data: JSON) => {
    return res.status(code).json({ success: false, message: data, code });
  };
  res.unauthorized = () =>
    res.status(401).json({
      success: false,
      message: constants.error.auth.unauthorized,
      code: 400,
    });
  next();
};