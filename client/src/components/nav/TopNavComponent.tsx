import {Component, ReactNode} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {LogoutComponent} from "../logout/LogoutComponent";
import {resolve} from "inversify-react";
import {PCM, ProtectedComponentModel} from "../../security/model/ProtectedComponentModel";
import {Link} from "react-router-dom";

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
					<Link to="/home" className="navbar-brand" >Home</Link>
					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll">
						<Nav
							className="me-auto my-2 my-lg-0"
							style={{ maxHeight: '100px' }}
							navbarScroll
						>
						</Nav>
						<Nav>
							<Link to="/route" className="nav-link" >Route</Link>
							<Link to="/role" className="nav-link" >Role</Link>
							<LogoutComponent  onLogout={this.doLogout}/>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}
