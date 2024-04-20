"use strict";
import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../../../utils/custom.error";
import Item from "../../../models/item";

export default async (req: Request, res: Response, _next: NextFunction) => {
  try {
    // Extract item ID from request parameters
    const itemId = parseInt(req.params.id, 10);

    // Check if item ID is provided
    if (!itemId || isNaN(itemId)) {
      return res.serverError(422,ErrorHandler(new Error("Item ID is required")));
    }

    // Find the item by ID
    const item = await Item.query().findById(itemId);

    // Check if item exists
    if (!item) {
      return new Error("Item not found");
    }

    // Soft delete the item by updating its status to 'delete'
    // Soft delete the item by updating its status to 'deleted'
    await Item.query().patch({ status: 'deleted' }).findById(itemId);

    // Return the deleted item
    return res.success();

  } catch (error) {
    console.log(error);
    return res.serverError(500, ErrorHandler(error));
  }
};
