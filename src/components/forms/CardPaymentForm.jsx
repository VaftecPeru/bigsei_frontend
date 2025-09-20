import { CreditCard, Calendar, User, Lock } from "lucide-react"
import SecureInput from "./custom/SecureInput"

const CardPaymentForm = ({ onChange, formData }) => (
  <div className="grid grid-cols-2 gap-4 w-full">
    {/* Número de tarjeta */}
    <SecureInput
      icon={CreditCard}
      type="text"
      name="cardNumber"
      placeholder="Número de tarjeta"
      value={formData.cardNumber}
      onChange={onChange}
      required
      pattern="^\d{16}$"
      errorMessage="El número de tarjeta debe tener 16 dígitos."
    />

    {/* Fecha de vencimiento */}
    <SecureInput
      icon={Calendar}
      type="text"
      name="expiryDate"
      placeholder="MM/AA"
      value={formData.expiryDate}
      onChange={onChange}
      required
      pattern="^(0[1-9]|1[0-2])\/\d{2}$"
      errorMessage="El formato debe ser MM/AA."
    />

    {/* Nombres y apellidos */}
    <SecureInput
      icon={User}
      type="text"
      name="cardHolder"
      placeholder="Nombres y apellidos"
      value={formData.cardHolder}
      onChange={onChange}
      required
    />

    {/* CVV */}
    <SecureInput
      icon={Lock}
      type="text"
      name="cvv"
      placeholder="CVV"
      value={formData.cvv}
      onChange={onChange}
      required
      pattern="^\d{3}$"
      errorMessage="El CVV debe tener 3 dígitos."
    />
  </div>
)

export default CardPaymentForm
