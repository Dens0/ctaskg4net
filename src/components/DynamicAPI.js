import React, {useEffect, useState, useCallback,} from 'react'
import {request} from "graphql-request";

const DynamicApi = () => {
    const [countries, setCountries] = useState([]);

    const fetchCountries = useCallback(async () => {
        // setIsLoading(true);
        // setError(null);

        const query = `
  query {
      name
  }
`;
        // const opts = {
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ query })
        // };
        const url = 'https://restcountries.eu/rest/v2/name/united';

        // fetch(url, opts)
        //     .then(res => res.json())
        //     .then(console.log)
        //     .catch(console.error);
        try {

            const response = await request("https://snowtooth.moonhighway.com/graphql", query)
                .then(console.log)
                .catch(console.error);
            console.log(response);
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
    console.log("DRUGIE API ");

    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    return (
        <>

        </>
    )
};


export default DynamicApi