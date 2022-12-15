import {RouteService} from "../RouteService";
import {RouteEntity} from "../../entities/RouteEntity";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
import {Equal, In, Repository, UpdateResult} from "typeorm";
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

  async readByIds(ids: string[]): Promise<RouteEntity[]> {
    const routes = await this.routeRepository.findBy({
      id: In(ids)
    })

    return routes.map(obj => {
      return {
        path: obj.path,
        type: obj.type,
        label: obj.label
      };
    });
  }

  async readByIdsAndType(ids: string[], type: number): Promise<string[]> {
    const routes = await this.routeRepository.findBy({
      id: In(ids),
      type : Equal(type)
    })

    return routes.map(obj => {
      return obj.path;
    });
  }
}