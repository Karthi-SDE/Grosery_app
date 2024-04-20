const jwt = require("jsonwebtoken");
import jwtConfig from "../config/jwt.config";

export const generate = (user: any) => {
  return jwt.sign(user, 'dfgdfgdgdfdfdg', {
    expiresIn: jwtConfig.expiresIn,
    audience: jwtConfig.audience,
    issuer: jwtConfig.issuer,
  });
};

export const decodeSubscriptionToken = (token: any) => {
  return jwt.decode(token);
};

export const decodeAppleIdToken = (token: any) => {
  return jwt.decode(token);
};

export const decodeAuthToken = (token: any) => {
  return jwt.decode(token);
};

export const generateRefreshToken = (user: any) => {
  return jwt.sign(user, 'dfgdfgdgdfdfdg', {
    audience: jwtConfig.audience,
    issuer: jwtConfig.issuer,
    expiresIn: "7d",
  });
};

export const verifyToken = (jwtToken: any) => {
  return jwt.verify(jwtToken, 'dfgdfgdgdfdfdg', {
    audience: jwtConfig.audience,
    issuer: jwtConfig.issuer,
    maxAge: "7d",
  });
};

export const impersonatedUserToken = (payload: any) => {
  return jwt.sign(payload, 'dfgdfgdgdfdfdg', {
    expiresIn: "15m",
    audience: jwtConfig.audience,
    issuer: jwtConfig.issuer,
  });
};
export const TokenType = {
  ID_TOKEN: "idToken",
  REFRESH_TOKEN: "refreshToken",
};
//export = { generate, decodeAuthToken, generateRefreshToken, verifyToken, TokenType, impersonatedUserToken, decodeSubscriptionToken, decodeAppleIdToken };
