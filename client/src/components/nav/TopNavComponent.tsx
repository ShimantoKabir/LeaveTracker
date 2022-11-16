import {Component, ReactNode} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {LogoutComponent} from "../logout/LogoutComponent";
import {resolve} from "inversify-react";
import {PCM, ProtectedComponentModel} from "../../security/model/ProtectedComponentModel";

export class TopNavComponent extends Component{

	@resolve(PCM)
	private readonly protectedComponent!: ProtectedComponentModel;

	doLogout = () =>{
		this.protectedComponent.displayProtectComponent(false);
	}

	render() : ReactNode{
		return (
			<Navbar bg="light" expand="lg">
				<Container fluid>
					<Navbar.Brand href="#">LeaveTracker</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll">
						<Nav
							className="me-auto my-2 my-lg-0"
							style={{ maxHeight: '100px' }}
							navbarScroll
						>
						</Nav>
						<Nav>
							<LogoutComponent  onLogout={this.doLogout}/>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}
