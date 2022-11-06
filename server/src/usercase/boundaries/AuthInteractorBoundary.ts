import {AuthRequestModel} from "../domains/AuthRequestModel";
import {AuthResponseModel} from "../domains/AuthResponseModel";

export const AIB = "AIB";
export interface AuthInteractorBoundary{
  login(authRequestModel: AuthRequestModel) : Promise<AuthResponseModel>
  refresh(id: number, email: string) : Promise<AuthResponseModel>
}