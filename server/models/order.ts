import { Model } from 'objection';
import User from "./user";
import OrderItem from "./orderItem";

class Order extends Model {
    user_id!:number;
    total_price!: number;
    static get tableName(){
        return "orders";
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'orders.user_id',
                    to: 'users.id'
                }
            },
            orderItems: {
                relation: Model.HasManyRelation,
                modelClass: OrderItem,
                join: {
                    from: 'orders.id',
                    to: 'order_items.order_id'
                }
            }
        };
    }
}

export default Order;
