import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../fire-base/firebase.init";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [userC, setUserC] = useState();
    const auth = getAuth(app);

    const createUser = (email, password) =>{
        setIsLoading(true)
       return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) =>{
        setIsLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateState = (val) =>{
        setUserC(val)
    }

    const logOut = () =>{
        setIsLoading(true)
        return signOut(auth)
    }
    
    useEffect(() =>{
    const unsubscribe =   onAuthStateChanged(auth, currentUser =>{
        setIsLoading(true)
        setUserC(currentUser);
        setIsLoading(false)
      });

      return () => unsubscribe();
    },[])
    
    const authInfo = {
        createUser,
        isLoading, 
        updateState, 
        userC , 
        signIn , 
        logOut}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;