
import dotenv from "dotenv";
dotenv.config();

const SERVER_KEY = process.env.SECRET;


export default function Authorization(req) {
  const {apiKey} = req.query;
  if(apiKey != SERVER_KEY) {
    return false;
  }
  else return true;
}
