import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { gql, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useContextUserAuth } from './store';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Users from './pages/users';
import { Avatar, Container, Menu, MenuItem, Tooltip } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import Registers from './pages/registers';
import History from './pages/history';
import Reports from './pages/reports';
import Inventory from './pages/inventory';

const PERSON_AUTH = gql`
query($user: String){
  getUserAuthInfo(username: $user){
      id
    idPerson{
      id
      identityNumber
      firstName
      lastName
      homeAddress
      neighborhood
      gender
      phoneNumber1
      phoneNumber2
      admissionDate
      jobPosition
      birthday
      maritalStatus
      bloodType
    }
    idCompany{
      id
      name
      nit
      address
      phoneNumber
      society
    }
  }
}
`

const pages = ['usuarios', 'registro', 'historial', 'reporte', 'inventario'];
const settings = ['PERFIL', 'SALIR'];

export const NavigateAppBar = () => {

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

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

  const navigate = useNavigate()
  const payload = useContextUserAuth((state) => state.payload)
  const setData = useContextUserAuth((state) => state.setData)
  const title = useContextUserAuth((state) => state.title)
  const [getUserAuthInfo,] = useLazyQuery(PERSON_AUTH)

  useEffect(() => {
    if (payload === null) {
      //navigate('/login')
    } else {
      getUserAuthInfo({
        variables: {
          user: payload
        }
      }).then((data) => {
        setData(data.data.getUserAuthInfo)
      }).catch((err) => console.error(err))
        .finally()
    }
  }, [])

  return (
    <Box sx={{ height: "90%" }}>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {title}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
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
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => navigate(`${page}`)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {title}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => navigate(`${page}`)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src="https://as1.ftcdn.net/v2/jpg/04/56/58/14/1000_F_456581427_5XpGqNqCwLAGwaFFvxVGvnW2teOfJ0ZL.jpg" />
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
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Box sx={{ marginTop: 12 }}>
          <Routes>
            <Route path='/usuarios/*' element={<Users />} />
            <Route path='/registro/*' element={<Registers />} />
            <Route path='/historial/*' element={<History />} />
            <Route path='/reporte/*' element={<Reports />} />
            <Route path='/inventario/*' element={<Inventory />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default NavigateAppBar