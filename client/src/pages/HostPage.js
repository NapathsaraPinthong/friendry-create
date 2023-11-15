import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function HostPage() {
    const [redirect, setRedirect] = useState(null);
    const userID = sessionStorage.getItem('userID');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await Axios.get('http://localhost:3001/hosts');
            const hostsData = response.data.map((val) => val.hostID);

            if (userID && hostsData.includes(Number(userID))) {
                setRedirect('/group');
            } else {
                setRedirect('/create');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (redirect) {
            navigate(redirect);
        }
    }, [redirect, navigate]);

    return null;
}

export default HostPage;
