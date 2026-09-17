import { ShoppingCart } from "lucide-react";

// TODO: fetch seller's orders and render a real table here.
export default function SellerOrders() {
  const orders = [];

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">
          Sales
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
          Orders
        </h1>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_0_1px_rgba(15,23,42,0.05),0_12px_36px_-10px_rgba(15,23,42,0.16),0_2px_10px_rgba(15,23,42,0.06)] p-6 md:p-8">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
              <ShoppingCart size={24} className="text-slate-300" />
            </div>
            <p className="text-sm text-slate-400">No orders yet — they'll show up here</p>
          </div>
        ) : (
          <div>{/* TODO: map orders into a real table */}</div>
        )}
      </div>
    </div>
  );
}
