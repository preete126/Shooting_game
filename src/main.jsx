import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
// import App from './App'

import './index.css'
// import Menu from './Menu'
const App  = React.lazy(()=>import("./App"))
const Menus = React.lazy(()=>import("./Menus"))


const router = createBrowserRouter([
  {path: '/', element: <Menus/>, errorElement:<h1>Page not found</h1>},
  {path:'/Eliminate all enemies', element:<App/>}
]) 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
