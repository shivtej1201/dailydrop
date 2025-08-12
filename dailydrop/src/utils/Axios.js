import { baseURL } from "../common/SummaryApi";
import axios from "axios";

const Axios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default Axios;
