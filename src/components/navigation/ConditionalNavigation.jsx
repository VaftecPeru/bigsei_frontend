import { useLocation } from 'react-router-dom'
import Navigation from './Navigation'
import SimpleNavbar from './SimpleNavbar'
import SimpleFooter from './SimpleFooter'

function ConditionalNavigation({ children }) {
    const location = useLocation()
    const path = location.pathname

    const isLoginPage = path === "/login"
    const isNewStudentRegistrationPage = path.startsWith("/new-student/registration")
    const isNewStudentPage = path.startsWith("/student") && !isNewStudentRegistrationPage
    const isAdminPage = path.startsWith("/admin")

    if (isLoginPage) {
        return <>{children}</>
    }

    if (isNewStudentRegistrationPage) {
        return (
            <>
                <SimpleNavbar />
                <main className="flex-grow">{children}</main>
                <SimpleFooter />
            </>
        )
    }

    if (isNewStudentPage){
        return <Navigation>{children}</Navigation>
    }

    if (isAdminPage) {
        return (
            <Navigation>{children}</Navigation>
        )
    }

    return <>{children}</>;
}

export default ConditionalNavigation