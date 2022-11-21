import {AuthPresenter} from "../presenters/AuthPresenter";
import {IOMsg} from "../../common/IOMsg";
import {IOCode} from "../../common/IOCode";
import {AuthDto} from "../../dtos/AuthDto";

export class AuthResponseModel implements AuthPresenter{
  authToken: string;
  refreshToken: string
  msg: string;
  code: number;

  buildLoginOrRefreshResponse(authDto: AuthDto): Promise<AuthResponseModel> {

    this.msg = IOMsg.USER_NOT_FOUND;
    this.code = IOCode.ERROR

    if (authDto.authToken && authDto.refreshToken){
      this.msg = IOMsg.LOGIN_SUCCESS;
      this.code = IOCode.OK;
      this.authToken = authDto.authToken;
      this.refreshToken = authDto.refreshToken;
    }

    return Promise.resolve(this);
  }
}