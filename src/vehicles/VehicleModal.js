import { Modal } from "react-bootstrap";

function VehicleModal({ vehicle, showView, handleClose }) {
	if (vehicle === null) {
		return null;
	} else {
		return (
			<>
				<Modal show={showView} onHide={handleClose} className="backdrop">
					<Modal.Header>
						<Modal.Title>
							{vehicle.make} {vehicle.model}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="row justify-content-center">
							<div>
								<img src={vehicle.image} alt={vehicle.model} />
							</div>
							<div>
								<p>VIN: {vehicle.vin}</p>
							</div>
							<div>
								<p>License Plate: {vehicle.licensePlate}</p>
							</div>
							<div>
								<p>Year: {vehicle.year}</p>
							</div>
							<div>
								<p>Color: {vehicle.color}</p>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			</>
		);
	}
}

export default VehicleModal;
