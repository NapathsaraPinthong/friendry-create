import React, { useState, useEffect } from 'react'
import Axios from 'axios';

function HostManage() {

    const hostID = sessionStorage.getItem("userID");
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await Axios.get(`http://localhost:3001/host/all/${hostID}`);
            setActivity(response.data[0]);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container'>
            <h1>My Group</h1>
            <div className='activity-detail'>
                <h3>{activity.name}</h3>
                <p>{activity.description}</p>
                <div>
                    <span>{activity.category}</span>
                    <span>{activity.room}{activity.address}</span>
                </div>
            </div>
            <hr />
            <div className='group-detail'>
                <h5>Member list</h5>
                <div className='capacity'>
                    <span>{activity.capacity}</span>
                </div>
            </div>
        </div>
    )
}

export default HostManage