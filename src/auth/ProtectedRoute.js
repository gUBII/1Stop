import React, {useState, useEffect} from 'react';
import { withAuthenticationRequired, useAuth0} from '@auth0/auth0-react';
import services from '../api/services'
import { Navigate  } from 'react-router-dom';


const ProtectedRoute = ({ component, ...componentProps}) => {

  const [isAdmin, setIsAdmin] = useState(false)
  const [checkedAdmin, setCheckedAdmin] = useState(false)
  const { user, loginWithRedirect} = useAuth0();

    useEffect(() => {
      if(user){
        services.getToken(user).then(token =>{
          services.checkAdmin(token).then(response =>{
            setIsAdmin(response)
            setCheckedAdmin(true)
          })
        })
      } else{
      loginWithRedirect(
        {appState:{
          returnTo: window.location.pathname
        }
    })
      }
      return () => {
        setIsAdmin(false)
      }
    }, [user])

    const ProtectedComponent= withAuthenticationRequired(component, {
      appState:{
        returnTo: window.location.pathname
      }
     })
    if(isAdmin){
      return <ProtectedComponent {...componentProps}/>
    } else if (checkedAdmin){
      return <Navigate to='/'/>
    }
   
};

export default ProtectedRoute;