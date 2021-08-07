import classes from './CountryPopup.module.css'
import Card from './Card.js'
import back from '../img/arrow-square.svg'


const CountryPopup = (props) => {
    console.log(props.showPopup);

    return (
        <div className={`${classes.country__popup} ${props.showPopup && classes.country__popupSlide}`}>
            <Card>
                <div>
                    <div className={classes.country__box}>
                        <img className={classes.country__flag} src={props.data.flag} alt=""/>
                        <img onClick={props.onArrow} className={classes.country__back} src={back} alt=""/>

                    </div>
                    <div><span className={classes.country_bolder}>Capital:</span> {props.data.capital}</div>
                    <div><span className={classes.country_bolder}>Name:</span> {props.data.name}</div>
                    {props.data.currencies ? props.data.currencies.map(
                        currency => Object.entries(currency).map((key) => <div
                            key={key}><span className={classes.country_bolder}>Currency {key[0]}:</span> {key[1]} </div>)
                    ) : ''}

                </div>

            </Card>
        </div>
    )
};

export default CountryPopup