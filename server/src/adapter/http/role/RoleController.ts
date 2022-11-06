import {Body, Controller, DefaultValuePipe, Get, Inject, Param, ParseIntPipe, Post, Put, Query} from "@nestjs/common";
import {RIB, RoleInteractorBoundary} from "../../../usercase/boundaries/RoleInteractorBoundary";
import {RoleRequestModel} from "../../../usercase/domains/RoleRequestModel";
import {RoleResponseModel} from "../../../usercase/domains/RoleResponseModel";
import {IPaginationOptions} from "nestjs-typeorm-paginate";

@Controller("roles")
export class RoleController{

  constructor(
    @Inject(RIB)
    private readonly roleInteractorBoundary: RoleInteractorBoundary
  ) {
  }

  @Post()
  async save(
    @Body() roleRequestModel: RoleRequestModel
  ): Promise<RoleResponseModel> {
    return await this.roleInteractorBoundary.save(roleRequestModel);
  }

  @Put()
  async edit(
    @Body() roleRequestModel: RoleRequestModel
  ): Promise<RoleResponseModel> {
    return await this.roleInteractorBoundary.edit(roleRequestModel);
  }

  @Get(":id")
  async getById(
    @Param("id") id: number
  ): Promise<RoleResponseModel> {
    return await this.roleInteractorBoundary.getById(id);
  }

  @Get()
  async getAll(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("limit", new DefaultValuePipe(5), ParseIntPipe) limit: number
  ): Promise<RoleResponseModel> {
    const options: IPaginationOptions = {
      limit: limit,
      page: page
    };
    return await this.roleInteractorBoundary.getAll(options);
  }

}