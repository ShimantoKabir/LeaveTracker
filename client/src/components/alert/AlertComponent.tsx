import {Component, ReactNode} from "react";
import { Modal} from "react-bootstrap";
import {resolve} from "inversify-react";
import {ACM, AlertComponentModel} from "./model/AlertComponentModel";
import {observer} from "mobx-react";

@observer
export class AlertComponent extends Component{

	@resolve(ACM)
	private readonly componentModel!: AlertComponentModel;

	render() : ReactNode{
		return (
			<Modal
				show={this.componentModel.isModalOpen}
				onHide={()=>this.componentModel.changeModalState(false)}>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Modal heading
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4>Centered Modal</h4>
					<p>
						Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
						dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
						consectetur ac, vestibulum at eros.
					</p>
				</Modal.Body>
			</Modal>
		)
	}
}
