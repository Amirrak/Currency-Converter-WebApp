import React from "react";
import styles from "./styles/Conversion.module.css"
import { TextField, Autocomplete } from '@mui/material';

export const Conversion = (props) => {
    var listCurrent = [];
    for(var key in props.currency){
        listCurrent.push(props.currency[key])
    }
    return (
       <div className={styles.container}>
           <div className={styles.tableau}>
                <Autocomplete
                    className={styles.currencyA}
                    disablePortal
                    id="combo-box-demo"
                    options={listCurrent}
                    renderInput={(params) => <TextField {...params} label="Currency" />}
                />
                <div className={styles.test} />

                <Autocomplete
                    className={styles.currencyB}
                    disablePortal
                    id="combo-box-demo"
                    options={listCurrent}
                    renderInput={(params) => <TextField {...params} label="Currency" />}
                />
                <TextField className={styles.amountA} label="Number" type="number" variant="outlined" />
                <TextField className={styles.amountB} label="Number" type="number" variant="outlined" />

            </div>
       </div>
    );
}