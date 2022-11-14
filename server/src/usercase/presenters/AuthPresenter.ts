import {AuthResponseModel} from "../domains/AuthResponseModel";
import {AuthDto} from "../../dtos/AuthDto";

export const AP = "AP"
export interface AuthPresenter{
  buildLoginOrRefreshResponse(authDto: AuthDto) : Promise<AuthResponseModel>
}