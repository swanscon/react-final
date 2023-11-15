import { useState, useEffect } from "react";
import VehicleNavigation from "../layout/VehicleNavigation";
import VehicleList from "../vehicles/VehicleList";


const DUMMY_DATA = [
	{
		id: 1,
		make: "Honda",
		model: "Civic",
		image: "https://di-uploads-pod21.dealerinspire.com/lindsayhonda/uploads/2019/04/2019-Honda-Civic-LX-Platinum-White-Pearl-HERO.png",
		vin: "2HGFA16538H518371",
		licensePlate: "ABC123",
		year: "2008",
		color: "White",
	},
	{
		id: 2,
		make: "Honda",
		model: "Accord",
		image: "https://di-uploads-pod11.dealerinspire.com/hondaofkirkland/uploads/2019/10/2020-Honda-Accord-LX-MLP-Hero.png",
		vin: "JHMCB7547NC824593",
		licensePlate: "DEF456",
		year: "2012",
		color: "Silver",
	},
	{
		id: 3,
		make: "Toyota",
		model: "Camry",
		image: "https://images.dealer.com/autodata/us/color/2023/USD30TOC021E0/2SC.jpg",
		vin: "4T1BG22K1V4046480",
		licensePlate: "XYZ789",
		year: "2017",
		color: "Red",
	},
];

function VehicleListPage() {

	const [isLoading, setIsLoading] = useState(true);
	const [loadedVehicles, setLoadedVehicles] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		fetch(
			"https://react-final-2584b-default-rtdb.firebaseio.com/vehicles.json"
		)
			.then(response => {
				return response.json();
			})
			.then(data => {
				const vehicles = [];
				for(const key in data) {
					const vehicle = {
						id: key,
						...data[key],
					};
					vehicles.push(vehicle);
				}
				setIsLoading(false);
				setLoadedVehicles(vehicles);
			});
	}, []);

	return (
		<div className="container-fluid">
			<VehicleNavigation />
			<h1>Vehicle List</h1>
			<table className="table">
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
				<VehicleList vehicles={loadedVehicles} />
			</table>
		</div>
	);
}

export default VehicleListPage;
