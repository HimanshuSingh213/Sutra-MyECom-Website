import { useCart } from "./context/CartContext";

export default function CartModal({ open, onClose }) {
  const { cartItems, increaseQty, decreaseQty, removeFromCart, subtotal } = useCart();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-1000"
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 h-full w-[560px] bg-white shadow-xl transition-all p-6 flex flex-col"
        onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button
            className="text-gray-600 hover:bg-gray-100 rounded-full p-1"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="overflow-y-auto flex-1 py-4 space-y-4">
          {cartItems.length === 0 && (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}

          {cartItems.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 border rounded-xl hover:shadow-sm"
            >
              {/* Image */}
              <img
                src={item.poster}
                alt={item.title}
                className="h-24 w-20 object-cover rounded-md"
              />

              {/* Details */}
              <div className="flex flex-col justify-between flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.subtitle}</p>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeFromCart(item.title)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>

                {/* Qty + Price */}
                <div className="flex justify-between items-center">
                  <div className="flex border rounded-lg overflow-hidden">
                    <button
                      className="h-7 w-7 hover:bg-gray-100"
                      onClick={() => decreaseQty(item.title)}
                    >
                      -
                    </button>
                    <div className="h-7 w-7 flex items-center justify-center">
                      {item.qty}
                    </div>
                    <button
                      className="h-7 w-7 hover:bg-gray-100"
                      onClick={() => increaseQty(item.title)}
                    >
                      +
                    </button>
                  </div>

                  <p className="text-sm font-medium">₹{item.price * item.qty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t pt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <span>Shipping</span>
            <span>₹61</span>
          </div>

          <div className="flex justify-between text-sm text-gray-500 mb-3">
            <span>GST (18%)</span>
            <span>₹{(subtotal * 0.18).toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-lg font-semibold mb-4">
            <span>Total</span>
            <span>₹{Math.round(subtotal * 1.18 + 61)}</span>
          </div>

          <button className="w-full py-3 rounded-xl bg-[#f97316] text-white hover:bg-[#ea580c] font-medium">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
