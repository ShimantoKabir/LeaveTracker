import {Component} from "react";
import {resolve} from "inversify-react";
import {PCM, ProtectedComponentModel} from "../../security/model/ProtectedComponentModel";
import {HS, HttpService} from "../../services/http/HttpService";

export class HomeComponent extends Component{

	@resolve(PCM)
	private readonly protectedComponent!: ProtectedComponentModel;

	@resolve(HS)
	private readonly httpService!: HttpService;

	componentDidMount() {
		!this.protectedComponent.isProtectComponentDisplayed && this.protectedComponent.displayProtectComponent(true)
		this.httpService.getInstance().get("/users").then(obj=>{
			//console.log("obj=",obj);
		})
	}

	render() {
		return(
			<>
				Home
			</>
		)
	}
}
