import React, {useState} from 'react'
import classes from './Country.module.css'
import CountryPopup from './CountryPopup'
// import {CSSTransition} from 'react-transition-group';

const Country = (props) => {

    const [popup, setPopup] = useState(false);


    const popupHandle = () => {
        setPopup(!popup);
    };
    const exitHandle = ()=>
    {
        setPopup(false)
    };
    return (<>
            <li onClick={popupHandle} className={classes.country__name}>{props.name}</li>
            {/*<CSSTransition*/}
            {/*    in={popup}*/}
            {/*    timeout={300}*/}
            {/*    classNames="alert"*/}
            {/*    unmountOnExit*/}
            {/*>*/}
                {popup === true ?
                    <CountryPopup onArrow={exitHandle} showPopup={popup} data={props.countryData}> {props.name}</CountryPopup> : ''}
            {/*</CSSTransition>*/}
        </>
    )
};


export default Country