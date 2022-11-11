import {Body, Controller, DefaultValuePipe, Get, Inject, Param, ParseIntPipe, Post, Put, Query} from "@nestjs/common";
import {IPaginationOptions} from "nestjs-typeorm-paginate";
import {ROIB, RouteInteractorBoundary} from "../../../usercase/boundaries/RouteInteractorBoundary";
import {RouteRequestModel} from "../../../usercase/domains/RouteRequestModel";
import {RouteResponseModel} from "../../../usercase/domains/RouteResponseModel";

@Controller("routes")
export class RouteController {

  constructor(
    @Inject(ROIB)
    private readonly routeInteractorBoundary: RouteInteractorBoundary
  ) {
  }

  @Post()
  async save(
    @Body() routeRequestModel: RouteRequestModel
  ): Promise<RouteResponseModel> {
    return await this.routeInteractorBoundary.save(routeRequestModel);
  }

  @Put()
  async edit(
    @Body() routeRequestModel: RouteRequestModel
  ): Promise<RouteResponseModel> {
    return await this.routeInteractorBoundary.edit(routeRequestModel);
  }

  @Get(":id")
  async getById(
    @Param("id") id: number
  ): Promise<RouteResponseModel> {
    return await this.routeInteractorBoundary.getById(id);
  }

  @Get()
  async getAll(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("limit", new DefaultValuePipe(5), ParseIntPipe) limit: number
  ): Promise<RouteResponseModel> {
    const options: IPaginationOptions = {
      limit: limit,
      page: page
    };
    return await this.routeInteractorBoundary.getAll(options);
  }
}