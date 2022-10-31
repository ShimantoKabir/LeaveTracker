import { Container } from "inversify";
import {ACM, AlertComponentModel} from "./components/alert/model/AlertComponentModel";
import {AlertComponentModelImpl} from "./components/alert/model/AlertComponentModelImpl";
import {LCM, LoginComponentModel} from "./components/login/model/LoginComponentModel";
import {LoginComponentModelImpl} from "./components/login/model/LoginComponentModelImpl";
import {US, UserService} from "./services/api/UserService";
import {UserServiceImpl} from "./services/api/implementations/UserServiceImpl";
import {RCM, RegistrationComponentModel} from "./components/registration/model/RegistrationComponentModel";
import {RegistrationComponentModelImpl} from "./components/registration/model/RegistrationComponentModelImpl";

const container = new Container();
container.bind<LoginComponentModel>(LCM).to(LoginComponentModelImpl).inSingletonScope();
container.bind<AlertComponentModel>(ACM).to(AlertComponentModelImpl).inSingletonScope();
container.bind<RegistrationComponentModel>(RCM).to(RegistrationComponentModelImpl).inSingletonScope();
container.bind<UserService>(US).to(UserServiceImpl);

export const DiContainer = container;
