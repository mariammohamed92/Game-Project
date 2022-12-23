import logo from './Images/logo.png';
import './App.css';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Layout from './Component/Layout/Layout';
import Home from './Component/Home/Home';
import All from './Component/All/All';
import ProtectedRouter from './Component/ProtectedRouter/ProtectedRouter';
import Platforms from './Component/Platforms/Platforms';
import Pc from './Component/Pc/Pc';
import Browser from './Component/Browser/Browser';
import SortBy from './Component/Sortby/Sortby';
import ReleaseDate from './Component/ReleaseDate/ReleaseDate';
import Popularity from './Component/Popularity/Popularity';
import Alphabetical from './Component/Alphabetical/Alphabetical';
import Relevance from './Component/Relevance/Relevance';
import Categories from './Component/Categories/Categories';
import Racing from './Component/Racing/Racing';
import Shooter from './Component/Shooter/Shooter';
import Sports from './Component/Sports/Sports';
import Social from './Component/Social/Social';
import OpenWorld from './Component/OpenWorld/OpenWorld';
import Zombie from './Component/Zombie/Zombie';
import Fantasy from './Component/Fantasy/Fantasy';
import ActionRpg from './Component/ActionRpg/ActionRpg';
import Action from './Component/Action/Action';
import Flight from './Component/Flight/Flight';
import BattleRoyale from './Component/BattleRoyale/BattleRoyale';
import Gamedetails from './Component/Gamedetails/Gamedetails';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';

function App() {

  const [userData, setUserData] = useState(null);

  function decodeUserData(){
    let encode=localStorage.getItem('userToken');
    let decode=jwtDecode(encode);
    setUserData(decode)
  };

  useEffect(()=>{

    if(localStorage.getItem('userToken')  !== null){
      decodeUserData()
    }

  },[]
  );

  function logOut(){
    localStorage.removeItem('userToken');
    setUserData(null);
    <Navigate to ={'/login'}/>
  };


  let router= createBrowserRouter([
    {
      path:'/', element:<Layout userData={userData} logOut={logOut}/>,
      children:[
        {
          
          path:'home', element:(
            <ProtectedRouter
            userData={userData} decodeUserData={decodeUserData}>
              <Home/>
            </ProtectedRouter>
          ),
        },
        {
          path:'all', element:(
            <ProtectedRouter
            userData={userData} decodeUserData={decodeUserData}>
              <All/>
            </ProtectedRouter>
          ),
        },
        {
          path:'platforms', element:(
            <ProtectedRouter
            userData={userData} decodeUserData={decodeUserData}>
              <Platforms/>
            </ProtectedRouter>
          ),
          children:[
            {path:'pc', element:<Pc/>},
            {path:'browser', element:<Browser/>}
          ],
        },
        {
          path:'sort-by', element:(
            <ProtectedRouter
            userData={userData} decodeUserData={decodeUserData}>
              <SortBy/>
            </ProtectedRouter>
          ),
          children:[
            {path:'release-date' , element:<ReleaseDate/>},
            {path:'popularity' , element:<Popularity/>},
            {path:'alphabetical' , element:<Alphabetical/>},
            {path:'relevance' , element:<Relevance/>},
          ],
        },
        {
          path:'categories', element:(
            <ProtectedRouter
            userData={userData} decodeUserData={decodeUserData}>
              <Categories/>
            </ProtectedRouter>
          ),
          children:[
            {path:'racing' , element:<Racing/>},
            {path:'shooter' , element:<Shooter/>},
            {path:'sports' , element:<Sports/>},
            {path:'social' , element:<Social/>},
            {path:'open-world' , element:<OpenWorld/>},
            {path:'zombie' , element:<Zombie/>},
            {path:'fantasy' , element:<Fantasy/>},
            {path:'action-rpg' , element:<ActionRpg/>},
            {path:'action' , element:<Action/>},
            {path:'flight' , element:<Flight/>},
            {path:'battle-royale' , element:<BattleRoyale/>},
          ],
        },
        {
          path:'gamedetails/:id', element:(
            <ProtectedRouter
            userData={userData} decodeUserData={decodeUserData}>
              <Gamedetails/>
            </ProtectedRouter>
          ),
        },
        {index: true, element:<Login decodeUserData={decodeUserData}/>},
        {path:'register', element:<Register/>},
        {path:'*', element:<Register/>}

      ],
    },
  ]);


  return <>
  <RouterProvider router={router}/>
  
  
  </>
}

export default App;
