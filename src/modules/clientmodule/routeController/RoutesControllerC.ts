import { Request, Response } from'express';
import BusinessClient from "../businessController/BusinessClient";
import BusinessReunion from "../businessController/BusinessReunion";
import { ISimpleClient, IClient } from '../models/Clients';
import isEmpty from "is-empty";
import path from "path";
import sha1 from "sha1";

class RoutesControllerC {
    constructor(){}
    
    public async createClients(request: Request, response: Response){
        
        let client: BusinessClient = new BusinessClient();
        let ida: string = request.params.ida
        let idv: string = request.params.idv;
        let clientData = request.body;
        //clientData["registerdate"] = new Date();
        
        let result = await client.addClients(ida, idv, clientData);
        if(result == null ){
            response.status(300).json({ serverResponse: "no existe el vendedor o admin incirrecto" });
            return;
        }
        response.status(201).json({ serverResponse: result });
    }
    public async createClientsV(request: Request, response: Response){// creacion de un cliente con id de vendedor
        let client: BusinessClient = new BusinessClient();
        let clientData = request.body;
        let idv: string = request.params.idV;
        if (idv == null) {
            response.status(300).json({ serverResponse: "es necesrio un id de vendedor" });
            return;
        }
        let result = await client.addClientsV(idv, clientData);
        if(result == null ){
            response.status(300).json({ serverResponse: "no existe el vendedor" });
            return;
        }
        response.status(201).json({ serverResponse: result });
    }
    public async getClients(request: Request, response: Response) {
        var client: BusinessClient = new BusinessClient();
        let ida: string = request.params.ida;
        const result: Array<IClient> = await client.readClientsAdmin(ida);
        if(result == null ){
            response.status(300).json({ serverResponse: "no existe el admin" });
            return;
        }
        response.status(200).json({ serverResponse: result });
    }
    public async getClientsByV(request: Request, response: Response) { //listar clientes por vendedor
        var client: BusinessClient = new BusinessClient();
        var idv: string = request.params.idV;
        
        if (idv == null) {
            response.status(300).json({ serverResponse: "es necesrio un id de vendedor" });
            return;
        }
        const result: Array<IClient> = await client.readClientsByVendedor(idv);
        if(result == null ){
            response.status(300).json({ serverResponse: "no existe el vendedor" });
            return;
        }
        response.status(200).json({ serverResponse: result });
    }

    public async removeClients(request: Request, response: Response) {
        var client: BusinessClient = new BusinessClient();
        let id: string = request.params.id;
        let ida: string = request.params.ida;
        let result = await client.deleteClients(id, ida);
        if(result == null ){
            response.status(300).json({ serverResponse: "no existe el client o admin" });
            return;
        } 
        response.status(200).json({ serverResponse: result });
    }
    public async removeClientsByV(request: Request, response: Response) {
        var client: BusinessClient = new BusinessClient();
        let id: string = request.params.id;
        let idv: string = request.params.idv;
        if(id == null || idv == null) {
            response.status(300).json({ serverResponse: "ids necesarios" });
            return;
        }
        let result = await client.deleteClientsByVendedor(id, idv);
        if (result == null) {
            response.status(300).json({ serverResponse: "no existe el clinte o vendedor" });
            return;
        }
        response.status(200).json({ serverResponse: result });
    }


    public async updateClients(request: Request, response: Response) {
        var client: BusinessClient = new BusinessClient();
        let id: string = request.params.id;
        let ida: string = request.params.ida;
        var params = request.body;
        var result = await client.updateClients(id, ida, params);
        if (result == null) {
            response.status(300).json({ serverResponse: "no existe el admin o client" });
            return;
        }
        response.status(200).json({ serverResponse: result });
        console.log(id);
        console.log(params);
    }
    public async updateClientsByV(request: Request, response: Response) {
        var client: BusinessClient = new BusinessClient();
        let idc: string = request.params.id;
        let idv: string = request.params.idv;
        if(idc == null || idv == null) {
            response.status(300).json({ serverResponse: "ids necesarios" });
            return;
        }
        let params = request.body;
        let result = await client.updateClientsByVendedor(idc, idv, params);
        if (result == null) {
            response.status(300).json({ serverResponse: "no existe el clinte o vendedor" });
            return;
        }
        response.status(200).json({ serverResponse: result });
    }

