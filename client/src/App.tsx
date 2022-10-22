import "reflect-metadata";
import React from 'react';
import './App.css';
import {LoginComponent} from "./components/login/LoginComponent";
import {Provider} from "inversify-react";
import {DiContainer} from "./di";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProtectedRoutes} from "./security/ProtectedRoutes";
import {UnProtectedRoutes} from "./security/UnProtectedRoutes";
import {HomeComponent} from "./components/home/HomeComponent";

export class App extends React.Component {

	render(): React.ReactNode {
		return (
			<Provider container={DiContainer}>
				<BrowserRouter>
					<Routes>
						<Route element={<ProtectedRoutes/>}>
							<Route path="/home" element={<HomeComponent/>}/>
						</Route>
						<Route element={<UnProtectedRoutes/>}>
							<Route path="/" element={<LoginComponent/>}/>
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		);
	}
}
