import React, { useState, useEffect } from 'react';
import '../style/CreateActivity.css';
import Axios from 'axios';

function CreateActivity() {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [capacity, setCapacity] = useState(2);
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState(0);
    const [locationList, setLocationList] = useState([]);
    const [equipment, setEquipment] = useState(0);
    const [equipmentList, setEquipmentList] = useState([]);


    const handleCategoryClick = (event) => {
        event.preventDefault()
        setCategory(event.target.value);
    }

    const data_body = {
        name: name,
        category: category,
        capacity: capacity,
        description: description,
        location: location,
        equipment: equipment
    }

    const addActivity = () => {
        try {
            Axios.post('http://localhost:3001/create-activity', data_body);
            console.log("Create activity succesfully!")
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addActivity();
        setName("");
        setCategory("");
        setCapacity(2);
        setDescription("");
        setLocation(0);
        setEquipment(0);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const location_response = await Axios.get('http://localhost:3001/locations');
            const equipment_response = await Axios.get('http://localhost:3001/equipments');
            setLocationList(location_response.data);
            setEquipmentList(equipment_response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const handleLocationChange = (event) => {
        const selectedRoomID = event.target.value;
        setLocation(selectedRoomID);
    };


    const handleEquipmentChange = (event) => {
        const selectedCode = event.target.value;
        setEquipment(selectedCode);
    };


    return (
        <div className='container'>
            <h1>Create Activity</h1>
            <form>
                <div className='section'>
                    <h2>Choose tag(s) <span>that best describe your activity</span></h2>
                    <hr />
                    <div className="tags">
                        <button onClick={handleCategoryClick}
                            value={'Boardgame'}
                            className={category === 'Boardgame' ? 'selected' : ''}
                            style={{ background: "#DD6168" }}>
                            Boardgame
                        </button>
                        <button onClick={handleCategoryClick}
                            value={'Language'}
                            className={category === 'Language' ? 'selected' : ''}
                            style={{ background: "#FFD13F" }}>
                            Language
                        </button>
                        <button onClick={handleCategoryClick}
                            value={'Movie Talk'}
                            className={category === 'Movie Talk' ? 'selected' : ''}
                            style={{ background: "#7383D2" }}>
                            Movie Talk
                        </button>
                        <button onClick={handleCategoryClick}
                            value={'Book Talk'}
                            className={category === 'Book Talk' ? 'selected' : ''}
                            style={{ background: "#BAE076" }}>
                            Book Talk
                        </button>
                        <button onClick={handleCategoryClick}
                            value={'Talk on Topic'}
                            className={category === 'Talk on Topic' ? 'selected' : ''}
                            style={{ background: "#4D8CAF" }}>
                            Talk on Topic
                        </button>
                        <button onClick={handleCategoryClick}
                            value={'Watching Movie'}
                            className={category === 'Watching Movie' ? 'selected' : ''}
                            style={{ background: "#DD6168" }}>
                            Watching Movie
                        </button>
                        <button onClick={handleCategoryClick}
                            value={'Others'}
                            className={category === 'Others' ? 'selected' : ''}
                            style={{ background: "#7B7979" }}>
                            Others
                        </button>
                    </div>

                    <p>Don't know if your activity belongs to which tag? Select <span>Others</span></p>
                </div>

                <div className='section'>
                    <h2>Activity's Details</h2>
                    <hr />
                    <div>
                        <label>Activity's Name</label>
                        <input type='text' name='act-name'
                            value={name} placeholder="More creative name, more people are interested !"
                            onChange={(event) => setName(event.target.value)}></input>
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea name='act-desc' value={description}
                            placeholder="Tell them what you are going to do ..."
                            onChange={(event) => setDescription(event.target.value)}></textarea>
                    </div>

                    <div className='inline'>
                        <label >Maximum no. of participants</label>
                        <input type='number' name="capacity" min="2" max="30" value={capacity}
                            onChange={(event) => setCapacity(event.target.value)}></input>
                    </div>

                    <div>
                        <label>Location</label>
                        <select name='location' onChange={handleLocationChange} value={location}>
                            <option>Select location</option>
                            {locationList.map((val, key) => {
                                return (
                                    <option key={key} value={val.roomID}>{val.name}</option>
                                )
                            })}

                        </select>
                    </div>

                    <div>
                        <label>Equipment</label>
                        <select name='equipment' onChange={handleEquipmentChange} value={equipment}>
                            <option>Select equipment</option>
                            {equipmentList.map((val, key) => {
                                return (
                                    <option key={key} value={val.code}>{val.name}</option>
                                )
                            })}

                        </select>
                    </div>
                </div>

                <div className="btn-con">
                    <button onClick={handleSubmit}>Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateActivity