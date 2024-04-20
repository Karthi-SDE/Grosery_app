import * as express from "express";
import getAllItemsComponent from "../../components/v1/user/get.all.item";
import addToCartComponent from "../../components/v1/user/add.cart";
import createOrderComponent from "../../components/v1/user/create.order";
import cartDetailsComponent from "../../components/v1/user/get.cart.dateils";


const  router = express.Router();


router.get("/available-items", getAllItemsComponent);
router.post("/addToCart", addToCartComponent);
router.post('/create', createOrderComponent)
router.get('/cart', cartDetailsComponent)


export default router;




