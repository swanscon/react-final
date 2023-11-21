import { useState, useEffect } from "react";
import VehicleNavigation from "../layout/VehicleNavigation";
import VehicleList from "../vehicles/VehicleList";

function VehicleListPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [loadedVehicles, setLoadedVehicles] = useState([]);

	const fetchVehicles = () => {
		setIsLoading(true);
		fetch("http://localhost:8080/vehicles/")
			.then((response) => response.json())
			.then((data) => {
				const vehicles = [];
				for (const key in data) {
					const vehicle = {
						id: key,
						...data[key],
					};
					vehicles.push(vehicle);
				}
				setIsLoading(false);
				setLoadedVehicles(vehicles);
			})
			.catch((error) => {
				console.error("Fetching data failed:", error);
				setIsLoading(false);
			});
	};

	useEffect(() => {
		fetchVehicles();
	}, []);

	return (
		<div>
			<VehicleNavigation onVehicleAdded={fetchVehicles} />
			<div className="container-fluid">
				<h1 className="centered page-title">Vehicle List</h1>
				<table className="table table-dark">
					<thead>
						<tr>
							<th>Favorite</th>
							<th>Make</th>
							<th>Model</th>
							<th>VIN #</th>
							<th>License Plate</th>
							<th>Year</th>
							<th>Color</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					{isLoading ? (
						<tbody>
							<tr>
								<td colSpan="9">Loading...</td>
							</tr>
						</tbody>
					) : (
						<VehicleList vehicles={loadedVehicles} />
					)}
				</table>
			</div>
		</div>
	);
}

export default VehicleListPage;
