import express, { Express } from "express";
import * as bodyParser from "body-parser";
import UserModules from "./modules/usermodule/init";
import OrderModules from "./modules/ordermodule/initO";
import ClientsModules from "./modules/clientmodule/init";
import ReportModules from "./modules/reportsmodule/init";
import mongoose, { Mongoose } from "mongoose";
import FileUpload from "express-fileupload";
import ClientModule from "./modules/clientmodule/init";
//import ReportModules from "./modules/reportsmodule/init";
class App {
  public app: Express = express();
  public mongooseClient: Mongoose;
  constructor() {
    this.configuration();
    this.connectDatabase();
    this.initApp();
  }
  public connectDatabase() {
    let host: string = "mongodb://172.21.0.2:27017";
    let database: string = process.env.DATABASE || "seminario";
    let connectionString: string = `${host}/${database}`;
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
    });
    //Eventos
    mongoose.connection.on("error", (err) => {
      console.log("Connection FAIL");
      console.log(err);
    });
    mongoose.connection.on("open", () => {
      console.log("DATABASE CONNECTION SUCCESS!");
    });
    this.mongooseClient = mongoose;
  }
  public configuration() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(FileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));
  }
  public initApp() {
    console.log("LOAD MODULES");
    const userModule = new UserModules("/api", this.app);
    const productModule = new OrderModules("/api", this.app);
    const clientsModules = new ClientsModules("/api", this.app);
    const ReportsModules = new ReportModules("/api", this.app);

  }
}
export default new App();
