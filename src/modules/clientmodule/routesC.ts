
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
    app.route(`${this.routeparent}/clients/:idV`).post(this.routesControllerC.createClientsV);//idV id usuario vendedor

    app.route(`${this.routeparent}/clients`).get(this.routesControllerC.getClients);
    app.route(`${this.routeparent}/clients/:idV`).get(this.routesControllerC.getClientsByV);// all clienst captados por vende

    app.route(`${this.routeparent}/clients/:id`).delete(this.routesControllerC.removeClients);
    app.route(`${this.routeparent}/clients/:id/:idv`).delete(this.routesControllerC.removeClientsByV);

    app.route(`${this.routeparent}/clients/:id`).put(this.routesControllerC.updateClients);
    app.route(`${this.routeparent}/clients/:id/:idv`).put(this.routesControllerC.updateClientsByV);

    app.route(`${this.routeparent}/clients/type/:type`)
      .get(this.routesControllerC.getClientsRorP); //listar clients regulares o potenciales
    //app.route(`${this.routeparent}/clients/:type/:idV`)
      //.get(this.routesControllerC.getClientsRorPByV);//listar clients regulares o potenciales By vendedor

    app.route(`${this.routeparent}/uploadphoto/:id`).post(this.routesControllerC.uploadPhoto);
    app.route(`${this.routeparent}/getphoto/:id`).get(this.routesControllerC.getPhoto);

    //--------------------REUNIONS ROUTES-------------------------------
    app.route(`${this.routeparent}/reunion/:idC/:idV`) //es necesario mandar como parametro id del 
      .post(this.routesControllerC.createReunions); // cliente 'idC' e idvendedor 'idV'
    app.route(`${this.routeparent}/reunion`).get(this.routesControllerC.getReunion);
    app.route(`${this.routeparent}/reunion/:idr`).put(this.routesControllerC.editedReunion); // idr= id reunion
    app.route(`${this.routeparent}/reunion/:id`).delete(this.routesControllerC.removeReunion);
    
  }
 

}
export default RoutesC;
