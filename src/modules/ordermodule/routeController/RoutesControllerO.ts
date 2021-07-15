import { Request, Response } from "express";
import BusinessOrder from "../businessController/BusinessOrder";
import BusinessProduct from "../businessController/BusinessProduct";
import BusinessOrder1 from "../businessController/BusinessOrder1";
import ClientModule, { IClient } from "../../clientmodule/models/Clients";
import path from "path";
import ProductModel, { IProduct, ISimpleProduct } from "../models/products";
import OrderModel, { IOrder } from "../models/orders";
import Order1Model, { IOrder1 } from "../models/order";
import isEmpty from "is-empty";
import sha1 from "sha1";
import OrderModule from "../initO";

class RoutesControllerO {
    constructor() { }

    /*---------------------------------------PRODUCTS--------------------------------------------*/
    public async createProducts(request: Request, response: Response) {
        var product: BusinessProduct = new BusinessProduct();
        var params = request.body;
        params["registerdateP"] = new Date();
        let result = await product.adProduct(params);
        response.status(201).json({ message: "producto registrado", serverResponse: result });
    }

    public async getProduct(request: Request, response: Response) {
        const result = await ProductModel.find({});
        response.json({ message: "todos los productos", serverResponse: result });
    }

    public async updateProduct(request: Request, response: Response) {
        var product: BusinessProduct = new BusinessProduct();
        let id: string = request.params.id;
        var params = request.body;
        var result = await product.updateproduct(id, params);
        response.status(200).json({ message: "producto actualizado", serverResponse: result });
    }

    public async removeProduct(request: Request, response: Response) {
        var product: BusinessProduct = new BusinessProduct();
        let id: string = request.params.id;
        let result = await product.deleteUsers(id);
        response.status(200).json({ message: "producto eliminado", serverResponse: result });
    }

    public async uploadPhoto(request: Request, response: Response) {
        var id: string = request.params.id;
        if (!id) {
            response
                .status(300)
                .json({ serverResponse: "El id es necesario para subir una foto" });
            return;
        }
        var product: BusinessProduct = new BusinessProduct();
        var productToUpdate: IProduct = await product.readProduct(id);
        if (!productToUpdate) {
            response.status(300).json({ serverResponse: "El producto no no existe!" });
            return;
        }
        if (isEmpty(request.files)) {
            response
                .status(300)
                .json({ serverResponse: "No existe un archivo adjunto" });
            return;
        }
        var dir = `${__dirname}/../../../../avatarfiles`;
        var absolutepath = path.resolve(dir);
        var files: any = request.files;
        var key: Array<string> = Object.keys(files);
        var copyDirectory = (totalpath: string, file: any) => {
            return new Promise((resolve, reject) => {
                file.mv(totalpath, (err: any, success: any) => {
                    if (err) {
                        resolve(false);
                        return;
                    }
                    resolve(true);
                    return;
                });
            });
        };
        for (var i = 0; i < key.length; i++) {
            var file: any = files[key[i]];
            var filehash: string = sha1(new Date().toString()).substr(0, 7);
            var newname: string = `${filehash}_${file.name}`;
            var totalpath = `${absolutepath}/${newname}`;
            await copyDirectory(totalpath, file);
            productToUpdate.uriphoto = "/api/getportrait/" + id;
            productToUpdate.pathphoto = totalpath;
            var productResult: IProduct = await productToUpdate.save();
        }
        var simpleProduct: ISimpleProduct = {
            nameProduct: productResult.nameProduct,
            uriphoto: productResult.uriphoto,
            pathphoto: productResult.pathphoto,
        };
        response.status(300).json({ message: "imagen asignada a un producto", serverResponse: simpleProduct });
    }

    public async getPhoto(request: Request, response: Response) {
        var id: string = request.params.id;
        if (!id) {
            response
                .status(300)
                .json({ serverResponse: "Identificador no encontrado" });
            return;
        }
        var product: BusinessProduct = new BusinessProduct();
        var productData: IProduct = await product.readProduct(id);
        if (!productData) {
            response.status(300).json({ serverResponse: "Error " });
            return;
        }
        if (productData.pathphoto == null) {
            response.status(300).json({ serverResponse: "No existe una imagen " });
            return;
        }
        response.sendFile(productData.pathphoto);
    }

    /*-----------------------------ORDER1------------------------------------------ */


    public async addOrder1(request: Request, response: Response) {
        var order1: BusinessOrder1 = new BusinessOrder1();
        let id: string = request.params.id;
        var params = request.body;
        var product = await ProductModel.findById(id);
        params["nameP"] = product.nameProduct;
        params["pricePO"] = product.priceP;
        var cant: number = product.stockP;
        if (params["quantityP"] > cant) {
            response.status(201).json({ message: "No existe esa cantidad de productos" });
        }
        params["priceTotalO"] = params["quantityP"] * params["pricePO"];
        params["stockD"] = cant - params["quantityP"];
        let result = await order1.addOrder1(id, params);
        response.status(201).json({ message: "orden de producto registrado", serverResponse: result });
    }

