import { useRouter } from 'next/router'
import React, {useEffect} from 'react'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoutes = ({children}: {children: React.ReactNode}) => {
  
  const {user, getAdminStatus} = useAuth()
  
  const router = useRouter()

  useEffect(() => {

    const adminStatus = async () => {
      const adminStatus = await getAdminStatus(user.uid)
      if(adminStatus === 'requesting'){
        router.push('/approval-waiting')
      } 
    } 

    if(!user){
      router.push('/login')
    } 
    
    if(user){
      adminStatus()
    }
    
  }, [router, user, getAdminStatus])

  return <>{user ? children : null}</>
}

export default ProtectedRoutes