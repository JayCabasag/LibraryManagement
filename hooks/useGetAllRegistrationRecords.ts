import React from 'react'
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from '../services/firebase-config';


interface UseGetAllRegistrationRecordsProps  {
    maxUserResultsLimit: number,
    filterBy?: string
}

const useGetAllRegistrationRecords  = ({maxUserResultsLimit, filterBy ='name'} : UseGetAllRegistrationRecordsProps) => {
    
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [overallTransactions, setOverallTransactions] = React.useState<any[]>([])


    React.useEffect(() => {
        const getStudentsUsersDataFromFirestore = async () => {
            setIsLoading(true)
           // This is to get books data from firestore
           let professorUsers: any[] = []
           const queryUsers = query(collection(db, "transactions"), limit(maxUserResultsLimit));
    
           await getDocs(queryUsers).then((querySnapshotForUsers) => {
                querySnapshotForUsers?.forEach((doc) => {
                professorUsers.push({...doc.data(), docId: doc.id})
                setOverallTransactions([...professorUsers])
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
        overallTransactions
    }
}

export default useGetAllRegistrationRecords