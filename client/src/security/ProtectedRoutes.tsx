import React, {useEffect} from "react";
import {Navigate, Outlet, useLocation, useNavigate,} from "react-router-dom";
import {useCookies} from "react-cookie";
import AppConstants from "../common/AppConstants";
import jwtDecode from "jwt-decode";
import {UserDto} from "../dtos/UserDto";
import {RouteType} from "../types/RouteType";

export const ProtectedRoutes = ({redirectPath = '/'}) => {
	const [cookies] = useCookies([AppConstants.loggedInCookieName]);
	let location = useLocation();
	let navigate = useNavigate();

	useEffect(() => {
		const user = jwtDecode<UserDto>(cookies.authToken);
		if (user.routes.findIndex(route=>route.path === location.pathname && route.type === RouteType.MENU_ROUTE) === -1){
			navigate("/home");
		}
	});

	if (!cookies.isLoggedIn || cookies.isLoggedIn === "false") {
		return <Navigate to={redirectPath} replace/>;
	}
	return <Outlet/>;
}
