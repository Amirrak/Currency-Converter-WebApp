import React, { useState, useEffect } from "react";
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import styles from "./styles/Historique.module.css"
import { TextField, Autocomplete, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';




export default function Historique(props) {
    const [listCurrent, setListCurrent] = useState(swap(props.currency))
    const [currencyHistoric, setCurrencyHistoric] = useState("")
    const [currencyRef, setCurrencyRef] = useState("")
    const [rateCurrency, setRateCurrency] = useState({})

    const [from, setFrom] = useState(
        dayjs().subtract(1,'day'),
    );
    const [to, setTo] = useState(
        dayjs(),
    );
    
    const handleChangeFrom = (newValue) => {
        setFrom(newValue);
    };
    const handleChangeTo = (newValue) => {
        setTo(newValue);
    };
    

    function swap(json){
        var ret = {};
        for(var key in json){
          ret[json[key]] = key;
        }
        return ret;
    }
    var showHistoric = () => {
        var req = "https://api.frankfurter.app/"+from.year()+'-'+from.month()+'-'+from.date()+
                ".."+to.year()+'-'+to.month()+'-'+to.date()+"?from="+listCurrent[currencyRef]+"&to="+listCurrent[currencyHistoric];
        axios.get(req)
        .then(function (response) {
            setRateCurrency(response.data.rates)
            console.log(rateCurrency)
        })
        .catch(function (error) {
            console.log(error)
        });
    }
    
    useEffect(()=>{ console.log(rateCurrency) },[rateCurrency])
    const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 200, pv: 2400, amt: 2400}, {name: 'Page C', uv: 400, pv: 2400, amt: 2400}];

    return (
        <div className={styles.container}>
            <div className={styles.containerForm}>
                <Autocomplete
                        className={styles.currencyHistoric}
                        onChange={(e, value)=>{
                            setCurrencyHistoric(value)
                        }}
                        disablePortal
                        options={Object.keys(listCurrent)}
                        renderInput={(params) => <TextField {...params} label="Currency" />}
                    />

                    <Autocomplete
                        className={styles.currencyRef}
                        onChange={(e, value)=>{
                            setCurrencyRef(value)
                        }}
                        disablePortal
                        options={Object.keys(listCurrent)}
                        renderInput={(params) => <TextField {...params} label="Reference Currency" />}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <MobileDatePicker
                            className={styles.dateFrom}
                            label="from"
                            inputFormat="DD/MM/YYYY"
                            value={from}
                            onChange={handleChangeFrom}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <MobileDatePicker
                            className={styles.dateTo}
                            label="to"
                            inputFormat="DD/MM/YYYY"
                            value={to}
                            onChange={handleChangeTo}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </ LocalizationProvider>
                    <Button variant="contained" className={styles.bouton} onClick={showHistoric}>Contained</Button>
            </div>
            <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart>
        </div>
    );
}