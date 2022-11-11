import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./styles/Conversion.module.css"
import { TextField, Autocomplete } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';


export const Conversion = (props) => {
    const [valueCurrencyA, setValueCurrencyA] = useState(10);
    const [valueCurrencyB, setValueCurrencyB] = useState(0);
    const [tmp, setTmp] = useState("");
    const [currencySelectedA, setCurrencySelectedA ] = useState("Euro");
    const [currencySelectedB, setCurrencySelectedB ] = useState("United States Dollar");
    const [listCurrent, setListCurrent] = useState(swap(props.currency))

    function swap(json){
        var ret = {};
        for(var key in json){
          ret[json[key]] = key;
        }
        return ret;
    }


    var invertAB = () => {
        setCurrencySelectedA(currencySelectedB)
        setCurrencySelectedB(tmp)
    }

    useEffect(() => {
        setTmp(currencySelectedA);
        const delayDebounceFn = setTimeout(() => {
            if(currencySelectedA === currencySelectedB){
                console.log('Meme monnaie selectionner')
            }else {
                if((currencySelectedA!==null && currencySelectedA!==undefined && currencySelectedA!=="") &&
                    (currencySelectedB!==null && currencySelectedB!==undefined && currencySelectedB!=="")){
                    var req = "https://api.frankfurter.app/latest?amount="+valueCurrencyA+
                        "&from="+listCurrent[currencySelectedA]+'&to='+listCurrent[currencySelectedB]
                    axios.get(req)
                    .then(function (response) {
                        var key = Object.keys(response.data.rates)[0]
                        setValueCurrencyB(response.data.rates[key])
                        console.log('requete')
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
                }
            }
        }, 1000)
      
        return () => clearTimeout(delayDebounceFn)
    }, [valueCurrencyA, currencySelectedA, currencySelectedB]);


    return (
       <div className={styles.container}>
           <div className={styles.tableau}>
                <Autocomplete
                    className={styles.currencyA}
                    onChange={(e, value)=>{
                        setCurrencySelectedA(value)
                    }}
                    value={currencySelectedA}
                    disablePortal
                    id="combo-box-demo"
                    options={Object.keys(listCurrent)}
                    renderInput={(params) => <TextField {...params} label="Currency" />}
                />

                <div className={styles.iconSwitch} onClick={invertAB}>
                    <CompareArrowsIcon sx={{ fontSize: 50, cursor:'pointer' }} />
                </div>

                <Autocomplete
                    className={styles.currencyB}
                    onChange={(e, value)=>{
                        setCurrencySelectedB(value)
                    }}
                    value={currencySelectedB}
                    disablePortal
                    id="combo-box-demo"
                    options={Object.keys(listCurrent)}
                    renderInput={(params) => <TextField {...params} label="Currency" />}
                />

                <div className={styles.amountA}>
                    <TextField disabled={(currencySelectedA===null || currencySelectedA===undefined || currencySelectedA==="")} type="number" variant="outlined" sx={{width:'100%'}} value={valueCurrencyA} onChange={(e)=>setValueCurrencyA(e.target.value)} />
                </div>

                <div className={styles.amountB}>
                    <TextField disabled type="number" variant="outlined" sx={{width:'100%'}} value={valueCurrencyB} onChange={(e)=>setValueCurrencyB(e.target.value)} />
                </div>

            </div>
       </div>
    );
}