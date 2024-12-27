import { Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import App from "../App"
import Auth from "../components/Auth/Auth"

const AllRoutes = () => {
  return (
    <Suspense>
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/chart/:chartId" element={<App/>}/>
            <Route path="/auth" element={<Auth/>} />
            <Route path="/*" element={<Navigate to="/"/>}/>
        </Routes>
    </Suspense>
  )
}

export default AllRoutes
