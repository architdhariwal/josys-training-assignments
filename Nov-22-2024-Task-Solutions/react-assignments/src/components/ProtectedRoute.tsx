import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";


interface ProtectedRouteProps{
    returnUrl : string;
    children:React.ReactNode
    
}

const ProtectedRoute = ( props:ProtectedRouteProps ) => {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const checkUserToken = () => {
        const userToken = sessionStorage.getItem('AUTH_TOKEN');

        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);                
                  return navigate('/Login?returnUrl=' + props.returnUrl);
          //      return navigate('/Login');
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
       // alert(props.returnUrl);       
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}

export default ProtectedRoute;