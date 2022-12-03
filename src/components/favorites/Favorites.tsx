import { useState, useEffect, useContext } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { AuthContext } from '../../context/AuthContext'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
// import axios from '../../api/axios.js';
import './Favorites.scss'

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function Favorites(props: { app_id: number }) {
    const axiosPrivate = useAxiosPrivate()
    const context = useContext(AuthContext)

    const [gameIsFav, setGameIsFav] = useState(false)
    const [favGame, setFavGame] = useState<any | null>(null)

    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("")
    const [isAlertSuccess, setIsAlertSuccess] = useState(true);
    const showAlert = () => { setOpen(true); };

    const closeAlert = function (_event: any, reason: string) {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    useEffect(() => {
        if(context?.authState.isLogged) {
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
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.app_id, gameIsFav])

    const addFavorite = () => {
        if(context?.authState.isLogged) {
            const data = {
                appId: props.app_id,
                userId: context?.authState.id
            }
            axiosPrivate.post('/favapp', data, {
                withCredentials: false
            }).then((response) => {
                setGameIsFav(true)
                setIsAlertSuccess(true)
                setAlertMessage("Added to Favourites.")
                showAlert()
            })
        }
    }

    const removeFavorite = () => {
        if(context?.authState.isLogged) {
            if (favGame !== null) {
                axiosPrivate.delete(`favapp/${favGame.id}`, {
                    withCredentials: false
                }).then((response) => {
                    setGameIsFav(false)
                    setIsAlertSuccess(false)
                    setAlertMessage("Removed from Favourites.")
                    showAlert()
                })
            }
        }
    }

    return (
        <div className='favourites'>
            <Snackbar open={open} autoHideDuration={6000} onClose={closeAlert}>
                <Alert severity={isAlertSuccess ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
            {gameIsFav ?
                <FavoriteIcon fontSize='inherit' onClick={() => removeFavorite()} />
                :
                <FavoriteBorderIcon fontSize='inherit' onClick={() => addFavorite()} />
            }
        </div>
    )
}

export default Favorites