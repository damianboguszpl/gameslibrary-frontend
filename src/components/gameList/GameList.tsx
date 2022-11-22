import { Button, Container, Stack } from '@mui/material';
import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../../api/axios.js';
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import './GameList.scss'

function GameList() {

    const [apps, setApps] = useState<any[]>()
    useEffect(() => {
        axios.get('/app').then((response) => setApps(response.data))
    }, [])

    return (
        <Stack className='game_list' spacing={3}>
            {apps?.map((value, key) =>
                <Stack spacing={10} direction='row' className='game_list__row'>
                    <img alt={value.title} src={value.screenshotLink} className='game_list__row__image' loading="lazy" />
                    <div className='game_list__row__details'>
                        <h1 className='game_list__row__title'>{value.title}</h1>
                        <p className='game_list__row__description'>{value.shortDescription}</p>
                        <Button className='game_list__row__button'>Details</Button>
                    </div>
                </Stack>
            )}
        </Stack>
    )
}

export default GameList