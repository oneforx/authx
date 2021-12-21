import { Schema } from 'mongoose'


export const AccountScopesSchema = new Schema({
  ownerId: String,
  scopes: [String]
});

export const AccountSchema = new Schema({
  email: String,
  password: String
});

export default { AccountScopesSchema, AccountSchema  }
