import {Body, Controller, DefaultValuePipe, Get, Inject, Request, ParseIntPipe, Post, Query} from "@nestjs/common";
import {UIB, UserInteractorBoundary} from "../../../usercase/boundaries/UserInteractorBoundary";
import {UserRequestModel} from "../../../usercase/domains/UserRequestModel";
import {UserResponseModel} from "../../../usercase/domains/UserResponseModel";
import {Public} from "../../security/PublicEndPoint";
import {URMB, UserRequestModelBuilder} from "../../../usercase/domains/builders/UserRequestModelBuilder";
import {CalendarRequestModel} from "../../../usercase/domains/CalendarRequestModel";

@Controller("users")
export class UserController {

  constructor(
    @Inject(UIB)
    private readonly userInteractorBoundary: UserInteractorBoundary,
    @Inject(URMB)
    private readonly userRequestModelBuilder: UserRequestModelBuilder
  ) {}

  @Public()
  @Post("register")
  async register(
    @Body() userRequestModel: UserRequestModel
  ): Promise<UserResponseModel> {
    return await this.userInteractorBoundary.register(userRequestModel);
  }

  @Post("roles")
  async assignRole(
    @Body() userRequestModel: UserRequestModel
  ): Promise<UserResponseModel> {
    return await this.userInteractorBoundary.assignRole(userRequestModel);
  }

  @Get()
  async getUsersEvents(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("limit", new DefaultValuePipe(5), ParseIntPipe) limit: number
  ): Promise<UserResponseModel> {
    const userRequestModel = this.userRequestModelBuilder.withPage(page)
      .withLimit(limit)
      .build();
    return await this.userInteractorBoundary.getUsers(userRequestModel);
  }

  @Post("leaves")
  async fetchLeaveDetailsByEmail(
    @Body() calendarRequestModel: CalendarRequestModel,
    @Request() request
  ): Promise<UserResponseModel> {
    if (!calendarRequestModel.email){
      calendarRequestModel.email = request.user.email;
    }
    return this.userInteractorBoundary.fetchLeaveDetails(calendarRequestModel);
  }
}