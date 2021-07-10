import ClientModel, { IClient } from "../models/Clients";

class BusinessClient {
    constructor(){

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

    public async addClients(client: IClient) {
        try {
            let clientDb = new ClientModel(client);
            let result = await clientDb.save();
            return result;
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