import { Button, Container, Stack } from '@mui/material';
import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../../api/axios.js';
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import './GameList.scss'
import InfiniteScroll from 'react-infinite-scroll-component';

function GameList() {

    const [apps, setApps] = useState<any[]>([])
    const [lastIndex, setLastIndexIndex] = useState(0)
    const pageLength = 20


    useEffect(() => {
        axios.get('/app').then((response) => setApps(Array.from({ length: pageLength }, (v, i) => {
            if (i === pageLength - 1) {
                setLastIndexIndex(i + 1)
            }
            // console.log(i)
            return response.data[i]
        })))
    }, [])

    const fetchMoreData = () => {
        axios.get('/app').then((response) => setApps(apps.concat(Array.from({ length: pageLength }, (v, i) => {
            if (i === pageLength - 1) {
                setLastIndexIndex(lastIndex + i + 1)
            }
            // console.log(lastIndex + i)
            return response.data[lastIndex + i]
        }))))
    }
    return (
        <InfiniteScroll
            dataLength={apps.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}>
            <Stack className='game_list' spacing={3}>
                {apps?.map((value, key) =>
                    <Stack spacing={10} direction='row' className='game_list__row' key={key}>
                        <img alt={value.title} src={value.screenshotLink} className='game_list__row__image' loading="lazy" />
                        <div className='game_list__row__details'>
                            <h1 className='game_list__row__title'>{value.title}</h1>
                            <p className='game_list__row__description'>{value.shortDescription}</p>
                            <Button className='game_list__row__button'>Details</Button>
                        </div>
                    </Stack>
                )}
            </Stack>
        </InfiniteScroll>
    )
}

export default GameList