import { SubscriptionCheckout } from "@/components/ux/formgoogle/SuscribetComponent"
import { GoogleOAuthProvider } from "@react-oauth/google"

 
const LoginPage = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} ><SubscriptionCheckout/></GoogleOAuthProvider >
  )
}

export default LoginPage