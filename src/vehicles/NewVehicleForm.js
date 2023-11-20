import classes from "./VehicleForm.module.css";
import { Modal, Button } from "react-bootstrap";
import { useRef, useState, useEffect } from "react";

function NewVehicleForm({ showModal, handleClose, onAddVehicle }) {
	const [vehicleMakes, setVehicleMakes] = useState([]);
	const [vehicleModels, setVehicleModels] = useState([]);
	const [selectedMake, setSelectedMake] = useState('');

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

	function handleSelectMake(event) {
		setSelectedMake(event.target.value);
	}

	const filteredModels = vehicleModels.filter(model => model.vehicleMake.vehicleMakeName === selectedMake);

	function submitHandler(event) {
		event.preventDefault();
		const enteredVin = vinInputRef.current.value;
		const enteredLicensePlate = licensePlateInputRef.current.value;
		const enteredYear = yearInputRef.current.value;
		const enteredColor = colorInputRef.current.value;
		const selectedModelId = modelInputRef.current.value;
		const selectedModel = vehicleModels.find(model => model.id.toString() === selectedModelId);
		const vehicleData = {
			vehicleVIN: enteredVin,
			vehicleLicense: enteredLicensePlate,
			vehicleYear: enteredYear,
			vehicleColor: enteredColor,
			vehicleModel: selectedModel || null,
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
									onChange={handleSelectMake}
									defaultValue="Select a Make"
								>
									<option disabled>Select a Make</option>
									{vehicleMakes.map(make => (
										<option key={make.id} value={make.vehicleMakeName}>{make.vehicleMakeName}</option>
									))}
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
									defaultValue="Select a Model" 
								>
									<option disabled>Select a Model</option>
									{filteredModels.map(model => (
										<option key={model.id} value={model.id}>{model.vehicleModelName}</option>
									))}
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
								<Button variant="primary" type="submit" onSubmit={handleClose} onClick={handleClose}>
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
