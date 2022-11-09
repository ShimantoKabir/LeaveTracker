import {LeaveEntity} from "../entities/LeaveEntity";

export const LS = "LS";
export interface LeaveService{
  readAll(): Promise<LeaveEntity[]>;
}