import { Request, Response } from "express";
import BusinessOrder from "../businessController/BusinessOrder";
import BusinessProduct from "../businessController/BusinessProduct";
import path from "path";
import ProductModel, { IProduct } from "../models/products";

class RoutesControllerO {
    constructor() { }
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
        var user: BusinessProduct = new BusinessProduct();
        let id: string = request.params.id;
        var params = request.body;
        var result = await user.updateproduct(id, params);
        response.status(200).json({ message: "producto actualizado", serverResponse: result });
    }

    public async removeProduct(request: Request, response: Response) {
        var user: BusinessProduct = new BusinessProduct();
        let id: string = request.params.id;
        let result = await user.deleteUsers(id);
        response.status(200).json({ message: "producto eliminado", serverResponse: result });
    }

}
export default RoutesControllerO;