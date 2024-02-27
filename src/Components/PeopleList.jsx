import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './PeopleList.css'; // Import the CSS file for your component
import { Modal } from 'react-responsive-modal';

function PeopleList() {
    const [open, setOpen] = useState(false);
    const [people, setPeople] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingPerson, setEditingPerson] = useState(null); // State to keep track of the person being edited

    useEffect(() => {
        // Define a function to fetch data
        const fetchData = async () => {
            try {
                const response = await axios.get('/src/celebrities.json'); // Replace 'path/to/your/json/file.json' with the actual path
                setPeople(response.data); // Set the fetched data to the state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetch function
        fetchData();
    }, []); // Make sure to pass an empty dependency array to useEffect to fetch data only once

    const handleEdit = (id) => {
        // Set the editingPerson state to the person with the specified ID
        const personToEdit = people.find(person => person.id === id);
        setEditingPerson(personToEdit);
        setOpen(true); // Open the modal
    };

    const handleDelete = (id) => {
        // Handle delete functionality
        console.log('Delete clicked for person with ID:', id);
    };

    const handleChange = (e) => {
        // Update the editingPerson state when input values change
        const { name, value } = e.target;
        setEditingPerson(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const closeModal = () => {
        setOpen(false);
        setEditingPerson(null);
    };

    const saveChanges = () => {
        // Update the local state with the edited person
        const updatedPeople = people.map(person => {
            if (person.id === editingPerson.id) {
                return editingPerson;
            }
            return person;
        });
        setPeople(updatedPeople);
        closeModal(); // Close the modal after saving changes

        // Convert the updated data to JSON format
        const updatedDataJson = JSON.stringify(updatedPeople);

        // Use browser APIs to save the updated JSON to a file (This is not supported in all browsers and not recommended for production)
        const blob = new Blob([updatedDataJson], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'celebrities.json';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const filteredPeople = people.filter(person => {
        // Filter people based on search term
        return person.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.last.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="people-list">
            <Modal open={open} onClose={closeModal} center>
                <h2>Edit Person</h2>
                <form>
                    <label htmlFor="first">First Name:</label>
                    <input type="text" id="first" name="first" value={editingPerson?.first} onChange={handleChange} />
                    <label htmlFor="last">Last Name:</label>
                    <input type="text" id="last" name="last" value={editingPerson?.last} onChange={handleChange} />
                    {/* Add input fields for other properties */}
                    <button type="button" onClick={saveChanges}>Save</button>
                </form>
            </Modal>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>Search</button>
            </div>
            <div id='specification' className="overflow-hidden py-8 sm:py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="">
                            <div className="">
                                <p className="pt-10 px-10 text-3xl font-bold tracking-tight text-[#14274a] sm:text-4xl">Ekana Ontario Specifications</p>
                                <dl className="mt-2 max-w-xl space-y-8 text-base leading-7 text-[#e0b973] lg:max-w-none py-4">
                                    {filteredPeople.map(person => (
                                        <div key={person.id} className="card">
                                            <details className="accordion">
                                                <summary className="cursor-pointer font-semibold text-[#14274a]">
                                                    {person.first} {person.last}
                                                </summary>
                                                <div>
                                                    <img src={person.picture} alt={person.first} />
                                                    <p>Email: {person.email}</p>
                                                    <p>Country: {person.country}</p>
                                                    <p>Description: {person.description}</p>
                                                    <button className='bg-green-500' onClick={() => handleEdit(person.id)}>Edit</button>
                                                    <button className='bg-red-500' onClick={() => handleDelete(person.id)}>Delete</button>
                                                </div>
                                            </details>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PeopleList;
