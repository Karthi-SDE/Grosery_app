// controllers/orderController.ts
import { Request, Response, NextFunction } from "express";
import Order from '../../../models/order';
import OrderItem from '../../../models/orderItem'; // Assuming you have an OrderItem model for order items
import Item from '../../../models/item'; // Assuming you have an OrderItem model for order items
import Cart from "../../../models/cart";

export default  async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { userId, cartItems } = req.body;
    for(let item of cartItems){
        const checkItem = await Item.query() .where('id', '=', item.id)
        .where('price', '=', item.price)
        .where('quantity', '>=', item.quantity)
        .first()
        if(!checkItem)
             throw Error('Please try again')
    }

    // Calculate total price from cart items
    const totalPrice = cartItems.reduce((total: number, item: { price: number; quantity: number; }) => total + (item.price * item.quantity), 0);

    // Create order using Objection.js model
    const order:any = await Order.query().insert({
        user_id: userId,
      total_price:totalPrice
    });

    // Save cart items to order_items table
    const orderItems = cartItems.map((item: { id: any; quantity: any; }) => ({
      order_id: order.id,
      item_id: item.id,
      quantity: item.quantity,
    }))
    await OrderItem.query().insert(orderItems); // Assuming OrderItem model has 'order_id', 'item_id', and 'quantity' fields
    for(let item of cartItems){
        const checkItem:any = await Item.query().where('id', '=', item.id)
        .first()
        if(checkItem){
           
        await Item.query().patchAndFetchById(checkItem.id, {
            quantity:checkItem?.quantity - item.quantity
        })
      }  
    }
    await Cart.query()
             .patch({
               quantity: 0
             })
             .where({
               userId: userId
             });
    res.status(201).json({ success: true, orderId: order.id });
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
