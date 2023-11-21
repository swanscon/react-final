import { Link } from "react-router-dom";
import classes from './HomePage.module.css';

function HomePage() {
	return (
		<div className={classes.containerFluidCentered}>
			<h1 className="page-title">Welcome to Aston Car Catalog</h1>
			<h4 className="subheading white">
				Your one stop shop for all your Vehicle-related needs!
			</h4>
			<div className="centered">
				<p>
					Ready to explore? Jump into the driver's seat and navigate to the "Vehicles"
					page for an exlusive look at current Vehicles in stock.
				</p>
				<Link className="btn btn-success" to="/vehicles">Explore Vehicles</Link>
			</div>
		</div>
	);
}

export default HomePage;
