import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { useContextUserAuth } from './store';

const PERSON_AUTH = gql`
mutation($user: String){
  getUserAuthInfo(username: $user){
    info{
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
}
`

export const NavigateAppBar = () => {

  const payload = useContextUserAuth((state) => state.payload)
  const setData = useContextUserAuth((state) => state.setData)
  const [getUserAuthInfo,] = useMutation(PERSON_AUTH)

  useEffect( () => {
    getUserAuthInfo({
      variables: {
        user: payload
      }
    }).then( (data) => {
      setData(data.data.getUserAuthInfo)
    }).catch((err) => console.error(err))
    .finally()

  }, [] )

  return (
    <Box >
      <AppBar position="static">
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
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavigateAppBar