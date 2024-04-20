import * as passport from "passport";
import * as passportJwt from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import * as passportCustom from "passport-custom";

const CustomStrategy = passportCustom.Strategy;

let JWTStratergy = passportJwt.Strategy;
let ExtractJWT = passportJwt.ExtractJwt;
import { constants } from "../config/constants";
import jwtConfig from "../config/jwt.config";
import * as bcrypt from "bcrypt";

import { generate, verifyToken, generateRefreshToken, TokenType } from "../utils/jwt.util";
import { ErrorHandler } from "../utils/custom.error";
import { Request, Response, NextFunction } from "express";
// import { loginValidation } from "../services";
import * as store from 'store';
import User from '../models/user'
interface CustomRequest extends Request {
    user?: any; // Replace `any` with the actual type of your user object
  }


passport.use(
  new LocalStrategy(
    {
      usernameField: "user[email]",
      passwordField: "user[password]",
      passReqToCallback: true,
    },
    async (_req: Request, email: string, password: string, done: any) => {
      try {
        
        let user: any = await User.query().findOne({ email: email });

        if (user && user.password) {
          if (bcrypt.compareSync(password, user.password)) {
            
            let final_user = await User.query().findById(user.id)

            const tokens = generateTokens(final_user);
            return done(null, { user: final_user, ...tokens });
          }
        }
        throw new Error(constants.error.auth.invalidCredentials);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  new JWTStratergy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'dfgdfgdgdfdfdg',
    },
    async (jwtPayload, done) => {
      // extract information from payload
      // if user found `return done(null, user);` else `return done(error, null);`
      try {
        if (jwtPayload.type !== TokenType.ID_TOKEN) {
          throw new Error(constants.error.auth.invalidToken);
        }
        const user = await User.query().findById(jwtPayload.id)
        if (user) {
          return done(null, user);
        } else {
          return done(constants.error.auth.invalidUser);
        }
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  "verifyRefreshToken",
  new CustomStrategy(async function (req, done) {
    if (req.headers["x-refreshtoken"]) {
      const refreshToken = req.headers["x-refreshtoken"].toString();
      try {
        const decodedPayload = verifyToken(refreshToken);
        if (decodedPayload.type !== TokenType.REFRESH_TOKEN) {
          throw new Error("Invalid token");
        }

        const user = await User.query().findById(decodedPayload.id)

        const tokens = generateTokens(user);

        return done(null, { user: user, ...tokens });
      } catch (error) {
        return done(error, null);
      }
    }
    done("refresh token missing", null);
  }),
);
export function generateTokens(payload: any): any {
  const token = generate({ ...payload, type: TokenType.ID_TOKEN });
  const refresh_token = generateRefreshToken({ ...payload, type: TokenType.REFRESH_TOKEN });
  return { token, refresh_token };
}

export function generateSignUpToken(userJson: any) {
  const tokens = generateTokens(userJson);
  return { user: userJson, ...tokens };
}

export const jwtAuth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (err || info) return res.serverError(400, ErrorHandler(err || info));
    req.user = user;
    store.set('user', user);
    return next();
  })(req, res, next);
};

export default passport
