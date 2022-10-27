import { Container } from "inversify";
import {ACM, AlertComponentModel} from "./components/alert/model/AlertComponentModel";
import {AlertComponentModelImpl} from "./components/alert/model/AlertComponentModelImpl";
import {LCM, LoginComponentModel} from "./components/login/model/LoginComponentModel";
import {LoginComponentModelImpl} from "./components/login/model/LoginComponentModelImpl";

const container = new Container();
container.bind<LoginComponentModel>(LCM).to(LoginComponentModelImpl).inSingletonScope();
container.bind<AlertComponentModel>(ACM).to(AlertComponentModelImpl).inSingletonScope();

export const DiContainer = container;
