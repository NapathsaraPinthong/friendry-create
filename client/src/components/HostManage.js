import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import '../style/HostManage.css'
import pic from '../asset/userpic.svg'

function HostManage() {

    const hostID = sessionStorage.getItem("userID");
    const [activity, setActivity] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const activity_response = await Axios.get(`http://localhost:3001/host/activity/${hostID}`);
            setActivity(activity_response.data[0]);
            const member_response = await Axios.get(`http://localhost:3001/host/group/${hostID}`);
            setMembers(member_response.data);

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
                            <span className='bold'>{members.length}</span>/
                            <span>{activity.capacity}</span>
                        </div>
                    </div>

                    <div className='member-con'>
                        {members.map((val, key) => {
                            return (
                                <div key={key}><img src={pic} width="25" />{val.fname} {val.lname}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostManage