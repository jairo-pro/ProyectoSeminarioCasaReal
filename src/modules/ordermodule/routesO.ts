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
      .route(`${this.routeparent}/updateproducts/:id`)   //id del producto
      .put(this.routesControllerO.updateProduct);
    app
      .route(`${this.routeparent}/removeproducts/:id`)   //id del producto
      .delete(this.routesControllerO.removeProduct);
    app
      .route(`${this.routeparent}/addphoto/:id`)     //id del producto
      .post(this.routesControllerO.uploadPhoto);
    app
      .route(`${this.routeparent}/getphoto/:id`)   //id del producto
      .get(this.routesControllerO.getPhoto);

    /*-----------------------------------------ORDER1 ROUTES------------------------------ */
    app
      .route(`${this.routeparent}/addorder1/:id`)
      .post(this.routesControllerO.addOrder1);
    app
      .route(`${this.routeparent}/getorder1`)   //id del producto
      .get(this.routesControllerO.getOrder1);
    app
      .route(`${this.routeparent}/removeorder1/:id`)   //id del producto
      .delete(this.routesControllerO.removeOrder1);

    //**---------------------------------------ORDERS ROUTES----------------------------**/
    app
      .route(`${this.routeparent}/addOrder/:id`) // id del cliente
      .post(this.routesControllerO.addOrder);
    app
      .route(`${this.routeparent}/getorder`)
      .get(this.routesControllerO.getOrders);
    app
      .route(`${this.routeparent}/addOrder1ToOrder/:id`)   //id Orden  
      .put(this.routesControllerO.addProductToOrder);
    app
      .route(`${this.routeparent}/removeorder/:id`)   //id del pedido
      .delete(this.routesControllerO.removeOrder);
    app
      .route(`${this.routeparent}/getordernotDandDe`)
      .get(this.routesControllerO.getOrderNotDeliandDe);
    app
      .route(`${this.routeparent}/registerDeli/:id`)   //id Orden  
      .put(this.routesControllerO.updateOrderDeli);
    app
      .route(`${this.routeparent}/addOrderToClient/:id`)   //id del cliente
      .put(this.routesControllerO.addOrderToClient);
    app
      .route(`${this.routeparent}/generateRec/:id`)
      .get(this.routesControllerO.generateReceipt);
    app
      .route(`${this.routeparent}/getpdf/:id`)
      .get(this.routesControllerO.getpdf);
  }
}
export default RoutesO;