import Country from './Country'
import React, {useEffect, useState, useCallback,} from 'react'
import classes from './CountryList.module.css'


const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [countriesSearch, setSearch] = useState('united');
    const [sortCountries, setSortCountries] = useState([]);

    const [check, setCheck] = useState(false);
    // const [error, setError] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);

    const fetchCountries = useCallback(async (countriesSearch) => {
        console.log(countriesSearch);
         // setIsLoading(true);
        // setError(null);
        const url = `https://restcountries.eu/rest/v2/name/${countriesSearch}`;
        try {

            const response = await fetch(url,
                {
                    headers: new Headers({
                        'Accept': 'application/json',
                    })
                }
            );
            if (!response.ok) {
                setSearch('united');
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
        fetchCountries(countriesSearch);
    }, [fetchCountries,countriesSearch,sortCountries]);


    const handleCheck = () => {
        const newCountryList = [...countries];
        if (!check) {
            newCountryList.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            setSortCountries([...newCountryList]);
        } else if (check) {
            setCountries([...countries]);
        }

    };
    const valueHandler = (e) => {
        setSearch(e.target.value);
        if (e.target.value === '')
        {
            setSearch('united')
        }
        handleCheck()
    };
    const changeCheck = () => {
        setCheck(!check);
        console.log(check)
    };
    return (<>
            <label className={classes.sort__input}>
                Search
                <input type="text" onChange={valueHandler}/>
            </label>
            <label className={classes.sort__input}>
                Alphabetical sort
                <input type="checkbox" name="name" checked={check} onClick={changeCheck} onChange={handleCheck}/>
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