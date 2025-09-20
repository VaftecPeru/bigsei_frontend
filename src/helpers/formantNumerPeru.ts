export function formatPhoneNumberPeru(phone: string): string {
   
    const cleanPhone = phone.replace(/\D/g, "");
   
    if (cleanPhone.length === 9 && cleanPhone.startsWith("9")) {
      return `${cleanPhone.slice(0, 3)} ${cleanPhone.slice(3, 6)} ${cleanPhone.slice(6)}`;
    }
  
    if (cleanPhone.length === 8 && cleanPhone.startsWith("1")) {
      return `(01) ${cleanPhone.slice(1, 4)}-${cleanPhone.slice(4)}`;
    }
 
    if (cleanPhone.length === 9) {
      return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 5)}-${cleanPhone.slice(5)}`;
    }
 
    return phone;
  }
  