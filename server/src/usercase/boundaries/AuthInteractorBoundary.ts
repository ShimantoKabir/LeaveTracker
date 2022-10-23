import {AuthRequestModel} from "../domains/AuthRequestModel";
import {AuthResponseModel} from "../domains/AuthResponseModel";
import {UserEntity} from "../../adapter/data/entities/UserEntity";

export const AIB = "AIB";
export interface AuthInteractorBoundary{
  login(authRequestModel: AuthRequestModel) : Promise<AuthResponseModel>
  isUserValid(authRequestModel: AuthRequestModel) : Promise<UserEntity> | null;
}