    public async changeClient(request: Request, response: Response){
        let client: BusinessClient = new BusinessClient();
        let idc: string = request.params.idc;
        let idv: string = request.params.idv;
        if(idc == null || idv == null) {
            response.status(300).json({ serverResponse: "ids necesarios" });
            return;
        }
        let typ = request.body;
        let tipo = typ["type"];
        if(tipo != "potencial"){
            response.status(300).json({ serverResponse: "el cliente ya es de tipo regular" });
            return;
        }
        let result = await client.convertRegular(idc, idv, typ);
        if (result == null) {
            response.status(300).json({ serverResponse: "sin probabilidad de pase" });
            return;
        }
        response.status(200).json({ serverResponse: result });
    }

    public async getClientsRorP(request: Request, response: Response){
        var client: BusinessClient = new BusinessClient();
        let type: string = request.params.type;
        //console.log(typeof(type));
        if(type == "regular" || type == "potencial" ) {
            var result: Array<IClient> = await client.readClients(type);
            response.status(200).json({ serverResponse: result });
        }
        else {
            response.status(200).json({ serverResponse: `debe ingresar un parametro regular o potencial` });
        }
    }
    public async getClientsRorPByV(request: Request, response: Response) {
        let client: BusinessClient = new BusinessClient();
        let type: string = request.params.type;
        let idv: string = request.params.idV;
        if(type == "regular" || type == "potencial" ) {
            var result: Array<IClient> = await client.readClientByVendedor(idv, type);
            if(result == null) {
                response.status(200).json({ serverResponse: "error" });
                return;
            }
            response.status(200).json({ serverResponse: result });
            return;

        }
        else {
            response.status(200).json({ serverResponse: `debe ingresar un parametro regular o potencial` });
            return;

        }
        //response.status(200).json({ serverResponse: `debe ingresar un parametro regular o potencial` });
    }

    //-----------------------------PHOTO------------------------------

    public async uploadPhoto(request: Request, response: Response) {
        var id: string = request.params.id;
        if (!id) {
            response.status(300).json({ serverResponse: "el id es necesrio para subir una foto" });
            return;
        }
        var client: BusinessClient = new BusinessClient();
        var clientoUpdate: IClient = await client.readClientL(id);
        if (!clientoUpdate) {
            response.status(300).json({ serverResponse: "El cliente no existe!!" });
            return;
        }
        if (isEmpty(request.files)) {
            response.status(300).json({ serverResponse: "No existe un archivo adjunto" });
            return;
        }
        var dir = `${__dirname}/../../../../clientfiles`;// para desplazarse al directorio avatarfiles
        var absolutepath = path.resolve(dir);
        var files: any = request.files;
        var key: Array<string> = Object.keys(files);

        var copyDirectory = (totalpath: string, file: any) => {
            return new Promise((resolve, reject) => {
                file.mv(totalpath, (err: any, success: any) => {
                    if (err) {
                        resolve(false);
                        return;
                    }
                    resolve(true);
                    return;
                });
            });
        };
        for (var i = 0; i < key.length; i++){
            var file: any = files[key[i]];
            var filehash: string = sha1(new Date().toString()).substr(0, 7);
            var newname: string = `${filehash}_${file.name}`;
            var totalpath = `${absolutepath}/${newname}`;
            await copyDirectory(totalpath, file);
            clientoUpdate.uriphoto = "/api/getphoto" + id;
            clientoUpdate.pathphoto = totalpath;
            var clientResult: IClient = await clientoUpdate.save();
        }
        var simpleClient: ISimpleClient = {
            fullname: clientResult.fullname,
            uriphoto: clientResult.uriphoto,
            pathphoto: clientResult.pathphoto,
        };
        response.status(300).json({ serverResponse: simpleClient });

    }
    public async getPhoto(request: Request, response: Response) {
        var id: string = request.params.id;
        if (!id) {
            response.status(300).json({ serverResponse: "Identificador no encontrado" });
            return;
        }
        var client: BusinessClient = new BusinessClient();
        var clientData: IClient = await client.readClientL(id);
        if (!clientData) {
            response.status(300).json({ serverResponse: "Error el cliente no existe" });
            return;
        }
        if (clientData.pathphoto ==  null) {
            response.status(300).json({ serverResponse: "No existe foto " });
            return;
        }
        response.sendFile(clientData.pathphoto);// sendfile devuelve la imagen q esta en pathavatar
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
            response.status(300).json({ serverResponse: "client regular not o vendedor no existen" });
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
    public async getOneReunion(request: Request, response: Response) {
        let reunion: BusinessReunion = new BusinessReunion();
        let idr: string = request.params.idr;
        let result = await reunion.getOneReunion(idr);
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