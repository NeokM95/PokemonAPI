import React, { useEffect, useState } from 'react';

import PokemonCard from "./components/PokemonCard/PokemonCard";

import './App.css';

const axios = require( 'axios' ).default;
const API_URL = "https://pokeapi.co/api/v2/pokemon"

function App() {

    const [ bulk, setBulk ] = useState( '' );
    const [ apiReq, setApiReq ] = useState( `${ API_URL }` )


    useEffect( () => {
        async function fetchData() {
            try {
                const result = await axios.get( `${ apiReq }` )

                console.log( result.data )
                console.log( result.data.next )

                setBulk( result.data )

            } catch ( e ) {
                console.error( e )
            }
        }

        fetchData()

    }, [ apiReq ] )


    return (
        <>


            { bulk &&

            <>
                <button type="button" onClick={ () => setApiReq( bulk.previous ) }>Previous</button>
                <button type="button" onClick={ () => setApiReq( bulk.next ) }>Next</button>
                <ul className="pokemon-container">
                    {
                        bulk.results.map( ( pokemon ) => {
                            return <li key={ pokemon.name }><PokemonCard endpoint={ pokemon.url }/></li>
                        } )
                    }
                </ul>
            </>
            }
        </>
    );


}

export default App;
