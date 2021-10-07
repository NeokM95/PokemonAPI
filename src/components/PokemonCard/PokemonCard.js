import './pokemonCard.css'
import { useEffect, useState } from "react";
import { default as axios } from "axios";

//Elk pokémon kaartje bevat een naam, een afbeelding, lijst van abilities, gewicht, en de hoeveelheid moves.

function PokemonCard( { endpoint } ) {

    const [ card, setCard ] = useState( "" )

    useEffect( () => {

        async function fetchData() {
            try {
                const result = await axios.get( `${ endpoint }` )

                console.log( result )

                setCard( result.data )
            } catch ( e ) {
                console.error( e )
            }
        }

        fetchData()

    }, [] )


    return (
        <div className="pokemonCard">

            { card &&
            <>
                <h2>{ card.name }</h2>
                <img src={ card.sprites.back_default } alt=""/>
                <h4>Moves</h4>
                <p>{ card.moves.length }</p>
                <h4>Weight</h4>
                <p>{ card.weight }</p>
                <h4>Abilities</h4>
                <ul>
                    { card.abilities.map( ( ability ) => {
                        return <li key={ ability.slot }> { ability.ability.name }</li>
                    } ) }
                </ul>
            </>
            }
        </div>
    );
};

export default PokemonCard;