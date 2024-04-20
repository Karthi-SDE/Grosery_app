import Base from "./baseModel";
import Order from "./order";
import Item from "./item";

class OrderItem extends Base {
    static get tableName(){
        return "order_items";
    }

    static get relationMappings() {
        return {
            order: {
                relation: Base.BelongsToOneRelation,
                modelClass: Order,
                join: {
                    from: 'order_items.order_id',
                    to: 'orders.id'
                }
            },
            item: {
                relation: Base.BelongsToOneRelation,
                modelClass: Item,
                join: {
                    from: 'order_items.item_id',
                    to: 'items.id'
                }
            }
        };
    }
}

export default OrderItem;
