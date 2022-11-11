import {Component} from "react";
import {resolve} from "inversify-react";
import {PCM, ProtectedComponentModel} from "../../security/model/ProtectedComponentModel";

export class HomeComponent extends Component{

	@resolve(PCM)
	private readonly protectedComponent!: ProtectedComponentModel;

	componentDidMount() {
		!this.protectedComponent.isProtectComponentDisplayed && this.protectedComponent.displayProtectComponent(true)
	}

	render() {
		return(
			<>
				Hi
			</>
		)
	}
}
