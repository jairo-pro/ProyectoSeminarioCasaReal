
import ReunionModel, { IReunion } from "../models/Reunion";
import ClientModel, { IClient } from "../models/Clients";
import UserModel, { IUser } from "../../usermodule/models/Users";
class BusinessClient {
    constructor(){

    }

    public async addReunion(data: any, idc: string, idv: string){
        let client = await ClientModel.findOne({ _id: idc });
        //console.log(client);
        if (client != null){
            let user = await UserModel.findOne({ _id: idv });
            if(user != null) {
                
                data["idVendedor"] = idv;
                data["idClient"] = idc;
                let dataDb = new ReunionModel(data);
                let res = client.reunion.push(dataDb);
                await client.save();
                let result = await dataDb.save();
                return result;
            }
        return null;
        }
    }
    public async getListReunion(){
        let result = await ReunionModel.find();
        return result;
    }
    public async getOneReunion(idr: string){
        let result = await ReunionModel.findOne({ _id: idr });
        return result;
    }
    public async updateReunion(data: any, idr: string) {
        let reunion = await ReunionModel.findOne({ _id: idr });
        if(reunion != null) {
            let idc: string = reunion.idClient;
           // await client.save();
            let result = await ReunionModel.update({ _id: idr }, { $set: data });
            let newR = await ReunionModel.findOne({ _id: idr });
            //console.log(newR);
            let client = await ClientModel.findOne({ _id: idc  });
            let reunionClient: Array<any> = client.reunion;
            for(var i = 0; i<client.reunion.length; i++ ) {
                if(reunionClient[i]._id == idr) {
                    reunionClient[i] = newR;
                    
                }
            }
            let re = await ClientModel.update({ _id: idc }, { $set: { reunion: reunionClient } });
            return await client.save();
        }
        return null;
    }
    public async deleteReunion(id: string) {
        let reunion = await ReunionModel.findOne({ _id: id });
        let idc: string = reunion.idClient;
        let client = await ClientModel.findOne({ _id: idc  });
        let reunionClient: Array<any> = client.reunion;
        for(var i = 0; i<client.reunion.length; i++ ) {
            if(reunionClient[i]._id == id) {
                reunionClient.splice(i, 1);
                
            }
        }
        let re = await ClientModel.update({ _id: idc }, { $set: { reunion: reunionClient } });
        let result = await ReunionModel.remove({ _id: id });
        return result;
    }

}
export default BusinessClient;