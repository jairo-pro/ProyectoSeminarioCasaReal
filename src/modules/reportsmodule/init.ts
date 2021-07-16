import { Express } from "express";
import Routes from "./routes";
class ReportModules {
    private routes: Routes;
    constructor(root: string, app: Express) {
        console.log("INCIAR ROL");
        this.routes = new Routes(root, app);

    }
}
export default ReportModules;