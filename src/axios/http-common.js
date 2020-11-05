import axios from "axios";

export default axios.create({
  baseURL: "http://api.icndb.com/jokes",
  headers: {
    "Content-type": "application/json"
  }
});