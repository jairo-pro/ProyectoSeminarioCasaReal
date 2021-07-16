import { Express } from "express";
import RoutesC from "./routesC";
class ClientModule {
    private routes: RoutesC;
    constructor(root: string, app: Express) {
        console.log("INIT CLIENT MODULEE");
        this.routes = new RoutesC(root, app);

    }
    

}
export default ClientModule;