import React from "react";
import styles from "./styles/Conversion.module.css"
import { TextField, Autocomplete } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

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

                <div className={styles.iconSwitch}>
                    <CompareArrowsIcon sx={{ fontSize: 50, cursor:'pointer' }} />
                </div>

                <Autocomplete
                    className={styles.currencyB}
                    disablePortal
                    id="combo-box-demo"
                    options={listCurrent}
                    renderInput={(params) => <TextField {...params} label="Currency" />}
                />

                <div className={styles.amountA}>
                    <TextField label="Number" type="number" variant="outlined" sx={{width:'100%'}} />
                </div>

                <div className={styles.amountB}>
                    <TextField label="Number" type="number" variant="outlined" sx={{width:'100%'}} />
                </div>

            </div>
       </div>
    );
}