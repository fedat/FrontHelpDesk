import { config } from "../config";
import axios from 'axios';
export const LoginService = data => axios.post(config.API_URL +"/auth/login", data);
