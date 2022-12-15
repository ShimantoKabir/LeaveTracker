import {RouteDto} from "../../../dtos/RouteDto";

export interface TopNavComponentModel {
	routes: RouteDto[];
	getRoutes() : void;
}
