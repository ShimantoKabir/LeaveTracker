import {AuthPresenter} from "../presenters/AuthPresenter";

export class AuthResponseModel implements AuthPresenter{
  authToken: string;
  refreshToken: string
}