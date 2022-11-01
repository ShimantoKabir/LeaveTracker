import {ChangeEvent, Component, FormEvent, ReactNode} from "react";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {resolve} from "inversify-react";
import {RCM, RegistrationComponentModel} from "./model/RegistrationComponentModel";
import {observer} from "mobx-react";
import {ACM, AlertComponentModel} from "../alert/model/AlertComponentModel";

@observer
export class RegistrationComponent extends Component{

	@resolve(RCM)
	private readonly componentModel!: RegistrationComponentModel;

	@resolve(ACM)
	private readonly alert!: AlertComponentModel;

	doRegistration = async (e: FormEvent<HTMLFormElement>) => {
		if (this.componentModel.validateForm(e)){
			this.alert.startLoading();
			this.alert.changeModalState(await this.componentModel.onRegistration());
		}
	}

	doMicrosoftRegistration = async () => {
		this.alert.startLoading();
		this.alert.changeModalState(await this.componentModel.registeredByMicrosoft());
	}

	render() : ReactNode {
		return (
			<main className="component-center" >
				<div className="login-container" >
					<h3>Registration</h3>
					<Form
						noValidate
						validated={this.componentModel.isFormValid}
						onSubmit={(e: FormEvent<HTMLFormElement>)=>this.doRegistration(e)}
					>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control
								required
								type="email"
								placeholder="Enter email"
								value={this.componentModel.email}
								onChange={(e: ChangeEvent<HTMLInputElement>)=>this.componentModel.onInputChange(e)}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">
								Please provide your email
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								required
								type="password"
								placeholder="Enter password"
								autoComplete="off"
								value={this.componentModel.password}
								onChange={(e: ChangeEvent<HTMLInputElement>)=>this.componentModel.onInputChange(e)}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">
								Please provide your password
							</Form.Control.Feedback>
						</Form.Group>
						<Button className="w-100" variant="primary" type="submit">
							Submit
						</Button>
					</Form>
					<div className="divider p-2 text-center" >
						<p>------------ OR ------------</p>
					</div>
					<Button
						className="w-100"
						variant="outline-success"
						type="submit"
						onClick={this.doMicrosoftRegistration}
					>
						Register with Microsoft
					</Button>
					<div className="divider pt-4 text-center" >
						<p>Already have account, please <Link to="/">Login</Link></p>
					</div>
				</div>
			</main>
		)
	}
}
