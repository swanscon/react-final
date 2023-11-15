import VehicleNavigation from "../layout/VehicleNavigation";
import VehicleItem from "../vehicles/VehicleItem";
import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";

function FavoritesPage(props) {
    const favoriteCtx = useContext(FavoritesContext);

    let content;

    if(favoriteCtx.totalFavorites === 0) {
        content = <p>You have no favorites. Start adding some?</p>
    } else {
        content = favoriteCtx.favorites.map(vehicle => (
            <VehicleItem
                key={vehicle.id}
                id={vehicle.id}
                image={vehicle.image}
                make={vehicle.make}
                model={vehicle.model}
                vin={vehicle.vin}
                licensePlate={vehicle.licensePlate}
                year={vehicle.year}
                color={vehicle.color}
            />
        ));
    }

    return (
        <div className="container-fluid">
            <VehicleNavigation />
            <h1>My Favorites</h1>
            {content}
        </div>
    );
}

export default FavoritesPage;