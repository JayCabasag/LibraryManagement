import React from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../services/firebase-config';

interface UseGetAdminDataProps {
   refresh: boolean
}

const useGetAdminData = ({refresh} : UseGetAdminDataProps) => {
    
    const [headAdminList, setHeadAdminList] = React.useState<any>([])
    const [adminList, setAdminList] = React.useState<any>([])
    const [staffList, setStaffList] = React.useState<any>([])
    const [staffRequestList, setStaffRequestList] = React.useState<any>([])
    const [totalAdmins, setTotalAdmins] = React.useState<number>(0)

    React.useEffect(() => {
        const getAdminDataFromFirestore = async () => {
    
         // This is to get admins data from firestore
    
         let admins: any[] = []
         await getDocs(collection(db, "admins")).then((querySnapshotForAdmins) => {
            querySnapshotForAdmins?.forEach((doc) => {
              admins.push({...doc.data(), docId: doc.id})
              setAdminList([...admins])
            });
         }).catch((error: any) => {
          console.log(error.code)
         })

         let headAdminList: any [] = admins.filter((admin) => {
            const hasHeadAdminType = admin?.status === 'head admin'
            return hasHeadAdminType
         })

         let adminList : any [] = admins.filter((admin) => {
            const hasAdminType = admin?.status === 'admin'
            return hasAdminType
         })

         let staffList : any [] = admins.filter((admin) => {
            const hasStaffType = admin?.status === 'staff'
            return hasStaffType
         })

         let requestingStaffList : any [] = admins.filter((admin) => {
            const hasRequestingStaffType = admin?.status === 'requesting'
            return  hasRequestingStaffType
         })

         setTotalAdmins(admins?.length)
         setHeadAdminList(headAdminList)
         setAdminList(adminList)
         setStaffList(staffList)
         setStaffRequestList(requestingStaffList)

        }
        getAdminDataFromFirestore()
      }, [refresh])

  return {
    adminList,
    staffList,
    staffRequestList,
    headAdminList,
    totalAdmins
  }
}

export default useGetAdminData