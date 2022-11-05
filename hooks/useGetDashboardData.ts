import React from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../services/firebase-config';

const useGetDashboardData = () => {
    
    const [overallUsersTotal, setOverallUsersTotal] = React.useState<number>(0)
    const [totalBooks, setTotalBooks] = React.useState<number>(0)
    const [studentUsersTotal, setStudentUsersTotal] = React.useState<number>(0)
    const [professorUsersTotal, setProfessorUsersTotal] = React.useState<number>(0)
    const [overallTransactionsTotal, setOverallTransactionsTotal] = React.useState<number>(0)
    
    React.useEffect(() => {
        const getDashboardDataFromFirestore = async () => {
    
        // This is to get user data including Student and Professor from firestore
    
         let overallTotalUsers: any[] = []
         await getDocs(collection(db, "users")).then((querySnapshotForUsers) => {
            querySnapshotForUsers.forEach((doc) => {
              overallTotalUsers.push({...doc.data(), docId: doc.id})
              setOverallUsersTotal(overallTotalUsers?.length)
            });
         }).catch((error: any) => {
          console.log(error.code)
         })
    
         //We are going to use data from last request to lessen api call uwu
         let overallStudentUsers: any[] = overallTotalUsers?.filter((doc) => {
          const hasStudentType = doc.type === 'student'
          return hasStudentType
         })
         setStudentUsersTotal(overallStudentUsers?.length)
         //We are going to use data from last request to lessen api call part 2
         let overallProfessorUsers: any[] = overallTotalUsers?.filter((doc) => {
          const hasProfessorType = doc.type === 'professor'
          return hasProfessorType
         })
         setProfessorUsersTotal(overallProfessorUsers?.length)
    
         // This is to get books data from firestore
    
         let totalBooks: any[] = []
         await getDocs(collection(db, "books")).then((querySnapshotForBooks) => {
            querySnapshotForBooks?.forEach((doc) => {
              totalBooks.push({...doc.data(), docId: doc.id})
              setTotalBooks(totalBooks?.length)
            });
         }).catch((error: any) => {
          console.log(error.code)
         })
    
          // This is to get book transaction history data from firestore
         let totalBookTransactions: any[] = []
         await getDocs(collection(db, "transactions")).then((querySnapshotForBookHistory) => {
          querySnapshotForBookHistory?.forEach((doc) => {
              totalBookTransactions.push({...doc.data(), docId: doc.id})
              setOverallTransactionsTotal(totalBookTransactions?.length)
            });
         }).catch((error: any) => {
          console.log(error.code)
         })
         
        
        }
        getDashboardDataFromFirestore()
      }, [])

  return {
    overallUsersTotal,
    totalBooks,
    studentUsersTotal,
    professorUsersTotal,
    overallTransactionsTotal
  }
}

export default useGetDashboardData