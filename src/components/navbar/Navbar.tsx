import React from 'react'
import { useContext } from 'react';
import { useNavigate } from "react-router-dom"
import './Navbar.scss'
import { AuthContext } from '../../context/AuthContext';
import axios from '../../api/axios.js';

// import MaterialUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';

// assets
import logo from '../../assets/images/logo.jpg'

function Navbar() {

    const context = useContext(AuthContext)
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const pages = [
        { alt: 'My reviews', roleId: 2, Fun: function () { navigate('/reviews') } },
        { alt: 'Favourite Apps', roleId: 2, Fun: function () { navigate('/favourites') } },
        { alt: 'All Apps', roleId: 1, Fun: function () { navigate('/') } },
        { alt: 'Games', roleId: 1, Fun: function () { navigate('/', { state: { category: 'game' } }) } },
        { alt: 'DLC', roleId: 1, Fun: function () { navigate('/', { state: { category: 'dlc' } }) } },
        { alt: 'Others', roleId: 1, Fun: function () { navigate('/', { state: { category: 'other' } }) } },
    ];

    const settings = [
        // logged settings
        {
            alt: 'Logout', logged: true, Fun: function () {
                // axios.get('/auth/logout');
                context?.setAuthState(
                    // console.log(JSON.stringify(prev));
                    // console.log(response.data.accessToken);
                    // console.log(response.data)
                    {
                        isLogged: false,
                        accessToken: '',
                        refreshToken: '',
                        id: 0,
                        email: '',
                        login: '',
                        roles: [{ id: 0, name: '' }]
                    }
                );
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                window.location.href = '/';
            }
        },
        // logout settings
        { alt: 'Login', logged: false, Fun: function () { navigate('/login') } },
        { alt: 'Register', logged: false, Fun: function () { navigate('/register') } },
    ];

    return (
        <AppBar position="static" className='navbar'>
            <Container maxWidth="xl">
                <Toolbar disableGutters className='navbar__content'>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 10, height: 80, width: 20 }} className='navbar__content__logo'>
                        <a href='/'><img src={logo} alt='logo' style={{ height: "100%" }} /></a>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        Games Library
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}>
                            {pages.map((page) => {
                                // if (page.roleId === context?.authState.roleId || (page.roleId === 1 && context?.authState.isLogged === false))
                                if (context?.authState.roles.find(e => { return e.id === page.roleId }) || (page.roleId === 1 && context?.authState.isLogged === false))
                                    return (
                                        <MenuItem key={page.alt} onClick={() => { handleCloseNavMenu(); page.Fun() }}>
                                            <Typography textAlign="center">{page.alt}</Typography>
                                        </MenuItem>
                                    )
                            })}
                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 10, height: 80, width: 20 }} className='navbar__content__logo'>
                        <a href='/'><img src={logo} alt='logo' style={{ height: "100%" }} /></a>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => {
                            if (context?.authState.roles.find(e => { return e.id === page.roleId }) || (page.roleId === 1 && context?.authState.isLogged === false))
                                return (
                                    <Button
                                        key={page.alt}
                                        onClick={() => { handleCloseNavMenu(); page.Fun() }}
                                        sx={{ my: 2, color: 'inherit', display: 'block' }}>
                                        {page.alt}
                                    </Button>
                                )
                        }
                        )}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Otwórz ustawienia">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {context?.authState.isLogged ?
                                    // <Avatar className='navbar__content__avatar' > {context.authState.email[0]} </Avatar>
                                    <span>{context.authState.login}</span>
                                    :
                                    <Avatar className='navbar__content__avatar' ><PersonIcon /></Avatar>
                                }
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>
                            {settings.map
                                ((setting) => {
                                    if (setting.logged === context?.authState.isLogged)
                                        return (
                                            <MenuItem key={setting.alt} onClick={() => { handleCloseUserMenu(); setting.Fun() }}>
                                                <Typography textAlign="center">{setting.alt}</Typography>
                                            </MenuItem>
                                        )
                                    else return null
                                })}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    )
}

export default Navbar 