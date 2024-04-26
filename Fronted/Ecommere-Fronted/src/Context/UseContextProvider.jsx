import React from 'react'
import UserContext from './UserContext'

const UserContextProvider = ({children}) => {
    const [user,setUser] = React.useState(null);


    const login = (userData, token) => {
        setUser(userData);
        // Store token in cookie
        document.cookie = `token=${token}`;
      };
    
      const logout = () => {
        setUser(null);
        // Clear token from cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      };

  return (
    <UserContext.Provider value={{user,setUser}}>
      {
        children
      }
    </UserContext.Provider>
  )
}

export default UserContextProvider
