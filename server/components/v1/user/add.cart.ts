"use strict";
import { Request, Response, NextFunction } from "express";
// import { ErrorHandler } from "../../../utils/custom.error";
import Item from "../../../models/item";
import Cart from "../../../models/cart";

export default async (req: Request, res: Response, _next: NextFunction) => {
  try {
    console.log('req.body',req.body);
    
    const cartsBody = req.body.carts;
    const user: any = req.user;
    for(let cart of cartsBody){
         // Check if the item exists
         const item = await Item.query().findById(cart.itemId);
         if (!item) {
           throw Error('Item Not Found')
         }
     
         // Check if a cart item already exists for userId and itemId
         const existingCartItem: Cart | undefined  = await Cart.query()
           .where({
             userId: user.id,
             itemId: cart.itemId,
           })
           .first();
     
         if (existingCartItem) {
           // Cart item already exists, update its quantity
           if(cart.quantity <= item.quantity){
           await Cart.query()
             .patch({
               quantity: cart.quantity,
             })
             .where({
               userId: user.id,
               itemId: cart.itemId,
             });
            }else{
                throw Error('cart reached stock limit') 
            }
         } else {
           // Cart item does not exist, insert a new cart item
           if(cart.quantity <= item.quantity){
           await Cart.query().insert({
               userId: user.id,
               itemId: cart.itemId,
               quantity: cart.quantity,
             });
            }else{
                throw Error('cart reached stock limit') 
            }
             
         }
    }
  
      
    

    return res.status(201).json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (error:any) {
    console.error("Error adding item to cart:", error);
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};


