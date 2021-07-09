import { Request, Response } from'express';
import BusinessClient from "../businessController/BusinessClient";
import { ISimpleClient, IClient } from '../models/Clients';


class RoutesControllerC {
    constructor(){}
    
    public async createClients(req: Request, res: Response){
        let client: BusinessClient = new BusinessClient();
        let clientData = req.body;
        clientData["registerdate"] = new Date();
        let result = await client.addClients(clientData);
        res.status(201).json({ serverResponse: result });
    }
    public async getClients(req: Request, res: Response) {
        var client: BusinessClient = new BusinessClient();
        const result: Array<IClient> = await client.readClients();
        res.status(200).json({ serverResponse: result });
    }
    public async removeClients(req: Request, res: Response) {
        var client: BusinessClient = new BusinessClient();
        let id: string = req.params.id;
        let result = await client.deleteClients(id);
        res.status(200).json({ serverResponse: result });
    }
    public async updateClients(req: Request, res: Response) {
        var client: BusinessClient = new BusinessClient();
        let id: string = req.params.id;
        var params = req.body;
        var result = await client.updateClients(id, params);
        res.status(200).json({ serverResponse: result });
        console.log(id);
        console.log(params);
    }
}
export default RoutesControllerC;