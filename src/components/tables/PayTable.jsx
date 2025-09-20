function PayTable({ headers, payments }) {
    return (
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 mt-6">
          <thead className="bg-blue-100 text-lg">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm">
            {payments.map((payment, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {payment.id}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {payment.fechaPago}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {payment.descripcion}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {`S/ ${payment.saldo.toFixed(2)}`}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {payment.metodoPago}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button className="text-blue-500 hover:underline">
                    {payment.accion}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default PayTable;
  