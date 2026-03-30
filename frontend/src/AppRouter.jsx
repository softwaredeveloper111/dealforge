import {Routes,Route} from "react-router-dom"
import Auth from "./features/auth/pages/Auth"
import Protected from "./features/shared/Protected"
import GuestRoute from "./features/shared/Guestroute"

const AppRouter = () => {
 return( 
  <Routes>


    <Route path="/"
     element={
    <Protected> 
     <h1>Home</h1>
    </Protected>
  }
     />
    <Route 




    path="/auth" 
    element={
      <GuestRoute>
    <Auth/>
    </GuestRoute>
  }
    />
  </Routes>
 )
}


export default AppRouter