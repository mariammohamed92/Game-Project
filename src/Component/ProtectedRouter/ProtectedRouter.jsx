import React from 'react'
import Login from '../Login/Login'


export default function ProtectedRouter({userData, children,decodeUserData}) {
  

  if(userData === null){
    <Login decodeUserData={decodeUserData}/>
  }
  else{
    return children;
  }
  return<>
  
  </>
}

