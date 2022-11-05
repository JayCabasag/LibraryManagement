import React from 'react'
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from '../services/firebase-config';


interface UseGetProfessorsUserDataProps {
    maxUserResultsLimit: number,
    filterBy?: string
}

const useGetProfessorsUserData  = ({maxUserResultsLimit, filterBy ='name'} : UseGetProfessorsUserDataProps) => {
    
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [professorUsersList, setProfessorUsersList] = React.useState<any[]>([])
    
    React.useEffect(() => {
        const getStudentsUsersDataFromFirestore = async () => {
            setIsLoading(true)
           // This is to get books data from firestore
           let professorUsers: any[] = []
           const queryUsers = query(collection(db, "users"), where("type","==","professor"), limit(maxUserResultsLimit));
    
           await getDocs(queryUsers).then((querySnapshotForUsers) => {
                querySnapshotForUsers?.forEach((doc) => {
                professorUsers.push({...doc.data(), docId: doc.id})
                setProfessorUsersList([...professorUsers])
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
        professorUsersList
    }
}

export default useGetProfessorsUserData 