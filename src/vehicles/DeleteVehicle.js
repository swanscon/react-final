import classes from "./VehicleForm.module.css";
import { Modal, Button } from "react-bootstrap";

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
								Are you sure you want to delete {vehicle.vehicleModel?.vehicleMake?.vehicleMakeName || 'vehicle'}{" "}
								{vehicle.vehicleModel?.vehicleModelName || ''} with VIN: {vehicle.vehicleVIN}?
							</p>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<div className={classes.actions}>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
						</div>
						<div className={classes.actions}>
							<Button variant="primary" type="button" onClick={() => {onDelete(vehicle.id); handleClose();}}>
								Confirm
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

export default DeleteVehicle;
