import { User } from "./userModel";
import { Request, Response } from "express";
import dbQueries from "../../services/dbQueries";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const DBQueries = new dbQueries();


export const userRegistration = async (req: Request, res: Response) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.email)
      return res
        .status(400)
        .send("All fields (username,password,email) required");
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    if (!hashedPassword) {
      return res.status(400).send("Give correct password");
    }
    const findUsers = await DBQueries.findUser(email);
    if (findUsers) return res.status(500).send("User already exists");
    const register = await User.create({
      username: username,
      password: hashedPassword,
      email: email,
    });
    res.status(200).send({ "User registered": register });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};


export const userLogin = async (req: Request, res: Response) => {
  try {
    if (!req.body.email || !req.body.password)
      return res.status(400).send("All fields required");
    const { email, password } = req.body;
    const findUsers = await DBQueries.findUser(email);
    if (!findUsers) return res.status(500).send("User not registered");
    const validateUser = await bcrypt.compare(password, findUsers.password);
    if (!validateUser)
      return res.status(400).send("Provided username or password is incorrect");
    const token = jwt.sign(
      {
        id: findUsers.id,
        username: findUsers.username,
        isadmin: findUsers.isadmin,
      },
      "process.env.ACCESS_TOKEN"
    );
    res.status(200).send({ token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};




