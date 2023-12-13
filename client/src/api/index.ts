import axios from "axios";
import { backend } from "@/config";

const api = axios.create({ baseURL: backend });

export const sendCode = async (code: string) => await api.post("/code", {code});