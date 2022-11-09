import {MicrosoftApiService} from "../MicrosoftApiService";
import {MicrosoftUserDto} from "../../../dtos/MicrosoftUserDto";
import {HttpService} from "@nestjs/axios";
import {Inject, Injectable} from "@nestjs/common";
import {ConfidentialClientApplication} from "@azure/msal-node";
import {LeaveService, LS} from "../../data/services/LeaveService";
import {IOMsg} from "../../../common/IOMsg";
import {CalendarRequestModel} from "../../../usercase/domains/CalendarRequestModel";
import {LeaveEntity} from "../../data/entities/LeaveEntity";

@Injectable()
export class MicrosoftApiServiceImpl implements MicrosoftApiService{

  constructor(
    private readonly httpService: HttpService,
    @Inject(LS)
    private readonly leaveService: LeaveService
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
      return Promise.resolve(null);
    }
  }

  async getLeavesByEmail(model: CalendarRequestModel): Promise<LeaveEntity[] | string> {

    const token = await this.getAccessToken();
    let res : string | LeaveEntity[] = null;

    const leaves : LeaveEntity[] = await this.leaveService.readAll();

    let url = process.env.GRAPH_ENDPOINT
      + 'v1.0/users/' +model.email
      +"/events?$select=start,end,categories&$filter="
      +"start/dateTime ge '"+model.startDate+"' and end/dateTime le '"+model.endDate+"'";

    try {
      if (token !== null){
        for (const leave of leaves) {
          let totalDays = 0;
          const finalUrl = url +" and categories/any(c:c eq '"+leave.leaveName+"')";
          const networkRes = await this.httpService.axiosRef.get(finalUrl,this.getRequestHeader(token));
          networkRes.data.value.forEach(obj=>{
            const startDate = obj.start.dateTime;
            const endDate = obj.end.dateTime;
            totalDays = totalDays + this.getDayDifference(startDate,endDate)
          })
          delete leave.id;
          leave.quantity = 0;
          leave.quantity = totalDays;
        }
        res = leaves;
      }
    }catch (e) {
      console.log("getLeavesByEmailError=",JSON.stringify(e));
      res = IOMsg.ERROR;
    }

    return Promise.resolve(res);
  }

  getDayDifference(startDate: string, endDate: string) : number{
    let sd = new Date(startDate);
    let ed = new Date(endDate);
    let timeDiff = ed.getTime() - sd.getTime();
    return  timeDiff / (1000 * 3600 * 24);
  }
}