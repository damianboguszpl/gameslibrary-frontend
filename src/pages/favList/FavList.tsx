import { Stack, Paper } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import './FavList.scss'

function FavList() {
    const navigate = useNavigate()
    const context = useContext(AuthContext)
    const axiosPrivate = useAxiosPrivate()

    const [apps, setApps] = useState<any[]>([])

    useEffect(() => {
        axiosPrivate.get(`/favapp/user/${context?.authState.id}`, {
            withCredentials: false
        }).then((response) => { if (response.status === 200) setApps(response.data) })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context])

    return (
        <Stack className='fav_list' spacing={3}>
            {apps?.map((value, key) =>
                <Paper className='fav_list__row' key={key} elevation={3} onClick={() => navigate(`/details/${value.app.id}`)}>
                    <img alt={value.app.title} src={value.app.screenshotLink} className='fav_list__row__image' loading="lazy" />
                    <div className='fav_list__row__details'>
                        <h1 className='fav_list__row__title'>{value.app.title}</h1>
                        <p className='fav_list__row__description'>{value.app.shortDescription}</p>
                    </div>
                </Paper>
            )}
        </Stack>
    )
}

export default FavList