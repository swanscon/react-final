import { useState, useEffect } from "react";
import classes from './HoveringAlert.module.css';

function HoveringAlert({message}) {

    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowAlert(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={`${classes.alert} ${showAlert ? classes.show : ''}`}>
            {message}
        </div>
    );
}

export default HoveringAlert;