import {AuthRequestModel} from "../domains/AuthRequestModel";
import {AuthResponseModel} from "../domains/AuthResponseModel";

export const AP = "AP"
export interface AuthPresenter{
  buildLoginOrRefreshResponse(authToken : string|null, refreshToken: string|null) : Promise<AuthResponseModel>
}