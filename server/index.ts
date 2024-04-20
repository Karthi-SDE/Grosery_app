// import express,{ Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import * as express from "express";
import responseMiddleWare from "./middlewares/response.middleware";
import {jwtAuth} from "./middlewares/passport.middleware";
import  routes from "./routes/v1";
import * as path from 'path';
import * as passport from "passport";
import * as corss from 'cors'
import * as session from 'express-session'
import { adminAccessMiddleware,userAccessMiddleware } from './middlewares/admin.middleward';

const app = express();
const port = process.env.PORT || 3005;
global.asyncForEach = async function (array: string | any[], callback: (arg0: any, arg1: number, arg2: any) => any) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Set the 'views' directory
app.set('views', path.join(__dirname, 'views'));
app.use(corss({
  origin: 'http://localhost:5000'
}))

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(responseMiddleWare);
app.use(express.static(path.join(__dirname, "public")));


app.set("port",port);
app.set("host","127.0.0.1");
 
//Rest Api
// app.use("/api/v1/user", routes);
app.use("/api/v1/admin",jwtAuth,adminAccessMiddleware, routes.adminRoute);
app.use("/api/v1/user",jwtAuth,userAccessMiddleware, routes.userRoute);
app.use("/api/v1/auth", routes.authRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at`, `http://localhost:${port}`);
    console.log("Express server listening on port ", app.get("port"));
});


export default app;