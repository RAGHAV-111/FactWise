import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PeopleList.css';
import { Modal } from 'react-responsive-modal';

function PeopleList() {
    const [open, setOpen] = useState(false);
    const [people, setPeople] = useState([]);
    const [editingPerson, setEditingPerson] = useState(null);
    const [editingPersonId, setEditingPersonId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://backendrg-tnw0.onrender.com/users');
                setPeople(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (id) => {
        const personToEdit = people.find(person => person.id === id);
        setEditingPerson(personToEdit);
        setEditingPersonId(id);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://backendrg-tnw0.onrender.com/user/${id}`);
            const updatedPeople = people.filter(person => person.id !== id);
            setPeople(updatedPeople);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleChange = (e) => {
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

    const saveChanges = async () => {
        try {
            const response = await axios.put(`https://backendrg-tnw0.onrender.com/user/${editingPersonId}`, editingPerson);
            const updatedPeople = people.map(person => {
                if (person.id === editingPersonId) {
                    return response.data;
                }
                return person;
            });
            setPeople(updatedPeople);
            closeModal();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Filtering people based on search query
    const filteredPeople = people.filter(person =>
        person.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.last.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="people-list relative  ">

            <div className='  p-10 justify-center text-center w-full  ' >

                <p className=" p-10 text-3xl font-bold tracking-tight text-[#000000] sm:text-4xl">View List</p>
                <input
                    className='border p-4 w-60'
                    type="text"
                    placeholder="Search the name of the user"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div id='specification' className="overflow-hidden py-8 sm:py-16  ">

                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="">

                            <p className="pt-10 px-10 text-3xl font-bold tracking-tight text-[#000000] sm:text-4xl">List of Users</p>
                            <dl className="mt-2 max-w-xl space-y-8 text-base leading-7 text-[#000000] lg:max-w-none py-4">

                                <div className="absolute top-48 right-20 p-6   justify-center text-center " >
                                    <p className=" p-10 text-3xl font-bold tracking-tight text-[#000000] sm:text-4xl">Edit User</p>
                                    <form className=' border flex px-20 flex-col justify-center text-center'>

                                        <div className='p-4'>

                                            <label className=' m-2 p-2 ' htmlFor="first">First Name:</label>
                                            <input className='border m-2 p-2 rounded-lg' type="text" id="first" name="first" value={editingPerson?.first} onChange={handleChange} />
                                        </div>


                                        <div className='p-4'>
                                            <label className=' m-2 p-2 ' htmlFor="last">Last Name:</label>
                                            <input className='border m-2 p-2 rounded-lg' type="text" id="last" name="last" value={editingPerson?.last} onChange={handleChange} />
                                        </div>


                                        <div className='p-4'>
                                            <label className=' m-2 p-2 ' htmlFor="last">Gender:</label>
                                            <select
                                                className='border m-2 p-2 rounded-lg'
                                                id="gender"
                                                name="gender"
                                                value={editingPerson?.gender}
                                                onChange={handleChange}
                                            >
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="Transgender">Transgender</option>
                                                <option value="Rather not say">Rather not say</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div className='p-4'>
                                            <label className=' m-2 p-2 ' htmlFor="last">Description:</label>
                                            <textarea className='border m-2 p-2 rounded-lg h-40 text-justify ' type="text" id="last" name="last" value={editingPerson?.description} onChange={handleChange} />
                                        </div>



                                        <button className='flex justify-center text-center w-full  bg-green-500 px-4 py-2 m-4 rounded-lg' type="button" onClick={saveChanges}>Save</button>
                                    </form>
                                </div>

                                {filteredPeople.map(person => (
                                    <div key={person.id} className="card w-full">
                                        <details className="accordion border p-4  w-full ">
                                            <summary className=" cursor-pointer font-semibold text-[#14274a]">

                                                <div className='flex '>

                                                    <div className='rounded-full p-4'>

                                                        {<img src={person.picture} className='rounded-full' alt={person.first} />}
                                                    </div>
                                                    <p className='p-4 flex justify-center text-center mt-4'>

                                                        {person.first} {person.last}
                                                    </p>
                                                </div>
                                            </summary>
                                            <div className='text-black'>
                                                <div className='flex'>
                                                    <div className='p-4'>
                                                        <p className='py-2'>Age</p>
                                                        {/* Age calculation */}
                                                        <p className=''>
                                                            {(() => {
                                                                const dob = new Date(person.dob);
                                                                const currentDate = new Date();
                                                                let age = currentDate.getFullYear() - dob.getFullYear();
                                                                if (
                                                                    currentDate.getMonth() < dob.getMonth() ||
                                                                    (currentDate.getMonth() === dob.getMonth() &&
                                                                        currentDate.getDate() < dob.getDate())
                                                                ) {
                                                                    age--;
                                                                }
                                                                return age;
                                                            })()}
                                                        </p>
                                                    </div>

                                                    <div className='p-4'>


                                                        <p className='py-2'>Gender</p>
                                                        <p className='capitalize'>{person.gender}</p>

                                                    </div>


                                                    <div className='p-4'>


                                                        <p className='py-2'>Country</p>
                                                        <textfield className=''>{person.country}</textfield>

                                                    </div>


                                                </div>

                                                <div className='p-4'>


                                                    <p className='py-2'>Description:</p>
                                                    <textarea className='w-96 h-60'>{person.description}</textarea>

                                                </div>


                                                <div className='flex p-4'>

                                                    <button className='bg-green-500 px-4 py-2 m-4 rounded-lg' onClick={() => handleEdit(person.id)}>Edit</button>
                                                    <button className='bg-red-500 px-4 py-2 m-4 rounded-lg' onClick={() => handleDelete(person.id)}>Delete</button>
                                                </div>
                                            </div>
                                        </details>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
}

export default PeopleList;
