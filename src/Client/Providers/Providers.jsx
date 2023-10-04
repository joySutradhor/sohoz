import  { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
// import { app } from '../firebase/firebase.config';
import { app } from './../firebase/firebase.config';




export const AuthContext = createContext(null);

const auth = getAuth(app)
const provider = new GoogleAuthProvider() ;

// eslint-disable-next-line react/prop-types
const AuthProviders = ({children}) => {

    const [user , setUser] = useState(null) ;
    const [loading , setLoading] = useState(true) ;

    const handleRegisterUser = (email , password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth , email , password)
    }

    const handleloginUser =(email , password) =>{
        setLoading(true)
        return signInWithEmailAndPassword (auth , email , password)
    }

    const handleUpdateProfile = (name , photo) => {
       return updateProfile(auth.currentUser , {
            displayName : name , photoURL : photo 
        })
    }

    const handleGoogle = () => {
        return signInWithPopup(auth , provider)
    }

    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect( () => {
        const unsubsribe = onAuthStateChanged(auth , loggedUser => {
            setUser(loggedUser)
            setLoading(false)
        })
        return () => {
            unsubsribe() ;
        }
    } )
  

    const authInfo = {
        user,
        loading ,
        handleRegisterUser,
        handleloginUser ,
        handleUpdateProfile,
        logout ,
        handleGoogle,
        
    } ;
    return (
        <AuthContext.Provider value={authInfo}>
           {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;