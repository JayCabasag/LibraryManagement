import React from 'react'
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from '../services/firebase-config';


interface UseGetStudentsUserDataProps {
    maxUserResultsLimit: number,
    filterBy?: string
}

const useGetStudentsUserData = ({maxUserResultsLimit, filterBy ='name'} : UseGetStudentsUserDataProps) => {
    
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [studentUserList, setStudentUserList] = React.useState<any[]>([])
    
    React.useEffect(() => {
        const getStudentsUsersDataFromFirestore = async () => {
            setIsLoading(true)
           // This is to get books data from firestore
           let studentUsers: any[] = []
           const queryUsers = query(collection(db, "users"), where("type","==","student"), limit(maxUserResultsLimit));
           await getDocs(queryUsers).then((querySnapshotForUsers) => {
                querySnapshotForUsers?.forEach((doc) => {
                studentUsers.push({...doc.data(), docId: doc.id})
                setStudentUserList([...studentUsers])
                setIsLoading(false)
              });
           }).catch((error: any) => {
            console.log(error.code)
            setIsLoading(false)
           })
          }
          getStudentsUsersDataFromFirestore()  
    }, [maxUserResultsLimit, filterBy])
    

    return {
        isLoading,
        studentUserList
    }
}

export default useGetStudentsUserData 