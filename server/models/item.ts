import Base from "./baseModel";

class Item extends Base {
    status!: string;
    quantity!: any;
    static get tableName(){
        return "items";
    }
}

export default Item;
