import { Express } from "express";
import RoutesO from "./routesO";
class OrderModule {
    private routes: RoutesO;
    constructor(root: string, app: Express) {
        console.log("INIT ORDER MODULE");
        this.routes = new RoutesO(root, app);

    }
}
export default OrderModule;