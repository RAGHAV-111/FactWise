import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CharacterDetails() {


    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [movies, setMovies] = useState([]);


    useEffect(() => {
        const fetchCharacterData = async () => {
            try {
                const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
                setCharacter(response.data);
            } catch (error) {
                console.error('Error fetching character data:', error);
            }
        };

        const fetchMoviesData = async () => {
            try {
                const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
                setMovies(response.data.films);
            } catch (error) {
                console.error('Error fetching movies data:', error);
            }
        };

        fetchCharacterData();
        fetchMoviesData();
    }, [id]);

    return (
        <div>
            <h1>Character Details</h1>
            {character && (
                <div>
                    <h2>{character.name}</h2>
                    <p>Height: {character.height}</p>
                    <p>Gender: {character.gender}</p>
                    <p>Birth Year: {character.birth_year}</p>
                    <h3>Movies Appeared In:</h3>
                    <ul>
                        {movies.map(movie => (
                            <li key={movie}>{movie}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


export default CharacterDetails