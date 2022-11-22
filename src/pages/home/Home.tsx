import { Container } from '@mui/material'
import GameList from '../../components/gameList/GameList'
import './Home.scss'

function Home() {

    return (
        <Container className='home'>
            <GameList />
        </Container>
    )
}

export default Home