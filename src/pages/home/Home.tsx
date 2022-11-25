import { Container } from '@mui/material'
import GameList from '../../components/gameList/GameList'
import './Home.scss'

import axios from '../../api/axios.js';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Home() {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const context = useContext(AuthContext);
    const authState = useContext(AuthContext)?.authState;

    useEffect(() => {
        let isMounted = true;
        // console.log("AuthState: ")
        // console.log(context?.authState)
        // console.log("Local Storage - accessToken: " + localStorage.getItem("accessToken"));
        // console.log("Local Storage - refreshToken: " + localStorage.getItem("refreshToken"));
        // console.log("----");

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/user');

                await axios.get("/user", {
                    headers:
                        { 'Authorization': `Bearer ${context?.authState.accessToken}` }
                }).then((response2) => {
                    // console.log(response2);
                    isMounted && setUsers(response2.data);
                });

                //   console.log("token: "+ context?.authState.accessToken)

                // console.log(response);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        }

        // getUsers();

        // axiosPrivate.get(`/user/`, {
        //     headers: { 'Authorization' : `Bearer ${context?.authState.accessToken}` },
        // }).then( (response3) => {
        //     console.log(response3)
        //     console.log("hmmm 3");
        // })

        if (context?.authState.isLogged) {
            axiosPrivate.get(`/user/`, {
                withCredentials: false
            })
                .then((response3) => {
                    console.log("Data fetched for authorized user: ")
                    console.log(response3.data)
                })

            // axiosPrivate.get(`/app`,{
            //     withCredentials: false
            // })
            // .then( (response4) => {
            //     console.log("App data fetched for authorized user: ")
            //     console.log(response4.data)
            // })

            // axios.get(`/app`,{
            //     withCredentials: false
            // })
            // .then( (response5) => {
            //     console.log("zwykły axios response: ")
            //     console.log(response5.data)
            // })

        }

        return () => {
            isMounted = false;
            // console.log("users: ")
            // console.log(users)
        }
    }, [authState])

    useEffect(() => {
        //     axios.get("/users",{
        //         headers: { 'Authorization' : `Bearer ${context?.authState.accessToken}` }
        //       }).then((response) => {
        //         console.log(JSON.stringify(response.data))
        //       })
        // console.log(context?.authState)
    }, [])

    return (
        <Container className='home'>
            <GameList />
        </Container>
    )
}

export default Home