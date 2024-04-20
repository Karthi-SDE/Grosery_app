import { Model, RelationMappings } from 'objection';
import User from './user'; // Import User model
import Item from './item'; // Import Item model

class Cart extends Model {
  id!: number;
  userId!: number;
  itemId!: number;
  quantity!: number;

  static get tableName(): string {
    return 'carts';
  }

  static get relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'carts.userId',
          to: 'users.id',
        },
      },
      item: {
        relation: Model.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: 'carts.itemId',
          to: 'items.id',
        },
      },
    };
  }
}

export default Cart;
