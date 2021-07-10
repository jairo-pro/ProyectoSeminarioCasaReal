import { Request, Response } from'express';
import BusinessClient from "../businessController/BusinessClient";
import { ISimpleClient, IClient } from '../models/Clients';


class RoutesControllerC {
    constructor(){}
    
    public async createClients(request: Request, response: Response){
        let client: BusinessClient = new BusinessClient();
        let clientData = request.body;
        clientData["registerdate"] = new Date();
        let result = await client.addClients(clientData);
        response.status(201).json({ serverResponse: result });
    }
    public async getClients(request: Request, response: Response) {
        var client: BusinessClient = new BusinessClient();
        const result: Array<IClient> = await client.readClients();
        response.status(200).json({ serverResponse: result });
    }
    public async removeClients(request: Request, response: Response) {
        var client: BusinessClient = new BusinessClient();
        let id: string = request.params.id;
        let result = await client.deleteClients(id);
        response.status(200).json({ serverResponse: result });
    }
    public async updateClients(request: Request, response: Response) {
        var client: BusinessClient = new BusinessClient();
        let id: string = request.params.id;
        var params = request.body;
        var result = await client.updateClients(id, params);
        response.status(200).json({ serverResponse: result });
        console.log(id);
        console.log(params);
    }

    public async getClientsRorP(request: Request, response: Response){
        var client: BusinessClient = new BusinessClient();
        let type: string = request.params.type;
        console.log(typeof(type));
        if(type == "regular" || type == "potencial" ) {
            var result: Array<IClient> = await client.readClients(type);
            response.status(200).json({ serverResponse: result });
        }
        else {
            var r: string = "regular";
            var p: string = "potencial";
            response.status(200).json({ serverResponse: `debe ingresar un parametro regular o potencial` });
        }
    }
}
export default RoutesControllerC;