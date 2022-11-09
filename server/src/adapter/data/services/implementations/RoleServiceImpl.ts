import {RoleService} from "../RoleService";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Equal, Repository, UpdateResult} from "typeorm";
import {RoleEntity} from "../../entities/RoleEntity";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";

@Injectable()
export class RoleServiceImpl implements RoleService{

  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>
  ) {
  }

  async create(roleEntity: RoleEntity): Promise<RoleEntity> {
    return await this.roleRepository.save(roleEntity);
  }

  async update(roleEntity: RoleEntity): Promise<UpdateResult> {
    return await this.roleRepository.update(roleEntity.id, roleEntity);
  }

  async delete(id: number): Promise<boolean> {
    const deletedRes = await this.roleRepository.delete({
      id: Equal(id)
    });
    return Promise.resolve(deletedRes.affected > 0);
  }

  async read(id: number): Promise<RoleEntity> {
    return await this.roleRepository.findOneBy({
      id: Equal(id)
    });
  }

  async readAll(options: IPaginationOptions): Promise<Pagination<RoleEntity>> {
    const queryBuilder = this.roleRepository.createQueryBuilder("s");
    queryBuilder.orderBy("s.id", "DESC");
    return await paginate<RoleEntity>(queryBuilder, options);
  }

}