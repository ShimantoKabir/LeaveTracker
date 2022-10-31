import {MicrosoftApiService} from "../MicrosoftApiService";
import {MicrosoftUserDto} from "../../../dtos/MicrosoftUserDto";
import {HttpService} from "@nestjs/axios";
import {Injectable} from "@nestjs/common";
import {ConfidentialClientApplication} from "@azure/msal-node";

@Injectable()
export class MicrosoftApiServiceImpl implements MicrosoftApiService{

  constructor(
    private readonly httpService: HttpService
  ) {}

  async getUserByEmail(email: string): Promise<MicrosoftUserDto | null> {

    const token = await this.getAccessToken();
    let res : null | MicrosoftUserDto = null;

    try {
      if (token !== null){
        const networkRes = await this.httpService.axiosRef.get<MicrosoftUserDto>(
          process.env.GRAPH_ENDPOINT + 'v1.0/users/'+email,
          this.getRequestHeader(token)
        );
        res = networkRes.data;
      }
    }catch (e) {
      console.log("getUserByEmailError=",e);
    }

    return Promise.resolve(res);
  }

  getRequestHeader(token: string) : any{
    return  {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  }

  async getAccessToken() : Promise<string | null> {

    try {

      const cca = new ConfidentialClientApplication({
        auth :{
          clientId: process.env.CLIENT_ID,
          authority: process.env.AAD_ENDPOINT + process.env.TENANT_ID,
          clientSecret: process.env.CLIENT_SECRET,
        }
      });

      const authRes = await cca.acquireTokenByClientCredential({
        scopes: [process.env.GRAPH_ENDPOINT + '.default'],
      });

      return Promise.resolve(authRes.accessToken ? authRes.accessToken : null);
    }catch (e){
      console.log("getAccessTokenError=",e)
      return Promise.resolve(null);
    }
  }
}