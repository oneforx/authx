import { Router } from 'express'
import accountModel from './account.model';
import { authorUser } from '../../utils';

const AccountController = Router();

// Get account by access token
AccountController.get("/", authorUser, (req, res) => {
  const account = accountModel.find({ email: req.user.email });
  res.status(200).json({ msgId: "find_account_success", msgData: account });
});

// Create an account
AccountController.post("/", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (
    typeof email === "string" &&
    password === confirmPassword
  ) {

    const hashedPassword = hashSync(password, 21);
    await accountModel.create({
      email,
      password: hashedPassword
    }).then(() => {
      res.status(201).json({ msgId: "account_created" });
    }).catch(() => {
      res.status(400).json({ msgId: "invalid_parameters"})
    });

  } else {
    res.status(400).json({ msgId: "invalid_parameters" });
  }
});

export default AccountController
