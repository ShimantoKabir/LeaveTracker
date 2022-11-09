import {UserRequestModel} from "../UserRequestModel";

export const URMB = "URMB";
export interface UserRequestModelBuilder{
  withId(id: number): this;
  withEmail(email: string): this;
  withPassword(password: string): this;
  withRoleId(roleId: number): this;
  withCode(code: number): this;
  withMsg(msg: string): this;
  withPage(page: number): this;
  withLimit(limit: number): this;
  withStartDate(startDate: string): this;
  withEndDate(endDate: string): this;
  build() : UserRequestModel;
}