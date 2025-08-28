"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, X } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export function CartNotification() {
  const { state, dispatch } = useCart()

  const handleClose = () => {
    dispatch({ type: "HIDE_NOTIFICATION" })
  }

  return (
    <AnimatePresence>
      {state.notification && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.3 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-4 right-4 z-50 bg-white border border-sage-200 rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-sm"
        >
          <div className="flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-sage-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{state.notification}</p>
          </div>
          <button onClick={handleClose} className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
