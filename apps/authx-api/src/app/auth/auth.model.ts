import { model, Schema } from 'mongoose'

const AuthSchema = new Schema({
  clientId: String,
  ownerId: String,
  accessToken: String,
  refreshToken: String
})

export default model("auth", AuthSchema)
