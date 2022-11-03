import React, { useState, useEffect } from 'react';
import styles from "./styles/Conversion.module.css"
import { TextField, Autocomplete } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

export const Conversion = (props) => {
    const [valueCurrencyA, setValueCurrencyA] = useState(0);
    const [valueCurrencyB, setValueCurrencyB] = useState(0);
    const [currencySelectedA, setCurrencySelectedA ] = useState("");
    const [currencySelectedB, setCurrencySelectedB ] = useState("");
    const [disabledValueCurrencyA, setDisabledValueCurrencyA ] = useState(true);
    const [disabledValueCurrencyB, setDisabledValueCurrencyB ] = useState(true);

    var listCurrent = [];
    for(var key in props.currency){
        listCurrent.push(props.currency[key])
    }
    return (
       <div className={styles.container}>
           <div className={styles.tableau}>
                <Autocomplete
                    className={styles.currencyA}
                    onChange={(e, value)=>{
                        setCurrencySelectedA(value)
                        if(value!== "" && value !== undefined && value!==null) {
                            setDisabledValueCurrencyA(false)
                        }else {
                            setDisabledValueCurrencyA(true)
                        }
                    }}
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
                    onChange={(e, value)=>{
                        setCurrencySelectedB(value)
                        if(value!== "" && value !== undefined && value!==null) {
                            setDisabledValueCurrencyB(false)
                        }else {
                            setDisabledValueCurrencyB(true)
                        }
                    }}
                    disablePortal
                    id="combo-box-demo"
                    options={listCurrent}
                    renderInput={(params) => <TextField {...params} label="Currency" />}
                />

                <div className={styles.amountA}>
                    <TextField disabled={disabledValueCurrencyA} label="Number" type="number" variant="outlined" sx={{width:'100%'}} value={valueCurrencyA} onChange={(e)=>setValueCurrencyA(e.target.value)} />
                </div>

                <div className={styles.amountB}>
                    <TextField disabled={disabledValueCurrencyB} label="Number" type="number" variant="outlined" sx={{width:'100%'}} value={valueCurrencyB} onChange={(e)=>setValueCurrencyB(e.target.value)} />
                </div>

            </div>
       </div>
    );
}