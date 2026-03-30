import { useEffect } from "react"
import AppRouter from "./AppRouter"
import useAuth from "./features/auth/hooks/useAuth"

const App = () => {
  const { handlerGetMeAPI } = useAuth()

  useEffect(() => {
    handlerGetMeAPI()
  }, [])

  return (
    <div>
      <AppRouter />
    </div>
  )
}

export default App
