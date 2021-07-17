import ClientModel, { IClient } from "../models/Clients";

import UserModel, { IUser } from "../../usermodule/models/Users";

class BusinessClient {
    constructor(){

    }
    public async readClientL(id: string){
        var result: IClient =  await ClientModel.findOne({ _id: id });
        return result;
    }

    public async readClientByVendedor(idv: string, typ: string) {
        console.log(typ);
        console.log(idv);
        //let listUserR: Array<IClient> = await ClientModel.find({ idVendedor: idv } || { type: typ });
        //return listUserR;
        if(typ == "regular") {
            let result: Array<IClient> = await ClientModel.find({ idVendedor: idv, type: "regular" });
            console.log(result);
            return result;
            
        } else {
            let results: Array<IClient> = await ClientModel.find({ idVendedor: idv, type: "potencial" });
            console.log(results);
            return results;
        }
        
        
    }

    public async readClients(): Promise<Array<IClient>>;
    //public async readClients(id: string): Promise<IClient>;
    public async readClients(types: string): Promise<Array<IClient>>;
    public async readClients(query: any, skip: number, limit: number): Promise<Array<IClient>>;

    public async readClients(params1?: string | any, params2?: number, params3?: number): Promise<Array<IClient> | IClient> {
        
        /*if (params1 && typeof params1 == "string") {
            var result: IClient = await ClientModel.findOne({ _id: params1 });
            return result;*/
        if(params1 == "regular" ) {
            let listUserR: Array<IClient> = await ClientModel.find({type: "regular"});
            return listUserR;
        
        
        } else if(params1 == "potencial" ) {
            let listUserR: Array<IClient> = await ClientModel.find({type: "potencial"});
            return listUserR;
        } else if (params1) {
            let skip = params2 ? params2 : 0;
            let limit = params3 ? params3 : 1;
            let listUser: Array<IClient> = await ClientModel.find(params1).skip(skip).limit(limit);
            return listUser;
        } 
        
        /*let listUser: Array<IClient> = await ClientModel.find({ type:'regular' });
        return listUser;*/
        
        
        else {
            let listUser: Array<IClient> = await ClientModel.find();
            return listUser;

        }
    }
    public async readClientsByVendedor(idv: string) {
        let userVendedor =  await UserModel.findOne({ _id: idv, type: "vendedor" });
        let listClient: Array<IClient> = await ClientModel.find({ idVendedor: idv });
        if(listClient != null && userVendedor != null) {
            return listClient;
        }
        return null;
    }
    public async readClientsAdmin(ida: string) {
        let admin = await UserModel.findOne({ _id: ida, type: "administrador" });
            if(admin != null){
                let listUser: Array<IClient> = await ClientModel.find();
                return listUser;
            }
            return null;
    }

    public async addClients(ida: string, idv: string, client: IClient) {
        try {
            let admin = await UserModel.findOne({ _id: ida, type: "administrador" });
            if(admin != null){
                let vendedor = await UserModel.findOne({ _id: idv });
                if(vendedor != null) {
                    client["registerdate"] = new Date();
                    client["idVendedor"] = idv;
                    let clientDb = new ClientModel(client);
                    let result = await clientDb.save();
                    return result;
                }
                return null;
            }
            return null;
           
        } catch (err) {
            return err;
        }
    }

    public async addClientsV(idv: string, client: IClient) {
        try {
            let vendedor = await UserModel.findOne({ _id: idv, type: "vendedor" });
            if(vendedor != null) {
                client["registerdate"] = new Date();
                client["idVendedor"] = idv;
                let clientDb = new ClientModel(client);
                let result = await clientDb.save();
                return result;
            }
            return null;

        } catch (err) {
            return err;
        }
    }
    
    public async deleteClients(id: string, ida: string) {
        let admin = await UserModel.findOne({ _id: ida, type: "administrador" });
        if(admin != null){
            let clien = await ClientModel.findOne({ _id: id });
            if(clien != null) {
                let result = await ClientModel.remove({ _id: id });
                return result;
            }
            return null;
        }
        
        return null;
    }

    public async deleteClientsByVendedor(id: string, idv: string) {
        let userVendedor = await UserModel.findOne({ _id: idv, type: "vendedor" });
        let client = await ClientModel.findOne({ _id: id });
        if (client!= null && userVendedor != null ) {
            if(client.idVendedor == idv){
                let result = await ClientModel.remove({ _id: id });
                return result;
            }
            return null;
        }
        return null;
        
    }
    public async updateClients(id: string, ida: string, cliente: any) {
        let admin = await UserModel.findOne({ _id: ida, type: "administrador" });
        let client = await ClientModel.findOne({ _id: id });
        if (client!= null && admin != null ) {
            let result = await ClientModel.update({ _id: id }, { $set: cliente });
            return result;
        }
        return null;
        
    }
    public async updateClientsByVendedor(idc: string, idv: string, data: any) {
        let client = await ClientModel.findOne({ _id: idc });
        let userVendedor = await UserModel.findOne({ _id: idv, type: "vendedor" })
        if (client != null && userVendedor != null) {
            if(client.idVendedor == idv) {
                data["updateAt"] = new Date();
                let result = await ClientModel.update({ _id: idc }, { $set: data });
                return result;
            }
            return null;
        }
        return null;
        
    }
    public async convertRegular(idc: string, idv: string, data: any) {
        let client = await ClientModel.findOne({ _id: idc });
        if (client != null) {
            if(client.idVendedor == idv && client.probability > 50) {
                data["updateAt"] = new Date();
                let result = await ClientModel.update({ _id: idc }, { $set: data });
                return result;
            }
            return null;
        }
        return null;
        
    }
    

}
export default BusinessClient;