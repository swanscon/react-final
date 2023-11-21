import classes from "./VehicleForm.module.css";
import { Modal, Button, Stack } from "react-bootstrap";
import { useRef, useState, useEffect } from "react";

function EditVehicleForm({ vehicle, showEdit, handleClose, onUpdateVehicle }) {
	const [vehicleMakes, setVehicleMakes] = useState([]);
	const [vehicleModels, setVehicleModels] = useState([]);
	const [selectedMake, setSelectedMake] = useState(vehicle?.vehicleModel?.vehicleMake || '');
	const [selectedModel, setSelectedModel] = useState(vehicle?.vehicleModel || '');

	const makeInputRef = useRef();
	const modelInputRef = useRef();
	const vinInputRef = useRef();
	const licensePlateInputRef = useRef();
	const yearInputRef = useRef();
	const colorInputRef = useRef();

	useEffect(() => {
		fetch('http://localhost:8080/vehicle-makes/')
			.then(response => response.json())
			.then(data => setVehicleMakes(data));
		fetch('http://localhost:8080/vehicle-models/')
			.then(response => response.json())
			.then(data => setVehicleModels(data));
	}, [selectedMake]);

	const filteredModels = vehicleModels.filter(model => model.vehicleMake.vehicleMakeName === selectedMake);

	const handleSelectMake = (event) => {
		setSelectedMake(event.target.value);
	}

	const handleSelectModel = (event) => {
		setSelectedModel(event.target.value);
	}

	const submitHandler = (event) => {
		event.preventDefault();
		const vehicleId = vehicle.id;
		const enteredVin = vinInputRef.current.value;
		const enteredLicensePlate = licensePlateInputRef.current.value;
		const enteredYear = yearInputRef.current.value;
		const enteredColor = colorInputRef.current.value;
		const selectedModelId = modelInputRef.current.value;
		const selectedModel = vehicleModels.find(model => model.id.toString() === selectedModelId);
		const updatedVehicleData = {
			id: vehicleId,
			vehicleVIN: enteredVin,
			vehicleLicense: enteredLicensePlate,
			vehicleYear: enteredYear,
			vehicleColor: enteredColor,
			vehicleModel: selectedModel || null,
		};
		onUpdateVehicle(updatedVehicleData);
	}

	if (!vehicle) {
		return null;
	} else {
		return (
			<>
				<Modal show={showEdit} onHide={handleClose} className="backdrop">
				<Modal.Header className="centered">
					<Modal.Title>Edit Vehicle</Modal.Title>
				</Modal.Header>
				<Modal.Header className="centered">
					<h5>{vehicle.vehicleModel.vehicleMake.vehicleMakeName} {vehicle.vehicleModel.vehicleModelName}</h5>
					<p><b>VIN:</b> {vehicle.vehicleVIN}</p>
				</Modal.Header>
				<Modal.Body>
					<div className="row justify-content-center">
						<form className={classes.form} onSubmit={submitHandler}>
							<div className={classes.control}>
								<label htmlFor="make">Make</label>
								<select
									className="form-select"
									required
									id="make"
									ref={makeInputRef}
									onChange={handleSelectMake}
									defaultValue={selectedMake}
								>
									{vehicleMakes.map(make => (
										<option key={make.id} value={make.vehicleMakeName}>{make.vehicleMakeName}</option>
									))}
								</select>
							</div>
							<div className={classes.control}>
								<label htmlFor="model">Model</label>
								<select
									className="form-select"
									required
									id="model"
									ref={modelInputRef}
									onChange={handleSelectModel}
									defaultValue={selectedModel}
								>
									{filteredModels.map(model => (
										<option key={model.id} value={model.id}>{model.vehicleModelName}</option>
									))}
								</select>
							</div>
							<div className={classes.control}>
								<label htmlFor="vin">VIN #</label>
								<input type="text" required id="vin" ref={vinInputRef} defaultValue={vehicle.vehicleVIN}/>
							</div>
							<div className={classes.control}>
								<label htmlFor="licensePlate">License Plate</label>
								<input
									type="text"
									required
									id="licensePlate"
									ref={licensePlateInputRef}
									defaultValue={vehicle.vehicleLicense}/>
							</div>
							<div className={classes.control}>
								<label htmlFor="year">Year</label>
								<input type="text" required id="year" ref={yearInputRef} defaultValue={vehicle.vehicleYear}/>
							</div>
							<div className={classes.control}>
								<label htmlFor="color">Color</label>
								<input type="text" required id="color" ref={colorInputRef} defaultValue={vehicle.vehicleColor}/>
							</div>
							<Stack gap={2} className="col-md-5 mx-auto">
								<Button variant="secondary" onClick={handleClose}>
									Close
								</Button>
								<Button variant="primary" type="submit" onSubmit={handleClose} onClick={handleClose}>
									Confirm Changes
								</Button>
							</Stack>
						</form>
					</div>
				</Modal.Body>
			</Modal>
			</>
		);
	}
}

export default EditVehicleForm;
