import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useContextUserAuth } from './store';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Users from './pages/users';

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

export const NavigateAppBar = () => {

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
    <Box >
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{marginTop: 12}}>
        <Routes>
          <Route path='/usuarios/*' element={<Users />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default NavigateAppBar