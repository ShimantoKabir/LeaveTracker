import {TopNavComponentModel} from "./TopNavComponentModel";
import {RouteDto} from "../../../dtos/RouteDto";
import {action, makeObservable, observable} from "mobx";

export class TopNavComponentModelImpl implements TopNavComponentModel{
	routes: RouteDto[] = [];

	constructor() {
		makeObservable(this, {
			routes: observable,
			getRoutes: action,
		});
	}

	getRoutes(): void {



	}




}
