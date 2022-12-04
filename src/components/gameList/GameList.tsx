import { Button, Container, Paper, Stack } from '@mui/material';
import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../../api/axios.js';
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import './GameList.scss'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation, useNavigate } from 'react-router-dom';

function GameList() {
    const navigate = useNavigate()

    const [apps, setApps] = useState<any[]>([])
    const [lastIndex, setLastIndexIndex] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const pageLength = 20
    const location = useLocation()
    const [apiUrl, setApiUrl] = useState('/app')

    const selectCategory = () => {
        setTimeout(() => {
            if (location?.state?.category === 'game') setApiUrl('/app/type/game')
            else if (location?.state?.category === 'dlc') setApiUrl('/app/type/dlc')
            else if (location?.state?.category === 'other') setApiUrl('/app/type/other')
            else setApiUrl('/app')
        }, 200)
    }

    useEffect(() => {
        selectCategory()
        axios.get(apiUrl).then((response) => setApps(Array.from({ length: pageLength }, (v, i) => {
            if (i === pageLength - 1) {
                setLastIndexIndex(i + 1)
            }

            if (response.data[i] === undefined) setHasMore(false)

            return response.data[i]
        })))
    }, [location?.state?.category, apiUrl])

    const fetchMoreData = () => {
        axios.get(apiUrl).then((response) => setApps(apps.concat(Array.from({ length: pageLength }, (v, i) => {
            if (i === pageLength - 1) {
                setLastIndexIndex(lastIndex + i + 1)
            }

            if (response.data[lastIndex + i] === undefined) setHasMore(false)

            return response.data[lastIndex + i]
        }))))
    }
    return (
        <InfiniteScroll
            dataLength={apps.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}>
            <Stack className='game_list' spacing={3}>
                {apps?.map((value, key) => {
                    if (value !== undefined)
                        return (
                            <Paper className='game_list__row' key={key} elevation={3} onClick={() => navigate(`/details/${value?.id}`)}>
                                <img alt={value?.title} src={value?.screenshotLink} className='game_list__row__image' loading="lazy" />
                                <div className='game_list__row__details'>
                                    <h1 className='game_list__row__title'>{value?.title}</h1>
                                    <p className='game_list__row__description'>{value?.shortDescription}</p>
                                </div>
                            </Paper>
                        )
                }
                )}
            </Stack>
        </InfiniteScroll>
    )
}

export default GameList