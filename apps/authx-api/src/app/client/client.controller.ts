import { Router } from 'express'

const ClientController = Router();

// There is client that will be able to create account and use account
ClientController.get("/", (req, res) => {
  res.status(200).json({ msgId: "found_clients" })
});

ClientController.post("/", (req, res) => {
  res.status(200).json({ msgId: "create_client" })
});


export default ClientController
