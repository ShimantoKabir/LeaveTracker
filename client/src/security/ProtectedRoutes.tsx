import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {useCookies} from "react-cookie";
import AppConstants from "../common/AppConstants";

export const ProtectedRoutes = ({redirectPath = '/'}) => {
	const [cookies] = useCookies([AppConstants.loggedInCookieName]);
	if (!cookies.isLoggedIn || cookies.isLoggedIn === "false") {
		return <Navigate to={redirectPath} replace/>;
	}
	return <Outlet/>;
}
