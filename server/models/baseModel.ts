import  Model  from "../config/objection";

class Base extends Model{
  created_at!: string;
  updated_at!: string;
  id!:number;
  
  static get idColumn(){
    return "id"
}

  $beforeInsert():void {
      let currentDate:string = new Date().toISOString();
      this.created_at = currentDate;
      this.updated_at = currentDate;
  }
  $afterUpdate():void {
      this.updated_at = new Date().toISOString();
  }
  
}
export default Base;