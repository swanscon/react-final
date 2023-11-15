import classes from "./VehicleForm.module.css";
import { Modal, Button } from "react-bootstrap";
import { useRef } from "react";

function NewVehicleForm({ showModal, handleClose, onAddVehicle }) {
	const makeInputRef = useRef();
	const modelInputRef = useRef();
	const vinInputRef = useRef();
	const licensePlateInputRef = useRef();
	const yearInputRef = useRef();
	const colorInputRef = useRef();

	function submitHandler(event) {
		event.preventDefault();
		const enteredMake = makeInputRef.current.value;
		const enteredModel = modelInputRef.current.value;
		const enteredVin = vinInputRef.current.value;
		const enteredLicensePlate = licensePlateInputRef.current.value;
		const enteredYear = yearInputRef.current.value;
		const enteredColor = colorInputRef.current.value;

		const vehicleData = {
			make: enteredMake,
			model: enteredModel,
			vin: enteredVin,
			licensePlate: enteredLicensePlate,
			year: enteredYear,
			color: enteredColor,
		};
		onAddVehicle(vehicleData);
	}

	return (
		<>
			<Modal show={showModal} onHide={handleClose} className="backdrop">
				<Modal.Header>
					<Modal.Title>Add New Vehicle</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="row justify-content-center">
						<form className={classes.form} onSubmit={submitHandler}>
							<div className={classes.control}>
								<label htmlFor="make">Make</label>
								<select
									className="form-select"
									aria-label="Default select example"
									required
									id="make"
									ref={makeInputRef}
								>
									<option value="Chevy">Chevy</option>
									<option value="Honda">Honda</option>
									<option value="Toyota">Toyota</option>
								</select>
							</div>
							<div className={classes.control}>
								<label htmlFor="model">Model</label>
								<select
									className="form-select"
									aria-label="Default select example"
									required
									id="model"
									ref={modelInputRef}
								>
									<option value="Civic">Civic</option>
									<option value="Accord">Accord</option>
									<option value="Camry">Camry</option>
								</select>
							</div>
							<div className={classes.control}>
								<label htmlFor="vin">vin</label>
								<input type="text" required id="vin" ref={vinInputRef} />
							</div>
							<div className={classes.control}>
								<label htmlFor="licensePlate">license</label>
								<input
									type="text"
									required
									id="licensePlate"
									ref={licensePlateInputRef}
								/>
							</div>
							<div className={classes.control}>
								<label htmlFor="year">year</label>
								<input type="text" required id="year" ref={yearInputRef} />
							</div>
							<div className={classes.control}>
								<label htmlFor="color">color</label>
								<input type="text" required id="color" ref={colorInputRef} />
							</div>
							<div className={classes.actions}>
								<Button variant="secondary" onClick={handleClose}>
									Close
								</Button>
							</div>
							<div className={classes.actions}>
								<Button variant="primary" type="submit" onClick={handleClose}>
									Add Vehicle
								</Button>
							</div>
						</form>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default NewVehicleForm;
