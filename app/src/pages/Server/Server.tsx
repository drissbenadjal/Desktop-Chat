import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const Server = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        if (id === undefined) {
            navigate('/home');
        }
        console.log(id);
    }, [id]);
    return (
        <div className="server">
            <h1>Server</h1>
        </div>
    );
};