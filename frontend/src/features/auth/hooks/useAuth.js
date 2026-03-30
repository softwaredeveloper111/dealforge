import  { useContext } from 'react'
import { authContextProvider } from "../auth.context";
import {  registerAPI, loginAPI,getMeAPI, logoutAPI } from "../services/auth.api";


const useAuth = () => {

 const {user,setUser,loading,setLoading ,isAuthChecked,setIsAuthChecked } =   useContext(authContextProvider)


 async function handlerLoginAPI(data){
   setLoading(true)
   try {
      
    const response = await loginAPI(data);
    setUser(response.data)
    return {success:true}

   } catch (error) {
    return {
      success:false,
      message:`${error.message} ❌ something went wrong `
    }
   }
   finally{
    setLoading(false)
   }
 }


  
 async function handlerRegisterAPI(data){
  setLoading(true)
  try {

    const response = await registerAPI(data);
    setUser(response.data);
    return {success:true}
    
  } catch (error) {
    return {
      success:false,
      message:`${error.message}, ❌ something went wrong`
    }
  }
  finally{
    setLoading(false);

  }
 }



 async function handlerGetMeAPI(){
  setLoading(true);
  try {
      
    const response = await getMeAPI();
    setUser(response.data);
    return {success:true};

  } catch (error) {
    return {
      success:false,
      message:`${error.message}❌ something went wrong`
    }
  }
  finally{
    setIsAuthChecked(true)
    setLoading(false)
  }
 }



 async function handlerLogoutAPI(){
  setLoading(true)
  try {
    await logoutAPI();
    setUser(null)
    return {success:true}
  } catch (error) {
    return {
      success:false,
      message:`${error.message} ❌ something went wrong`
    }
  }
  finally{
    setLoading(false)
  }
 }

 

  return (
     { handlerLoginAPI, handlerRegisterAPI ,handlerGetMeAPI , handlerLogoutAPI ,loading , user ,isAuthChecked  }
  )
}

export default useAuth