import { Container } from "inversify";
import {LoginComponentModel, LoginComponentModelImpl} from "./components/login/LoginComponentModel";

const container = new Container();
container.bind<LoginComponentModel>("loginComponentModel").to(LoginComponentModelImpl);

export const DiContainer = container;
