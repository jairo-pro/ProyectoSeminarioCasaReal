
import RoutesControllerC from "./routeController/RoutesControllerC";

import { Express } from "express";
class RoutesC {
  
  private routesControllerC: RoutesControllerC;
  private routeparent: string;
  constructor(routeparent: string, app: Express) {
    
    this.routesControllerC = new RoutesControllerC();
    this.routeparent = routeparent;
    this.configureRoutes(app);
  }
  private configureRoutes(app: Express) {

    //------------------CLIENTS ROUTES---------------------------
    //app.route(`${this.routeparent}/clients`).post(this.routesControllerC.createClients); login implemetar otra ruta
    app.route(`${this.routeparent}/clients`).post(this.routesControllerC.createClients);

    app.route(`${this.routeparent}/clients`).get(this.routesControllerC.getClients);
    app.route(`${this.routeparent}/clients/:id`).delete(this.routesControllerC.removeClients);
    app.route(`${this.routeparent}/clients/:id`).put(this.routesControllerC.updateClients);

    app.route(`${this.routeparent}/clients/:type`).get(this.routesControllerC.getClientsRorP);
    
  }
 

}
export default RoutesC;
