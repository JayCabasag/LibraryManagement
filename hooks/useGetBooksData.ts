import React from 'react'
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from '../services/firebase-config';

interface UseGetBooksDataProps {
  maxBookResultsLimit: number,
  filterBy?: string
}

const useGetBooksData = ({maxBookResultsLimit, filterBy = 'title'}: UseGetBooksDataProps) => {
    
    const [bookList, setBookList] = React.useState<any>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    
    React.useEffect(() => {

        const getDashboardDataFromFirestore = async () => {
          setIsLoading(true)
         // This is to get books data from firestore
    
         let books: any[] = []

         const queryBooks = query(collection(db, "books"), limit(maxBookResultsLimit), orderBy(filterBy));

         await getDocs(queryBooks).then((querySnapshotForBooks) => {
            querySnapshotForBooks?.forEach((doc) => {
              books.push({...doc.data(), docId: doc.id})
              setBookList([...books])
              setIsLoading(false)
            });
         }).catch((error: any) => {
          console.log(error.code)
          setIsLoading(false)
         })
        }
        getDashboardDataFromFirestore()
      }, [maxBookResultsLimit, filterBy])

  return {
    bookList,
    isLoading
  }
}

export default useGetBooksData