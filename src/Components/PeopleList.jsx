import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './PeopleList.css'; // Import the CSS file for your component
import { Modal } from 'react-responsive-modal';
import { isEqual } from 'lodash';
import { useCallback } from 'react'
import { Button } from 'antd'
import { DraggableModal, DraggableModalProvider } from 'ant-design-draggable-modal'
import 'ant-design-draggable-modal/dist/index.css'

function PeopleList() {
    const [open, setOpen] = useState(false);
    const [people, setPeople] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingPerson, setEditingPerson] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [errors, setErrors] = useState({});
    const [visible, setVisible] = useState(false)
    const onOk = useCallback(() => setVisible(true), [])
    const onCancel = useCallback(() => setVisible(false), [])

    // State to keep track of the person being edited

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
        // Prevent opening another accordion while in edit mode
        if (!isEditMode) {
            setIsEditMode(true);
            // Set the editingPerson state to the person with the specified ID
            const personToEdit = people.find(person => person.id === id);
            setEditingPerson(personToEdit);
            setOpen(true); // Open the modal
        }
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
        setIsEditMode(false);
        setIsSaveDisabled(true);
        closeModal(); // Close the modal after saving changes
    };
    const handleDelete = (id) => {
        const updatedPeople = people.filter(person => person.id !== id);
        setPeople(updatedPeople);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let error = '';

        // Validation checks
        if (name === 'age' && isNaN(value)) {
            error = 'Age must be a number';
        } else if (name === 'country' && !isNaN(value)) {
            error = 'Country must be text';
        } else if (value.trim() === '') {
            error = 'Field cannot be empty';
        }

        // Update errors state
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));

        // Update editingPerson state
        setEditingPerson(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Enable or disable save button
        const isFormValid = Object.values(errors).every(error => error === '');
        const isDataChanged = !isEqual(editingPerson, people.find(person => person.id === editingPerson.id));
        setIsSaveDisabled(!isFormValid || !isDataChanged);
    };


    const closeModal = () => {
        setOpen(false);
        setEditingPerson(null);
    };



    const confirmDelete = () => {
        const updatedPeople = people.filter(person => person.id !== editingPerson.id);
        setPeople(updatedPeople);
        setDeleteConfirmation(false);
        setEditingPerson(null);
    };

    const filteredPeople = people.filter(person => {
        return person.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
            person.last.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="people-list relative  ">

            <div className=' flex  p-10 justify-center text-center w-full  ' >
                <div className=' w-96'>

                    <p className=" p-10 text-3xl font-bold tracking-tight text-[#000000] sm:text-4xl">View List</p>
                    <input
                        className='border p-4 w-60'
                        type="text"
                        placeholder="Search the name of the user"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className=' mx-20 flex justify-center text-center w-60 bg-green-500 px-4 py-2 m-4 rounded-lg'>Search</button>
                </div>
            </div>


            <div id='specification' className="overflow-hidden py-8 sm:py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="">
                            <div className="">
                                <p className="pt-10 px-10 text-3xl font-bold tracking-tight text-[#000000] sm:text-4xl">List of Users</p>
                                <dl className="mt-2 max-w-xl space-y-8 text-base leading-7 text-[#000000] lg:max-w-none py-4">


                                    <DraggableModal visible={visible} onOk={onOk} onCancel={onCancel} className='' style={{ height: 900, width: 200 }} >

                                        <div className=" justify-center text-center " >
                                            <p className=" text-xl font-bold tracking-tight text-[#000000] sm:text-xl">Edit User</p>
                                            <form className=' border flex  flex-col justify-center text-center'>

                                                <div className='p-4'>

                                                    <label className=' m-2 p-2 ' htmlFor="first">First Name:</label>
                                                    <input className='border m-2 p-2 rounded-lg' type="text" id="first" name="first" value={editingPerson?.first} onChange={handleChange} />
                                                </div>


                                                <div className='p-4'>
                                                    <label className=' m-2 p-2 ' htmlFor="last">Last Name:</label>
                                                    <input className='border m-2 p-2 rounded-lg' type="text" id="last" name="last" value={editingPerson?.last} onChange={handleChange} />
                                                </div>

                                                <div className='p-4'>
                                                    <label className=' m-2 p-2 ' htmlFor="last">Country:</label>
                                                    <input className='border m-2 p-2 rounded-lg' type="text" id="last" name="last" value={editingPerson?.country} onChange={handleChange} />
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
                                                    <textarea className='border w-full h-32 m-2 p-2 rounded-lg  text-justify ' type="text" id="last" name="last" value={editingPerson?.description} onChange={handleChange} />
                                                </div>

                                                <button className='flex justify-center text-center w-full  bg-green-500 px-4 py-2 m-4 rounded-lg' type="button" onClick={() => { saveChanges(); onCancel(); }}>Save</button>
                                            </form>
                                        </div>

                                    </DraggableModal>

                                    <DraggableModal>

                                    </DraggableModal>


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
                                                        <textarea className='w-96 h-52'>{person.description}</textarea>

                                                    </div>


                                                    <div className='flex px-4'>

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
                                                            // Render the button only if age is more than 24
                                                            if (age > 18) {
                                                                return (
                                                                    <button className='bg-green-500 px-4 py-2 m-4 rounded-lg' onClick={() => { handleEdit(person.id); onOk(); }}>Edit</button>
                                                                );
                                                            }
                                                        })()}

                                                        <button className='bg-red-500 px-4 py-2 m-4 rounded-lg' onClick={() => { handleDelete(person.id) }}>Delete</button>
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
            </div>
        </div>
    );
}

export default PeopleList;
