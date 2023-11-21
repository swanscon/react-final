import { useContext } from "react";
import { Card, ListGroup, Stack, Button, ListGroupItem } from "react-bootstrap";
import FavoritesContext from "../store/favorites-context";
import classes from './VehicleItem.module.css';

function VehicleItem(props) {
	const favoriteCtx = useContext(FavoritesContext);

	const itemIsFavorite = favoriteCtx.itemisFavorite(props.id);

	function toggleFavoriteStatusHandler() {
		if (itemIsFavorite) {
			favoriteCtx.removeFavorite(props.id);
		} else {
			favoriteCtx.addFavorite({
				id: props.id,
				image: props.image,
				make: props.make,
				model: props.model,
				vin: props.vin,
				licensePlate: props.licensePlate,
				year: props.year,
				color: props.color,
			});
		}
	}

	return (
		<Card className="bg-dark text-white">
		<Card.Img variant="top" src={props.image} alt={props.model} />
		<Card.Body>
			<Card.Title className="centered">
				{props.make} {props.model}
			</Card.Title>
			<Card.Text>
				<ListGroup variant="flush">
					<ListGroup.Item className={classes.bgDark}>VIN: {props.vin}</ListGroup.Item>
					<ListGroup.Item className={classes.bgDark}>License Plate: {props.licensePlate}</ListGroup.Item>
					<ListGroup.Item className={classes.bgDark}>Year: {props.year}</ListGroup.Item>
					<ListGroup.Item className={classes.bgDark}>Color: {props.color}</ListGroup.Item>
				</ListGroup>
			</Card.Text>
			<Stack gap={2}>
				<Button className="btn btn-danger" onClick={toggleFavoriteStatusHandler}>
					{itemIsFavorite ? "Remove from Favorites" : "To Favorites"}
				</Button>
			</Stack>
		</Card.Body>
	</Card>
	);
}

export default VehicleItem;
