import { useState, useEffect, useContext } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { AuthContext } from '../../context/AuthContext'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import axios from '../../api/axios.js';
import './Favorites.scss'

function Favorites(props: { app_id: number }) {
    const axiosPrivate = useAxiosPrivate()
    const context = useContext(AuthContext)

    const [gameIsFav, setGameIsFav] = useState(false)
    const [favGame, setFavGame] = useState<any | null>(null)

    useEffect(() => {
        if(props.app_id !== undefined) {
            axiosPrivate.get(`/favapp/user/${context?.authState.id}/app/${props.app_id}`, {
                withCredentials: false
            }).then((response) => {
                if (response.status === 200) {
                    setFavGame(response.data)
                    setGameIsFav(true)
                }
            })
        }
    }, [props.app_id, gameIsFav])

    const addFavorite = () => {
        const data = {
            appId: props.app_id,
            userId: context?.authState.id
        }

        axiosPrivate.post('/favapp', data, {
            withCredentials: false
        }).then((response) => setGameIsFav(true))
    }

    const removeFavorite = () => {
        if (favGame !== null) {
            axiosPrivate.delete(`favapp/${favGame.id}`, {
                withCredentials: false
            }).then((response) => setGameIsFav(false))
        }
    }

    return (
        <div className='favourites'>
            {gameIsFav ?
                <FavoriteIcon fontSize='inherit' onClick={() => removeFavorite()} />
                :
                <FavoriteBorderIcon fontSize='inherit' onClick={() => addFavorite()} />
            }
        </div>
    )
}

export default Favorites