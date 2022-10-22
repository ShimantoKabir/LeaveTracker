import "./LoginStyle.css"
import React, {ChangeEvent, Component, FormEvent, ReactNode} from "react";
import { observer } from "mobx-react"
import {LoginComponentModel} from "./LoginComponentModel";
import {resolve} from "inversify-react";
import {Button, Form} from "react-bootstrap";
import {Navigate} from "react-router-dom";

@observer
export class LoginComponent extends Component{

	@resolve("loginComponentModel")
	private readonly componentModel!: LoginComponentModel;

	render() : ReactNode{

		if (this.componentModel.isLoggedIn) {
			return <Navigate to="/home" replace/>;
		}

		return (
			<main className="component-center" >
				<div className="login-container" >
					<h3>Login</h3>
					<Form
						noValidate
						validated={this.componentModel.isFormValid}
						onSubmit={(e: FormEvent<HTMLFormElement>)=>this.componentModel.onLogin(e)}
					>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								required
								type="email"
								value={this.componentModel.email}
								onChange={(e: ChangeEvent<HTMLInputElement>)=>this.componentModel.onInputChange(e)}
								placeholder="Enter email address"
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							<Form.Control.Feedback type="invalid">
								Please provide a email address
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
						onClick={this.componentModel.loginByMicrosoft}
						variant="outline-success"
						type="submit"
					>
						Login with Microsoft
					</Button>
				</div>
			</main>
		)
	}
}
