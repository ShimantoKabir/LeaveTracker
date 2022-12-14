import './App.css';
import "reflect-metadata";
import React from 'react';
import {LoginComponent} from "./components/login/LoginComponent";
import {Provider} from "inversify-react";
import {DiContainer} from "./di";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProtectedRoutes} from "./security/ProtectedRoutes";
import {UnProtectedRoutes} from "./security/UnProtectedRoutes";
import {HomeComponent} from "./components/home/HomeComponent";
import {AlertComponent} from "./components/alert/AlertComponent";
import {RegistrationComponent} from "./components/registration/RegistrationComponent";
import {ProtectedComponent} from "./security/ProtectedComponent";
import {RoleComponent} from "./components/role/RoleComponent";
import {RouteComponent} from "./components/route/RouteComponent";

export class App extends React.Component {
	render(): React.ReactNode {
		return (
			<Provider container={DiContainer}>
				<BrowserRouter>
					<AlertComponent/>
					<ProtectedComponent/>
					<Routes>
						<Route element={<ProtectedRoutes/>}>
							<Route path="/home" element={<HomeComponent/>}/>
							<Route path="/role" element={<RoleComponent/>} />
							<Route path="/route" element={<RouteComponent/>} />
						</Route>
						<Route element={<UnProtectedRoutes/>}>
							<Route path="/" element={<LoginComponent/>}/>
							<Route path="/registration" element={<RegistrationComponent/>}/>
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		);
	}
}
