import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import '../style/HostManage.css'

function HostManage() {

    const hostID = sessionStorage.getItem("userID");
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await Axios.get(`http://localhost:3001/host/activity/${hostID}`);
            setActivity(response.data[0]);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container'>
            <h1>My Group</h1>
            <div className='reciept'>
                <div className='activity-detail'>
                    <div className='top-inline'>
                        <h3>{activity.name}</h3>
                        <span>{activity.category}</span>
                    </div>
                    <p>{activity.description}</p>
                    <div className='bottom-inline'>
                        <span>{activity.room} | {activity.address}</span>
                        <span>{activity.equipment}</span>

                    </div>
                </div>
                <hr />
                <div className='group-detail'>
                    <div className='group-inline'>
                        <h4>Member list</h4>
                        <div className='capacity'>
                            <span className='bold'>{7}</span>/
                            <span>{activity.capacity}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostManage