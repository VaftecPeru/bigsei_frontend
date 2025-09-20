import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog'

function ConfirmPayment({ open, onClose, handlePayment }) {
  return (
    <Dialog open={open} onClose={onClose}>
        <DialogContent className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">
                ¿Deseas confirmar el pago?
            </h2>
            <div className="flex justify-center space-x-4">
                <button
                    onClick={handlePayment}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Sí
                </button>
                <button
                    onClick={onClose}
                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
                >
                    No
                </button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ConfirmPayment