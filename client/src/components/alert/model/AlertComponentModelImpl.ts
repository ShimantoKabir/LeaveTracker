import {AlertComponentModel} from "./AlertComponentModel";
import {makeObservable, observable, action} from "mobx";
import {injectable} from "inversify";

@injectable()
export class AlertComponentModelImpl implements AlertComponentModel{
	isModalOpen: boolean = false;
	constructor() {
		makeObservable(this, {
			isModalOpen: observable,
			changeModalState: action
		});
	}
	changeModalState(state: boolean): void {
		this.isModalOpen  = state;
	}
}
