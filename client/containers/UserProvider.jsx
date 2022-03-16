import React, {useState, createContext} from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {

  const [username, setUsername] = useState(null);

  return (
    <UserContext.Provider value={[username, setUsername]}>
      {props.children}
      </UserContext.Provider>
  );

}