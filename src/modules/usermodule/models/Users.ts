import mongoose, { Schema, Document } from "mongoose";
import RolesModel, { IRoles } from "./Roles";

export interface ISimpleUser {
  username?: string;
  email?: string;
  registerdate?: Date;
  passwordT?: string;
  password?: string;
  roles?: Array<IRoles>;
  uriavatar?: string;
  pathavatar?: string;
}
export interface IUser extends Document {
  username: string;
  email: string;
  registerdate: Date;
  passwordT: string,
  password: string;
  roles: Array<IRoles>;
  uriavatar: string;
  pathavatar: string;
}
const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  registerdate: { type: Date, required: true },
  passwordT: { type: String },
  password: { type: String },
  roles: { type: Array },
  uriavatar: { type: String },
  pathavatar: { type: String },
});
export default mongoose.model<IUser>("User", userSchema);
