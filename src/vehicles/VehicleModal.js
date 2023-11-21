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
							{vehicle.vehicleModel?.vehicleMake?.vehicleMakeName || 'N/A'} {vehicle.vehicleModel?.vehicleModelName || 'N/A'}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="row justify-content-center">
							<div>
								<img src={vehicle.vehicleModel?.vehicleModelImage || ''} alt={vehicle.vehicleModel?.vehicleModelName || 'No image'} className="img-fluid"/>
							</div>
							<div>
								<p>VIN: {vehicle.vehicleVIN}</p>
							</div>
							<div>
								<p>License Plate: {vehicle.vehicleLicense}</p>
							</div>
							<div>
								<p>Year: {vehicle.vehicleYear}</p>
							</div>
							<div>
								<p>Color: {vehicle.vehicleColor}</p>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			</>
		);
	}
}

export default VehicleModal;
