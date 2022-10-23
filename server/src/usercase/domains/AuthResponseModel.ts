import {AuthPresenter} from "../presenters/AuthPresenter";
import {AuthRequestModel} from "./AuthRequestModel";

export class AuthResponseModel implements AuthPresenter{
  authToken: string;
  refreshToken: string
  msg: string;
  code: string;

  buildLoginResponse(authToken : string, refreshToken: string): Promise<AuthResponseModel> {

    if (authToken && refreshToken){

    }

    return Promise.resolve(this);
  }
}