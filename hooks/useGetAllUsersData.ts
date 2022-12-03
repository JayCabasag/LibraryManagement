import React from 'react'
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from '../services/firebase-config';


interface UseGetAllUsersDataProps  {
    maxUserResultsLimit: number,
    filterBy?: string
}

const useGetAllUsersData  = ({maxUserResultsLimit, filterBy ='name'} : UseGetAllUsersDataProps) => {
    
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [overallUsersList, setOverallUsersList] = React.useState<any[]>([])


    React.useEffect(() => {
        const getStudentsUsersDataFromFirestore = async () => {
            setIsLoading(true)
           // This is to get books data from firestore
           let professorUsers: any[] = []
           const queryUsers = query(collection(db, "users"), limit(maxUserResultsLimit));
    
           await getDocs(queryUsers).then((querySnapshotForUsers) => {
                querySnapshotForUsers?.forEach((doc) => {
                professorUsers.push({...doc.data(), docId: doc.id})
                setOverallUsersList([...professorUsers])
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
        overallUsersList
    }
}

export default useGetAllUsersData 