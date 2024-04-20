import { Router } from "express";
// import { jwtAuth } from "../../middlewares/passport.middleware";

const  router = Router();
 import  signupComponents  from "../../components/v1/auth/signup";
 import  loginComponents  from "../../components/v1/auth/login";
 router.post("/signin", loginComponents);
 router.post("/signup", signupComponents);

 export default router;

