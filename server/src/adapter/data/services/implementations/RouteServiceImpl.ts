import {RouteService} from "../RouteService";
import {RouteEntity} from "../../entities/RouteEntity";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {Equal, Repository, UpdateResult} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class RouteServiceImpl implements RouteService{

  constructor(
    @InjectRepository(RouteEntity)
    private readonly routeRepository: Repository<RouteEntity>
  ) {
  }

  async create(routeEntity: RouteEntity): Promise<RouteEntity> {
    return await this.routeRepository.save(routeEntity);
  }

  async delete(id: number): Promise<boolean> {
    const deletedRes = await this.routeRepository.delete({
      id: Equal(id)
    });
    return Promise.resolve(deletedRes.affected > 0);
  }

  async read(id: number): Promise<RouteEntity> {
    return await this.routeRepository.findOneBy({
      id: Equal(id)
    });
  }

  async readAll(options: IPaginationOptions): Promise<Pagination<RouteEntity>> {
    const queryBuilder = this.routeRepository.createQueryBuilder("s");
    queryBuilder.orderBy("s.id", "DESC");
    return await paginate<RouteEntity>(queryBuilder, options);
  }

  async update(routeEntity: RouteEntity): Promise<UpdateResult> {
    return await this.routeRepository.update(routeEntity.id, routeEntity);
  }
}