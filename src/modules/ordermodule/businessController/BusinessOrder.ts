import OrderModel, { IOrder } from "../models/orders";
import OrderModel1, { IOrder1 } from "../models/order";
import ProductsModel, { IProduct } from "../models/products";
import ClientModule, { IClient } from "../../clientmodule/models/Clients";
import OrderModule from "../initO";


class BusinessOrder {
    constructor() {
    }
    public async readOrder(): Promise<Array<IOrder>>;
    public async readOrder(types: string): Promise<Array<IOrder>>;
    public async readOrder(query: any, skip: number, limit: number): Promise<Array<IOrder>>;

    public async readOrder(params1?: string | any, params2?: number, params3?: number): Promise<Array<IOrder> | IOrder> {
        if (params1 == "entregado") {
            let listOrder: Array<IOrder> = await OrderModel.find({ stateOrder: "entregado" });
            return listOrder;
        } else if (params1 == "no entregado") {
            let listOrder: Array<IOrder> = await OrderModel.find({ stateOrder: "no entregado" });
            return listOrder;
        } else if (params1) {
            let skip = params2 ? params2 : 0;
            let limit = params3 ? params3 : 1;
            let listOrder: Array<IOrder> = await OrderModel.find(params1).skip(skip).limit(limit);
            return listOrder;
        }
        else {
            let listOrder: Array<IOrder> = await OrderModel.find();
            return listOrder;
        }
    }

    public async readorder(id: string) {
        var result: IOrder = await OrderModel.findOne({ _id: id })
        return result;
    }

    public async addorder(idC: string, order: IOrder) {
        let client = await ClientModule.findOne({ _id: idC });
        if (client != null) {
            let OrderDb = new OrderModel(order);
            let result = await OrderDb.save();
            return result;
        }
    }

    public async addProductToOrder(idO: string, idO1: string) {
        let order = await OrderModel.findOne({ _id: idO });
        if (order != null) {
            var order1 = await OrderModel1.findOne({ _id: idO1 });

            if (order1 != null) {
                var checkOrder1: Array<IOrder1> = order.productsO.filter((item) => {
                    if (order1._id.toString() == item._id.toString()) {
                        return true;
                    }
                    return false;
                });
                console.log(checkOrder1)
                if (checkOrder1.length == 0) {
                    order.productsO.push(order1);
                    return await order.save();
                }
                return null;
            }
            return null;
        }
        return null;
    }

    public async addOrderToCli(idC: string, idO: string) {
        let client = await ClientModule.findOne({ _id: idC });
        if (client != null) {
            var order = await OrderModel.findOne({ _id: idO });
            if (order != null) {
                var checkOrder: Array<IOrder> = client.pedidos.filter((item) => {
                    if (order._id.toString() == item._id.toString()) {
                        return true;
                    }
                    return false;
                });
                console.log(checkOrder)
                if (checkOrder.length == 0) {
                    client.pedidos.push(order);
                    return await client.save();
                }
                return null;
            }
            return null;
        }
        return null;
    }

    public async updateOrder(id: string, order: any) {
        let result = await OrderModel.update({ _id: id }, { $set: order });
        return result;
    }

    public async deleteOrder(id: string) {
        var order = await OrderModel.findById(id);
        if (order.stateOrder == "no entregado") {
            var client = await ClientModule.findById(order.id_Cliente);
            var pediC: Array<IOrder> = client.pedidos;
            console.log(pediC + "1111");
            for (var i = 0; i < pediC.length; i++) {
                if (pediC[i]._id == id) {
                    pediC.splice(i, 1);
                }
            }
            var detalle: Array<IOrder1> = order.productsO;
            console.log(detalle + "2222");
            for (var i = 0; i < detalle.length; i++) {
                var idP = detalle[i].id_Producto;
                var product = await ProductsModel.findById(idP);
                if (product._id == idP) {
                    var canP = detalle[i].quantityP + detalle[i].stockD;
                    await ProductsModel.update({ _id: idP }, { $set: { stockP: canP } });
                    detalle.splice(i, 1);
                    await OrderModel1.findByIdAndDelete(detalle[i]._id);
                    console.log("ok");
                }
            }
            let result = await OrderModel.remove({ _id: id });
            return result;
        }
        return null;
    }
    public async deletePed(id: string) {
        let result = await OrderModel.remove({ _id: id });
        return result;
    }


}
export default BusinessOrder;