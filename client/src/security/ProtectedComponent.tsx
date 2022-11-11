import {Component, ReactNode} from "react";
import {TopNavComponent} from "../components/nav/TopNavComponent";
import {observer} from "mobx-react";
import {resolve} from "inversify-react";
import {PCM, ProtectedComponentModel} from "./model/ProtectedComponentModel";

@observer
export class ProtectedComponent extends Component{

	@resolve(PCM)
	private readonly componentModel!: ProtectedComponentModel;

	render() : ReactNode {
		return (
			<>
				{this.componentModel.isProtectComponentDisplayed && <TopNavComponent/>}
			</>
		);
	}
}
