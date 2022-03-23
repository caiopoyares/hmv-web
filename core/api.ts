import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_API_URL,
});
