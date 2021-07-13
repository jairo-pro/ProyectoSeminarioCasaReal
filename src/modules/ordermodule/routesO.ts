import RoutesControllerO from "./routeController/RoutesControllerO";
import { Express } from "express";
class RoutesO {
  private routesControllerO: RoutesControllerO;
  private routeparent: string;
  constructor(routeparent: string, app: Express) {
    this.routesControllerO = new RoutesControllerO();
    this.routeparent = routeparent;
    this.configureRoutes(app);
  }
  private configureRoutes(app: Express) {
    //**-----------------------------------PRODUCTS ROUTES-----------------------------**/
    app
      .route(`${this.routeparent}/addproducts`)
      .post(this.routesControllerO.createProducts);
    app
      .route(`${this.routeparent}/getproducts`)
      .get(this.routesControllerO.getProduct);
    app
      .route(`${this.routeparent}/updateproducts/:id`)
      .put(this.routesControllerO.updateProduct);
    app
      .route(`${this.routeparent}/removeproducts/:id`)
      .delete(this.routesControllerO.removeProduct);

    //**---------------------------------------ORDERS ROUTES----------------------------**/

  }
}
export default RoutesO;