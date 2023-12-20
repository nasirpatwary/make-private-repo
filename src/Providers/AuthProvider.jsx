import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

export const AuthContex = createContext(null)
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const googlePrvider = new GoogleAuthProvider()
    const axiosPublic = UseAxiosPublic()

    const crateUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleSignIn = () =>{
        setLoading(true)
        return signInWithPopup(auth, googlePrvider)
    }

    

    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }

    const updateProFile = (name,photo) =>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
    }

    useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth, currentUser =>{
        setUser(currentUser)
        if (currentUser) {
            // get token and store client
            const userInfo = {email:currentUser.email}
            axiosPublic.post('/jwt', userInfo)
            .then(res =>{
                if (res.data.token) {
                    localStorage.setItem('access-token',res.data.token)
                    setLoading(false)
                }
            }) 
        }
        else{
            localStorage.removeItem('access-token')
            // TODO:remove token (if token stored in the client sitd: local storage, caching, in memory)
            setLoading(false)
        }
        
       })
       return () =>{
        return unSubscribe()
       } 
       
    },[axiosPublic])

    const authInfo ={
        user,
        loading,
        crateUser,
        signIn,
        googleSignIn,
        logOut,
        updateProFile
    }
    return (
        <AuthContex.Provider value={authInfo}>
            {children}
        </AuthContex.Provider>
    );
};

export default AuthProvider;