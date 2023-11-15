import classes from "./VehicleForm.module.css";
import { Modal, Button } from "react-bootstrap";

function EditVehicleForm({ vehicle, showEdit, handleClose }) {
	if (vehicle === null) {
		return null;
	} else {
		return (
			<>
				<Modal show={showEdit} onHide={handleClose} className="backdrop">
					<Modal.Header>
						<Modal.Title>Edit Vehicle</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="row justify-content-center">
							<div>
								<form className={classes.form}>
									<div className={classes.control}>
										<label htmlFor="model">Model</label>
										<select
											className="form-select"
											aria-label="Default select example"
										>
											<option value="1">One</option>
											<option value="2">Two</option>
											<option value="3">Three</option>
										</select>
									</div>
									<div className={classes.control}>
										<label htmlFor="vin">vin</label>
										<input
											type="text"
											required
											id="vin"
											placeholder={vehicle.vin}
										/>
									</div>
									<div className={classes.control}>
										<label htmlFor="license">license</label>
										<input
											type="text"
											required
											id="license"
											placeholder={vehicle.licensePlate}
										/>
									</div>
									<div className={classes.control}>
										<label htmlFor="year">year</label>
										<input
											type="text"
											required
											id="year"
											placeholder={vehicle.year}
										/>
									</div>
									<div className={classes.control}>
										<label htmlFor="color">color</label>
										<input
											type="text"
											required
											id="color"
											placeholder={vehicle.color}
										/>
									</div>
								</form>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<div className={classes.actions}>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
						</div>
						<div className={classes.actions}>
							<Button variant="primary" type="submit" onClick={handleClose}>
								Save
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}

export default EditVehicleForm;
