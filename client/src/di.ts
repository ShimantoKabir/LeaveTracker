import { Container } from "inversify";
import {ACM, AlertComponentModel} from "./components/alert/model/AlertComponentModel";
import {AlertComponentModelImpl} from "./components/alert/model/AlertComponentModelImpl";
import {LCM, LoginComponentModel} from "./components/login/model/LoginComponentModel";
import {LoginComponentModelImpl} from "./components/login/model/LoginComponentModelImpl";
import {US, UserService} from "./services/api/UserService";
import {UserServiceImpl} from "./services/api/implementations/UserServiceImpl";
import {RCM, RegistrationComponentModel} from "./components/registration/model/RegistrationComponentModel";
import {RegistrationComponentModelImpl} from "./components/registration/model/RegistrationComponentModelImpl";
import {MAS, MicrosoftAuthService} from "./services/microsoft/MicrosoftAuthService";
import {MicrosoftAuthServiceImpl} from "./services/microsoft/implementations/MicrosoftAuthServiceImpl";
import {UDB, UserDtoBuilder} from "./dtos/builders/UserDtoBuilder";
import {UserDtoBuilderImpl} from "./dtos/builders/implementations/UserDtoBuilderImpl";
import {ADB, AlertDtoBuilder} from "./dtos/builders/AlertDtoBuilder";
import {AlertDtoBuilderImpl} from "./dtos/builders/implementations/AlertDtoBuilderImpl";
import {PCM, ProtectedComponentModel} from "./security/model/ProtectedComponentModel";
import {ProtectedComponentModelImpl} from "./security/model/ProtectedComponentModelImpl";
import {HS, HttpService} from "./services/http/HttpService";
import {HttpServiceImpl} from "./services/http/HttpServiceImpl";

const container = new Container();

container.bind<LoginComponentModel>(LCM).to(LoginComponentModelImpl);
container.bind<AlertComponentModel>(ACM).to(AlertComponentModelImpl).inSingletonScope();
container.bind<ProtectedComponentModel>(PCM).to(ProtectedComponentModelImpl).inSingletonScope();
container.bind<RegistrationComponentModel>(RCM).to(RegistrationComponentModelImpl);
container.bind<UserService>(US).to(UserServiceImpl);
container.bind<MicrosoftAuthService>(MAS).to(MicrosoftAuthServiceImpl);
container.bind<UserDtoBuilder>(UDB).to(UserDtoBuilderImpl);
container.bind<AlertDtoBuilder>(ADB).to(AlertDtoBuilderImpl);
container.bind<HttpService>(HS).to(HttpServiceImpl).inSingletonScope();

export const DiContainer = container;
