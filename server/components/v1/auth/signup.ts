import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../../../utils/custom.error";
import { constants } from "../../../config/constants";
import User from "../../../models/user";
import  * as bcrypt  from "bcrypt";
import bcryptConfig from "../../../config/bcrypt.config"
 
export default  async (_req: Request, res: Response, _next: NextFunction) => {
    try {
        const email = _req.body.user.email;

        // Checking if email already exists.and getting the count of  existing email
        const sameEmailCount: any = await User.query().where({ email }).resultSize();

        if (sameEmailCount > 0) {
            return res.serverError(422, ErrorHandler(new Error(constants.error.auth.emailTaken)))
        }

        // create new user
        const body: any = _req.body.user;
        
        if(body.password){
            body.password = bcrypt.hashSync(body.password, bcryptConfig.hashRound)
        }
        
        
        let user: any = await User.query().insert(body);
        return res.success(user)

    } catch (error) {
        return res.serverError(500, ErrorHandler(error))
    }
};

