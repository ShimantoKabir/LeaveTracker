import React, {useEffect} from "react";
import {Navigate, Outlet, useLocation, useNavigate,} from "react-router-dom";
import {useCookies} from "react-cookie";
import AppConstants from "../common/AppConstants";

export const ProtectedRoutes = ({redirectPath = '/'}) => {
	const [cookies] = useCookies([AppConstants.loggedInCookieName]);
	const paths = [
		"/home",
		"/role"
	]
	let location = useLocation();
	let navigate = useNavigate();

	useEffect(() => {
		if (paths.findIndex(path=>path === location.pathname) === -1){
			navigate("/home");
		}
	}, [location.pathname,navigate,paths]);

	if (!cookies.isLoggedIn || cookies.isLoggedIn === "false") {
		return <Navigate to={redirectPath} replace/>;
	}
	return <Outlet/>;
}
