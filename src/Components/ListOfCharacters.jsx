import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ListOfCharacters() {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [id1, setid1] = useState("");
    const navigate = useNavigate(); // Import useNavigate hook

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
                setCharacters(response.data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [page]);

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleCharacterClick = (id) => {
        navigate(`/character/${id}`); // Navigate to Character Details page with character ID
    };

    return (
        <div>
            <h1 style={{ display: 'flex', justifyContent: 'center' }}>List of Characters</h1>

            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
                <div style={{ margin: 'auto' }}>
                    {/* card grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', paddingTop: '2.5rem', paddingLeft: '0.625rem', paddingRight: '0.625rem', marginLeft: '0.3125rem', marginRight: '0.3125rem' }}>
                        {characters.map((character, index) => (
                            <div key={character.url} style={{ borderWidth: '1px', borderRadius: '0.375rem', overflow: 'hidden', position: 'relative', backgroundColor: '#FFFFFF' }}>
                                {/* card fields section  */}
                                <div style={{ padding: '1rem', backgroundColor: 'rgb(173, 216, 230)', display: 'grid', gridTemplateRows: 'repeat(7, minmax(0, 1fr))' }}>
                                    <div>
                                        <p style={{ fontSize: '0.875rem', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            Name: {character.name}
                                        </p>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#4B5563', overflow: 'hidden', maxHeight: '3rem' }}>
                                            Height: {character.height}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 'normal' }}>
                                            Mass: {character.mass}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 'normal' }}> Hair-color: {character.hair_color}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 'normal' }}>Eye-color: {character.eye_color}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        <button onClick={() => handleCharacterClick(character.films[0])}>View Details</button> {/* Call handleCharacterClick with character ID */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={handlePrevPage} style={{ padding: '10px', margin: '10px', backgroundColor: 'green' }}>Previous Page</button>
                <button onClick={handleNextPage} style={{ padding: '10px', margin: '10px', backgroundColor: 'green' }}>Next Page</button>
            </div>
        </div>
    );
}

export default ListOfCharacters;
