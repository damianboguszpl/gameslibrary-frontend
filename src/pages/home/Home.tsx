import { Container } from '@mui/material'
import GameList from '../../components/gameList/GameList'
import './Home.scss'

import axios from '../../api/axios.js';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Home() {
    const axiosPrivate = useAxiosPrivate();
    const context = useContext(AuthContext);
    const authState = useContext(AuthContext)?.authState;

    // useEffect(() => {

    //     if (context?.authState.isLogged) {
    //         axiosPrivate.get(`/user/`, {
    //             withCredentials: false
    //         })
    //             .then((response3) => {
    //                 console.log("Data fetched for authorized user: ")
    //                 console.log(response3.data)
    //             })
    //     }

    //     return () => {
    //     }
    // }, [authState])


    return (
        <Container className='home'>
            <GameList />
        </Container>
    )
}

export default Home