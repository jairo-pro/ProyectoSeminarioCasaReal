import OrderModel1, { IOrder1 } from "../models/order";
import ProductModel, { IProduct } from "../models/products";
class BusinessOrder1 {
    constructor() {
    }
    public async addOrder1(idP: string, order: IOrder1) {
        let order1 = await ProductModel.findOne({ _id: idP });
        if (order1 != null) {
            let order1Db = new OrderModel1(order);
            let result = await order1Db.save();
            return result;
        }
    }
    public async updateOrder1(id: string, order: any) {

        let result = await OrderModel1.update({ _id: id }, { $set: order });
        return result;
    }

    public async deleteOrder(id: string) {
        let result = await OrderModel1.remove({ _id: id });
        return result;
    }
}
export default BusinessOrder1;