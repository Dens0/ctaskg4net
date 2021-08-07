import Country from './Country'
import React, {useEffect, useState, useCallback,} from 'react'
import classes from './CountryList.module.css'



const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [sortCountries,setSortCountries] = useState([]);

    const [check, setCheck] = useState(false);
    // const [error, setError] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);

    const fetchCountries = useCallback(async () => {
        // setIsLoading(true);
        // setError(null);
        const url = 'https://restcountries.eu/rest/v2/name/united';
        try {

            const response = await fetch(url,
                {
                    headers: new Headers({
                        'Accept': 'application/json',

                    })
                }
            );
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            setCountries(data);


        } catch (e) {
            // setError(e.message);
            console.log(e)
        }
    }, []);
    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    const handleCheck = () => {
        setCheck(!check);
        const newCountryList = [...countries];


        if(!check)
        {
            newCountryList.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            setSortCountries([...newCountryList]);
            console.log(newCountryList, "check");

        }
        else if (check) {
            setCountries([...countries]);
            console.log(countries, "!check");

        }

    };

    // console.log(countries);
    return (<>
            <label className={classes.sort__input}>
                Alphabetical sort
                <input type="checkbox" name="name" checked={check} onChange={handleCheck}/>
            </label>
            <ul className={classes.country__list}>
                {check ? sortCountries.map(country =>
                    <Country key={country.numericCode} name={country.name} countryData={country}/>
                ) : countries.map(country =>
                    <Country key={country.numericCode} name={country.name} countryData={country}/>
                )}
            </ul>
        </>
    )
};


export default CountryList