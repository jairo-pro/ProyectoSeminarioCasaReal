import ClientModel, { IClient } from "../models/Clients";

import UserModel, { IUser } from "../../usermodule/models/Users";

class BusinessClient {
    constructor(){

    }
    public async readClientL(id: string){
        var result: IClient =  await ClientModel.findOne({ _id: id });
        return result;
    }

    /*public async readClientByVendedor(idv: string, typ: string) {
        console.log(typ);
        console.log(idv);
        let listUserR: Array<IClient> = await ClientModel.find({ idVendedor: idv } || { type: typ });
        return listUserR;
        let result: Array<IClient> = await ClientModel.find({ idVendedor: idv });
        console.log(result  + "000" );
        if(result != null) {
            for(var i=0; i<result.length; i++) {
                let cliR: Array<any> = result;
                if(cliR[i].type != "regular"){
                    cliR.splice(i, 1);
                    //return result;
                    //console.log(cliR[i]  +"1111");
                    console.log(cliR  +"1111");
                } else {
                    cliR.splice(i, 1);
                    console.log(cliR + "222");
                }
                
            }
            return result;
        }
        return null;
        
    }*/

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
        let listClient: Array<IClient> = await ClientModel.find({ idVendedor: idv });
        if(listClient != null) {
            return listClient;
        }
        return null;
    }

    public async addClients(client: IClient) {
        try {
            let clientDb = new ClientModel(client);
            let result = await clientDb.save();
            return result;
        } catch (err) {
            return err;
        }
    }

    public async addClientsV(idv: string, client: IClient) {
        try {
            let vendedor = await UserModel.findOne({ _id: idv });
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
    
    public async deleteClients(id: string) {
        let result = await ClientModel.remove({ _id: id });
        return result;
    }
    public async updateClients(id: string, client: any) {
        let result = await ClientModel.update({ _id: id }, { $set: client });
        return result;
    }

}
export default BusinessClient;