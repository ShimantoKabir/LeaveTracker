import {Inject, Injectable} from "@nestjs/common";
import {UserService} from "../UserService";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, UpdateResult} from "typeorm";
import {UserEntity} from "../../entities/UserEntity";
import {RoleService, RS} from "../RoleService";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";

@Injectable()
export class UserServiceImpl implements UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(RS)
    private readonly roleService: RoleService,
  ) {
  }

  async assignRoleToUser(roleId: number, userId: number): Promise<UpdateResult> {
    let userEntity = await this.getUserId(userId);
    userEntity.role = await this.roleService.read(roleId)
    return await this.userRepository.update(userId, userEntity);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        email: email
      },
      relations : {
        role: true
      }
    });
  }

  async save(userEntity: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(userEntity);
  }

  async getUserId(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id: id
      },
      relations : {
        role: true
      }
    });
  }

  async readAll(options: IPaginationOptions): Promise<Pagination<UserEntity>> {
    const queryBuilder = this.userRepository.createQueryBuilder("s");
    queryBuilder.orderBy("s.id", "DESC");
    return await paginate<UserEntity>(queryBuilder, options);
  }
}
