import { Router } from "express"
import { authorClient } from "../../utils"
import AuthService from './auth.service'
const AuthController = Router()

// Sign Up

AuthController.post("/signin", authorClient, async (req, res) => {
  res.status(200).json({ msgId: "signed_up" })
});

export default AuthController
