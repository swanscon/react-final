import classes from "./VehicleForm.module.css";
import { Modal, Button, Stack } from "react-bootstrap";

function DeleteVehicle({ vehicle, showDelete, handleClose, onDelete }) {
	if (vehicle === null) {
		return null;
	} else {
		return (
			<>
				<Modal show={showDelete} onHide={handleClose} className="backdrop">
					<Modal.Header>
						<Modal.Title>Delete Vehicle</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="row justify-content-center">
							<p>
								Are you sure you want to delete <b>{vehicle.vehicleModel?.vehicleMake?.vehicleMakeName || 'vehicle'}{" "}
								{vehicle.vehicleModel?.vehicleModelName || ''}</b> with VIN: <b>{vehicle.vehicleVIN}</b>?
							</p>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Stack gap={2}>
							<Button className="btn btn-secondary" onClick={handleClose}>
								Close
							</Button>
							<Button className="btn btn-danger" type="button" onClick={() => {onDelete(vehicle.id); handleClose();}}>
								Confirm
							</Button>
						</Stack>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

export default DeleteVehicle;
