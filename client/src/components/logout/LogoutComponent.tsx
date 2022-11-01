import {FC, ReactElement} from 'react';
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import AppConstants from "../../common/AppConstants";

export const LogoutComponent: FC = (): ReactElement => {
	let navigate = useNavigate();
	const [, , removeCookie] = useCookies();
	const goHome = () => {
		removeCookie(AppConstants.loggedInCookieName);
		removeCookie(AppConstants.authTokenCookieName);
		removeCookie(AppConstants.refreshTokenCookieName);
		navigate("/");
	};
	return (
		<button onClick={goHome}>Logout</button>
	);
};
