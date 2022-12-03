import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import {Button} from 'react-bootstrap'


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return(
  <>
    <Button variant='light' onClick={() => loginWithRedirect()} className='mx-2'>Log In</Button>
    <Button variant='light' onClick={() => loginWithRedirect({screen_hint: 'signup',})}>Register</Button>
  </>
  )
};

export default LoginButton;
