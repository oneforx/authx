import { model, Schema, SchemaTypes } from "mongoose";
import { AccountScopesSchema } from '../account/account.schema'

const ClientSchema = new Schema({
  ownerId: String,
  name: String,
  secret: String,
  authorisedAccount: [AccountScopesSchema]
});

export default model("client", ClientSchema)
