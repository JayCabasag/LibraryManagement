import React, { useState } from 'react'
import Navbar from '../../../components/nav-bar'
import { Box, Container, SxProps } from '@mui/material'
import SideBar from '../../../components/side-bar'
import Dashboard from '../../../components/dashboard'
import { useRouter } from 'next/router'
import Books from '../../../components/books'
import Admins from '../../../components/admins'
import Professors from '../../../components/professors'
import Profile from '../../../components/profile'
import Students from '../../../components/students'

const classes = {
    homeContainer: {
        height: '100vh',
        width: '100%',
        display: 'flex'
    }
} as Record<string, SxProps>

const Index = () => {
  
  const router = useRouter()
  const { slug } = router.query
  return (
    <Box sx={classes.homeContainer}>
       <Navbar />
       <SideBar />
       {
        slug === undefined && (
            <Dashboard />
        )
       }
       {
        slug === 'dashboard' && (
            <Dashboard />
        )
       }
        {
        slug === 'books' && (
            <Books />
        )
       }
        {
        slug === 'admins' && (
            <Admins/>
        )
       }
        {
        slug === 'professors' && (
            <Professors />
        )
       }
        {
        slug === 'students' && (
            <Students />
        )
       }
        {
        slug === 'profile' && (
            <Profile />
        )
       }
    </Box> 
  )
}

export default Index