import React from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../services/firebase-config';

const useGetAdminData = () => {
    
    const [headAdminList, setHeadAdminList] = React.useState<any>([])
    const [adminList, setAdminList] = React.useState<any>([])
    const [staffList, setStaffList] = React.useState<any>([])
    const [staffRequestList, setStaffRequestList] = React.useState<any>([])

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

         setHeadAdminList(headAdminList)
         setAdminList(adminList)
         setStaffList(staffList)
         setStaffRequestList(requestingStaffList)

        }
        getAdminDataFromFirestore()
      }, [])

  return {
    adminList,
    staffList,
    staffRequestList,
    headAdminList
  }
}

export default useGetAdminData