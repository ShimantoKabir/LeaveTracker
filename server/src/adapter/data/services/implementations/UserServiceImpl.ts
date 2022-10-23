import {Injectable} from "@nestjs/common";
import {UserService} from "../UserService";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "../../entities/UserEntity";

@Injectable()
export default class UserServiceImpl implements UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        email: email
      }
    });
  }

  async save(userEntity: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(userEntity);
  }
}
