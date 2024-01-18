import { Endpoints } from "./endpoints";
import http from "./http";
const baseUrlEnv = import.meta.env.VITE_REACT_APP_BASE_URL;

export class ApiNetworkService {
  static getGithubUsers() {
    return http.get(`${baseUrlEnv}/${Endpoints.USERS}`);
  }
  static submitPractical(payload : any) {
    return http.post(`/${Endpoints.SUBMIT_PRACTICAL}`, payload);
  }
  static getPracticalData(payload: any){
    return http.get(`/${Endpoints.GET_PRACTICAL_DATA}`, payload);
  }
}
