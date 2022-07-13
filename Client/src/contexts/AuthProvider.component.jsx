import { createContext, useState } from "react";
import React from 'react'

export const AuthContext = createContext();

const AuthProvider = (props) => {
    const token = localStorage.getItem('user-token');
    const INIT_STATE = token ? token : null;
    const [userToken, setUserToken] = useState(INIT_STATE);

    const value = {userToken, setUserToken}
  return (
<AuthContext.Provider value ={value}>
{props.children}
</AuthContext.Provider>
    )
}

export default AuthProvider;