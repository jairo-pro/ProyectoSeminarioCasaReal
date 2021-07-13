
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

    app.route(`${this.routeparent}/clients/:type`)
      .get(this.routesControllerC.getClientsRorP); //listar clients regulares o potenciales

    //--------------------REUNIONS ROUTES-------------------------------
    app.route(`${this.routeparent}/reunion/:idC/:idV`) //es necesario mandar como parametro id del 
      .post(this.routesControllerC.createReunions); // cliente 'idC' e idvendedor 'idV'
    app.route(`${this.routeparent}/reunion`).get(this.routesControllerC.getReunion);
    app.route(`${this.routeparent}/reunion/:idr`).put(this.routesControllerC.editedReunion); // idr= id reunion
    app.route(`${this.routeparent}/reunion/:id`).delete(this.routesControllerC.removeReunion);
    
  }
 

}
export default RoutesC;
