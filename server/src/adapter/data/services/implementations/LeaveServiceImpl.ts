import {LeaveService} from "../LeaveService";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {LeaveEntity} from "../../entities/LeaveEntity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class LeaveServiceImpl implements LeaveService{

  constructor(
    @InjectRepository(LeaveEntity)
    private readonly leaveRepository: Repository<LeaveEntity>
  ) {
  }

  async readAll(): Promise<LeaveEntity[]> {
    return await this.leaveRepository.find()
  }
}