import { HttpService } from "../../baseRepositories/api/http/axios/axios-http-service";
import ApiRepository from "../../baseRepositories/api/respository";
import { RequestData } from "../../http/Http";

export default class AuthRepository extends ApiRepository {
  constructor() {
    super("auth");
  }

  public async login<T>(username: string, password: string): Promise<T> {
    const data: RequestData = {
      endpoint: `${this.endpoint}/login`,
      body: { username, password },
    };

    return HttpService.postAsync(data);
  }
}
