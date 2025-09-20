import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

export const LoginComponent = () => {
  const login = useGoogleLogin({
    onSuccess: (response) => console.log("Login Exitoso:", response),
    onError: () => console.log("Error en el login"),
    prompt: "select_account",
  });

  return (
    <button
    className="w-full bg-black text-white py-3 px-4 rounded mb-4 flex items-center justify-center"
    onClick={() => login()}
  >
    <span className="text-2xl mr-2 font-bold">G</span> Pay
  </button>
  );
};