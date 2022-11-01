import "./LoginStyle.css";
import {ChangeEvent, Component, FormEvent, ReactNode} from "react";
import { observer } from "mobx-react";
import {resolve} from "inversify-react";
import {Button, Form} from "react-bootstrap";
import {Link, Navigate} from "react-router-dom";
import {LCM, LoginComponentModel} from "./model/LoginComponentModel";
import {ACM, AlertComponentModel} from "../alert/model/AlertComponentModel";

@observer
export class LoginComponent extends Component{

	@resolve(LCM)
	private readonly componentModel!: LoginComponentModel;

	@resolve(ACM)
	private readonly alert!: AlertComponentModel;

	doLogin = async (e: FormEvent<HTMLFormElement>) => {
		if (this.componentModel.validateForm(e)){
			this.alert.startLoading();
			this.alert.changeModalState(await this.componentModel.onLogin());
		}
	}

	doMicrosoftLogin = async () => {
		this.alert.startLoading();
		this.alert.changeModalState(await this.componentModel.loginByMicrosoft());
	}

	render() : ReactNode{
		if (this.componentModel.isLoggedIn) {
			return <Navigate to="/home" replace={true}/>;
		}
		return (
			<main className="component-center" >
				<div className="login-container" >
					<h3>Login</h3>
					<Form
						noValidate
						validated={this.componentModel.isFormValid}
						onSubmit={(e: FormEvent<HTMLFormElement>)=>this.doLogin(e)}
					>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control
								required
								type="email"
								value={this.componentModel.email}
								onChange={(e: ChangeEvent<HTMLInputElement>)=>this.componentModel.onInputChange(e)}
								placeholder="Enter email"
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
								autoComplete="off"
								value={this.componentModel.password}
								onChange={(e: ChangeEvent<HTMLInputElement>)=>this.componentModel.onInputChange(e)}
								placeholder="Enter password"
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
						onClick={this.doMicrosoftLogin}
						variant="outline-success"
						type="submit"
					>
						Login with Microsoft
					</Button>
					<div className="divider pt-4 text-center" >
						<p>Don't have account, please <Link to={"/registration"}>SingUp</Link></p>
					</div>
				</div>
			</main>
		)
	}
}
