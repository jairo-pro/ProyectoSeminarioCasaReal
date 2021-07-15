import ProductModel, { IProduct } from "../models/products";
class BusinessProduct {
    constructor() {
    }
    public async readProduct(): Promise<Array<IProduct>>;
    public async readProduct(id: string): Promise<IProduct>;
    public async readProduct(query: any, skip: number, limit: number): Promise<Array<IProduct>>;

    public async readProduct(params1?: string | any, params2?: number, params3?: number): Promise<Array<IProduct> | IProduct> {
        if (params1 && typeof params1 == "string") {
            var result: IProduct = await ProductModel.findOne({ _id: params1 });
            return result;
        } else if (params1) {
            let skip = params2 ? params2 : 0;
            let limit = params3 ? params3 : 1;
            let listUser: Array<IProduct> = await ProductModel.find(params1).skip(skip).limit(limit);
            return listUser;
        } else {
            let listUser: Array<IProduct> = await ProductModel.find();
            return listUser;

        }
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