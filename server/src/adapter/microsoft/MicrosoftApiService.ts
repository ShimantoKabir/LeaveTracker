import {MicrosoftUserDto} from "../../dtos/MicrosoftUserDto";

export const MAS = "MAS";
export interface MicrosoftApiService{
  getUserByEmail(email: string) : Promise<MicrosoftUserDto | null>
}