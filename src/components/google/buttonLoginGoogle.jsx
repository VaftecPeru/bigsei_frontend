import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/Utils/apiClient';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify'; // Asegúrate de tener instalado react-toastify

export default function LoginGoogle() {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;

    try {
      const response = await apiClient.post(
        'auth/google',
        { token: credential },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;

      if (data.success) {
        const token = data.token;
        const nameUser = data.user.nombreCompleto.split(' ').slice(0, 2).join(' ');
        const idUser = data.user.id_usuario;
        Cookies.set('token', token, { path: '/', secure: true, sameSite: 'strict' });
        Cookies.set('nombre', nameUser, { path: '/', secure: true, sameSite: 'strict' });
        Cookies.set('idUser', idUser, { path: '/', secure: true, sameSite: 'strict' });
        toast.success("Realizado.");
        setTimeout(() => {
          navigate('/');
        }, 700);
      } else {
        toast.error(data.message || 'No se pudo iniciar sesión');
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        'Error durante el inicio de sesión. Intenta nuevamente.';
      toast.error(errorMsg);
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={() => toast.error('Fallo el inicio de sesión con Google')}
    />
  );
}