import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HeaderBar } from '@/components/HeaderBar/HeaderBar';
import { Chat } from '@/components/Chat/Chat';

import './Private.scss';

export const Private = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
    if (id === undefined) {
        navigate('/home');
    }
    return (
        <div className="private">
            <HeaderBar type="private" />
            <Chat />
        </div>
    );
};