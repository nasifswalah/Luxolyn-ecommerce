import React from 'react'
import SearchBar from '../components/SearchBar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ConfirmationModal from '../components/ConfirmationModal'

const Layout = () => {
  const open= false
  return (
    <>
      <Navbar/>
      <SearchBar/>
      {
        open && <ConfirmationModal/>
      }
      <Outlet/>
    </>
  )
}
export default Layout
