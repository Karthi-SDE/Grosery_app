import * as express from "express";
import addItemComponent from "../../components/v1/admin/add.item";
import getAllItemsComponent from "../../components/v1/admin/get.all.items";
import deleteItemsComponent from "../../components/v1/admin/delete.item";
import updateItemsComponent from "../../components/v1/admin/update.item";

const  router = express.Router();

router.post("/additem", addItemComponent);
router.get("/all-items", getAllItemsComponent);
router.put("/delete-items/:id", deleteItemsComponent);
router.put("/items/:id", updateItemsComponent);

export default router;




