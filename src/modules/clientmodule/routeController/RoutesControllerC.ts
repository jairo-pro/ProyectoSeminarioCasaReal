import { Request, Response } from'express';
import BusinessClient from "../businessController/BusinessClient";
import BusinessReunion from "../businessController/BusinessReunion";
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
            response.status(200).json({ serverResponse: `debe ingresar un parametro regular o potencial` });
        }
    }


    //----------------------------------REUNIONS------------------------
    public async createReunions(request: Request, response: Response){
        let reunion: BusinessReunion = new BusinessReunion();
        var reunionData = request.body;
        var idc: string = request.params.idC;
        var idv: string = request.params.idV;
        if (idc ==  null || idv == null){
            response.status(300).json({ serverResponse: "es necesario el id cliente y vendedor" });
            return;
        }
        let result = await reunion.addReunion(reunionData, idc, idv );
        if (result == null) {
            response.status(300).json({ serverResponse: "elcliente o vendedor no existen" });
            return;
        }
        
        if (request.body.fecha == null) {
            response.status(300).json({ serverResponse: "es necesario una fecha para reunion" });
            return;
        }
        response.status(200).json({ serverResponse: result });

        
    }
    public async getReunion(request: Request, response: Response) {
        let reunion: BusinessReunion = new BusinessReunion();
        let result = await reunion.getListReunion();
        response.status(200).json({ serverResponse: result })
    }
    public async editedReunion(request: Request, response: Response) {
        var reunion: BusinessReunion = new BusinessReunion();
        var id: string = request.params.idr;
        if (id == null){
            response.status(300).json({ serverResponse: "es necesario un id de reunion" });
            return;
        }
        var reunionData = request.body;
        reunionData["updateAt"] = new Date();
        let result = await reunion.updateReunion(reunionData, id);
        if (result == null) {
            response.status(300).json({ serverResponse: "id reunion incorrecto" });
            return;
        }
        response.status(200).json({ serverResponse: result });
    }
    public async removeReunion(request: Request, response: Response) {
        var reunion: BusinessReunion = new BusinessReunion();
        let id: string = request.params.id;
        let result = await reunion.deleteReunion(id);
        response.status(200).json({ serverResponse: result });
    }
}
export default RoutesControllerC;