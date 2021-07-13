import ProductModel, { IProduct } from "../models/products";
class BusinessProduct {
    constructor() {
    }
    public async adProduct(product: IProduct) {
        try {
            let productDb = new ProductModel(product);
            let result = await productDb.save();
            return result;
        } catch (err) {
            return err;
        }
    }
    public async updateproduct(id: string, product: any) {

        let result = await ProductModel.update({ _id: id }, { $set: product });
        return result;
    }
    public async deleteUsers(id: string) {
        let result = await ProductModel.remove({ _id: id });
        return result;
    }
}
export default BusinessProduct;