    public async getOrder1(request: Request, response: Response) {
        const result = await Order1Model.find({});
        response.json({ message: "todos las ordernes de 1 a 1", serverResponse: result });
    }

    public async removeOrder1(request: Request, response: Response) {
        var order1: BusinessOrder1 = new BusinessOrder1();
        let id: string = request.params.id;
        let result = await order1.deleteOrder(id);
        response.status(200).json({ message: "orden  eliminado", serverResponse: result });
    }

    /*----------------------------ORDERS-------------------------------------------- */
    public async addOrder(request: Request, response: Response) {
        var order: BusinessOrder = new BusinessOrder();
        var idC: string = request.params.id;
        if (idC == null) {
            response.status(300).json({ serverResponse: "Es necesario el identificador" });
        }
        var params = request.body;
        params["registerdateO"] = new Date();
        var client = await ClientModule.findById(idC);
        params["quantityP"] = 0;
        params["priceTotalOrder"] = 0;
        params["client"] = client.fullname + " " + client.surname;
        params["telephono"] = client.telephone;
        let result = await order.addorder(idC, params);
        response.status(201).json({ message: "orden registrado", serverResponse: result });
    }

    public async addProductToOrder(request: Request, response: Response) {
        let idO: string = request.params.id;
        let idO1: string = request.body.idO1;
        let params = request.body;
        if (idO == null && idO1 == null) {
            response.status(300).json({
                serverResponse: "No se definio id de la orden ni el id del OrdenProducto",
            });
            return;
        }
        var order: BusinessOrder = new BusinessOrder();
        var order1 = await Order1Model.findById(idO1);
        var orderc = await OrderModel.findById(idO);
        params["quantityP"] = orderc.quantityP + order1.quantityP;
        params["priceTotalOrder"] = orderc.priceTotalOrder + order1.priceTotalO;
        var result = await order.addProductToOrder(idO, idO1);
        await order.updateOrder(idO, params);
        if (result == null) {
            response
                .status(300)
                .json({ serverResponse: "La orden no existe o esta asignando un doble OrdenProducto" });
            return;
        }
        response.status(200).json({ message: "OrdenProducto asigando a una orden", serverResponse: result });
    }

    public async addOrderToClient(request: Request, response: Response) {
        let idC: string = request.params.id;
        let idO: string = request.body.idO;
        let params = request.body;
        if (idC == null && idO == null) {
            response.status(300).json({
                serverResponse: "No se definio id de la orden ni el id del Cliente",
            });
            return;
        }
        var order: BusinessOrder = new BusinessOrder();
        var result = await order.addOrderToCli(idC, idO);
        if (result == null) {
            response
                .status(300)
                .json({ serverResponse: "La orden no existe o esta asignado una doble Orden" });
            return;
        }
        response.status(200).json({ message: "Orden asignada a un cliente", serverResponse: result });
    }

    public async getOrders(request: Request, response: Response) {
        const result = await OrderModel.find({});
        response.json({ message: "todos los pedidos", serverResponse: result });
    }

    public async removeOrder(request: Request, response: Response) {
        var order: BusinessOrder = new BusinessOrder();
        let id: string = request.params.id;
        let result = await order.deleteOrder(id);
        response.status(200).json({ message: "pedido  eliminado", serverResponse: result });
    }

    public async getOrderNotDeliandDe(request: Request, response: Response) {
        var product: BusinessOrder = new BusinessOrder();
        let stateOrder: string = request.body.stateOrder;
        if (stateOrder == "entregado" || stateOrder == "no entregado") {
            var result: Array<IOrder> = await product.readOrder(stateOrder);
            response.status(200).json({ serverResponse: result });
        }
        else {
            response.status(200).json({ serverResponse: `debe ingresar un parametro entregado o no entregado` });
        }
    }
    public async updateOrderDeli(request: Request, response: Response) {
        var product: BusinessOrder = new BusinessOrder();
        var id: string = request.params.id;
        var params = request.body;
        params["registerdateD"] = new Date();
        var result = await product.updateOrder(id, params);
        response.status(200).json({ message: "Orden entregada", serverResponse: result });
    }

    public async createnotOrder(request: Request, response: Response) {
        var order: BusinessOrder = new BusinessOrder();
        var id: string = request.params.id;
        var params = request.body;
        params["registerdateO"] = new Date();
        var client = await ClientModule.findById(id);
        params["client"] = client.fullname + " " + client.surname;
        params["telephono"] = client.telephone;
        let result = await order.addorder(id, params);
        response.status(201).json({ message: "causa por la que no realizó el pedido registrado", serverResponse: result });
    }

    public async generateReceipt(request: Request, response: Response) {

    }

}
export default RoutesControllerO;