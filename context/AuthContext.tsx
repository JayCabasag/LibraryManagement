import React, {createContext, useContext, useEffect, useId, useState} from 'react'
import {EmailAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User, reauthenticateWithCredential} from 'firebase/auth'
import { auth, db } from '../services/firebase-config'
import AuthenticatingLoading from '../components/loading/AuthenticatingLoading'
import { doc, getDoc, getFirestore, query, collection, where, getDocs, addDoc, serverTimestamp, setDoc, updateDoc, deleteDoc
} from "firebase/firestore";
import next from 'next';
const AuthContext = createContext({})

export const useAuth = () => useContext<any>(AuthContext)

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {

    const [user, setUser] = useState<any>(null)
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true)
    const [loadingMessage, setLoadingMessage] = useState<string>('Please wait...')

    useEffect(() => {
      const unsubscribe =  onAuthStateChanged(auth, (user) => {
        if(user){
            setUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                profileURL: user.photoURL
            })
        } else {
            setUser(null)
        }
        setIsAuthenticating(false)
      })

      return () => unsubscribe()
    }, [])
    
    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password )
    }

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        setUser(null)
        await signOut(auth)
    }

    const handleSetLoadingMessage = (message: string) => {
        setLoadingMessage(message)
    }

    const updateUserProfile = (displayName: string, photoURL: string) => {
        const currentUser = auth.currentUser as User
        return updateProfile(currentUser , {
            displayName, 
            photoURL
        })
    }

    const getAdminStatus = async (uid: string) => {
        const docRef = doc(db, "admins", uid);
        const docSnap = await getDoc(docRef);
        //This just means return admin status from admins collection firestore
        const status = docSnap?.data()?.status || 'requesting'
        return status 
    }

    const addAdminCredentialToDatabase = async (uid: string, email: string, displayName: string, profileURL: string) => {
        const newAdminRef: any =  doc(db, "admins", uid)
        const data = {
                    profileURL,
                    displayName,
                    email,
                    createdAt: serverTimestamp(),
                    status: 'requesting'
                }
        return await setDoc(newAdminRef, data).catch((error: any) => {console.log(error)})
    }

    const reAuthenticateUser = async (email: string, password: string) => {
        const credential = EmailAuthProvider.credential(email, password);
        return await reauthenticateWithCredential(auth.currentUser as any, credential)
    }

    const updateAdminRank = async (adminId: string, adminType: string) => {
        const staffRequestingRef = doc(db, "admins", adminId);
        return await updateDoc(staffRequestingRef, {
          status: adminType
        })
    }

    const deleteAdminRequest = async (docId: string) => {
        const staffRequestingRef = doc(db, "admins", docId);
        return await deleteDoc(staffRequestingRef)
    }

    const checkIfAdminHasDatabaseRecord = async (uid: string, email: string, displayName: string, profileURL: string) => {
        const docRef = doc(db, "admins", uid);
        return await getDoc(docRef).then((docSnap) =>{
           if(!docSnap.exists()){
            addAdminCredentialToDatabase(uid, email, displayName, profileURL)
           }
        }).catch((error: any) => {
            console.log(error)
        })
    }

    return (
        <AuthContext.Provider 
            value={{
                user, 
                logout, 
                login,
                signup, 
                signInWithEmailAndPassword, 
                handleSetLoadingMessage, 
                updateUserProfile, 
                getAdminStatus, 
                addAdminCredentialToDatabase,
                reAuthenticateUser,
                updateAdminRank,
                deleteAdminRequest,
                checkIfAdminHasDatabaseRecord
            }}>
            {isAuthenticating ? <AuthenticatingLoading message={loadingMessage}/> : children}
        </AuthContext.Provider>
     )
}