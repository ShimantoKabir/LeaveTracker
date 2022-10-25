import {AlertComponentModel} from "./AlertComponentModel";
import {makeObservable, observable} from "mobx";
import {injectable} from "inversify";

@injectable()
export class AlertComponentModelImpl implements AlertComponentModel{
	isModalOpen: boolean = false;
	constructor() {
		makeObservable(this, {
			isModalOpen: observable
		});
	}
	changeModalState(state: boolean): void {
		console.log("state=",state);
		this.isModalOpen  = state;
	}
}
