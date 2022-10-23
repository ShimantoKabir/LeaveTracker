import {AuthRequestModel} from "../domains/AuthRequestModel";
import {AuthResponseModel} from "../domains/AuthResponseModel";

export const AIB = "AIB";
export interface AuthInteractorBoundary{
  login(authRequestModel: AuthRequestModel) : Promise<AuthResponseModel>
  refresh(email: string, password: string) : Promise<AuthResponseModel>
}