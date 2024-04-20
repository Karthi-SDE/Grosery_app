import { Request, Response, NextFunction } from "express";
import Cart from "../../../models/cart";
// import Item from "../../../models/item";

export default async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const user:any = req.user // Assuming userId is available in req.user

    // Fetch cart items for the user
    const cartItems:any = await Cart.query()
      .where('userId', user.id)
      .where('quantity','>' ,'0')
      .withGraphFetched('item'); // Assuming you have a relation 'item' in Cart model that fetches the associated item details

    // Calculate total price from cart items
    // let totalPrice = 0;
    // for (const cartItem of cartItems) {
    //   totalPrice += cartItem.quantity * cartItem.item.price;
    // }

    // You can also use reduce for this calculation:
    const totalPrice = cartItems.reduce((total: number, cartItem: { quantity: number; item: { price: number; }; }) => total + (cartItem.quantity * cartItem.item.price), 0);

    res.status(200).json({
      success: true,
      cartItems,
      totalPrice
    });

  } catch (error) {
    console.error("Error fetching cart details:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch cart details' });
  }
};
