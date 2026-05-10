import { useState } from "react";
import { Printer, Send } from "lucide-react";

const invoiceData = {
  from: {
    name: "Virginia Walker",
    address: "9694 Krajcik Locks Suite 635",
  },
  to: {
    name: "Austin Miller",
    address: "Brookview",
  },
  invoiceDate: "12 Nov 2019",
  dueDate:     "25 Dec 2019",
  items: [
    { id: 1, description: "Children Toy", quantity: 2,  baseCost: 20,   totalCost: 80   },
    { id: 2, description: "Makeup",       quantity: 2,  baseCost: 50,   totalCost: 100  },
    { id: 3, description: "Asus Laptop",  quantity: 5,  baseCost: 100,  totalCost: 500  },
    { id: 4, description: "Iphone X",     quantity: 4,  baseCost: 1000, totalCost: 4000 },
  ],
};

const total = invoiceData.items.reduce((sum, item) => sum + item.totalCost, 0);

export default function Invoice() {
  const [sent, setSent] = useState(false);

  const handlePrint = () => window.print();

  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <section className="p-4 lg:p-6 space-y-5">
      <h1 className="text-2xl font-bold text-gray-800">Invoice</h1>

      {/* Invoice Card */}
      <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-10 space-y-8">

        {/* ── Header: From / To / Dates ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Invoice From */}
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Invoice From :</p>
            <p className="font-bold text-gray-800 text-base">{invoiceData.from.name}</p>
            <p className="text-sm text-gray-500">{invoiceData.from.address}</p>
          </div>

          {/* Invoice To */}
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Invoice To :</p>
            <p className="font-bold text-gray-800 text-base">{invoiceData.to.name}</p>
            <p className="text-sm text-gray-500">{invoiceData.to.address}</p>
          </div>

          {/* Dates */}
          <div className="space-y-2 md:text-right">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Invoice Date :</span> {invoiceData.invoiceDate}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Due Date :</span> {invoiceData.dueDate}
            </p>
          </div>
        </div>

        {/* ── Items Table ── */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 rounded-xl">
                <th className="text-center font-semibold text-gray-700 px-5 py-3.5 first:rounded-l-xl">
                  Serial No.
                </th>
                <th className="text-center font-semibold text-gray-700 px-5 py-3.5">
                  Description
                </th>
                <th className="text-center font-semibold text-gray-700 px-5 py-3.5">
                  Quantity
                </th>
                <th className="text-center font-semibold text-gray-700 px-5 py-3.5">
                  Base Cost
                </th>
                <th className="text-center font-semibold text-gray-700 px-5 py-3.5 last:rounded-r-xl">
                  Total Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, i) => (
                <tr
                  key={item.id}
                  className={`border-b border-gray-50 hover:bg-gray-50 transition-colors
                    ${i === invoiceData.items.length - 1 ? "border-b-2 border-gray-100" : ""}`}
                >
                  <td className="text-center text-gray-700 px-5 py-4">{item.id}</td>
                  <td className="text-center text-gray-700 px-5 py-4">{item.description}</td>
                  <td className="text-center text-gray-700 px-5 py-4">{item.quantity}</td>
                  <td className="text-center text-gray-700 px-5 py-4">${item.baseCost.toLocaleString()}</td>
                  <td className="text-center text-gray-700 px-5 py-4 font-medium">${item.totalCost.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Total ── */}
        <div className="flex justify-end">
          <div className="flex items-center gap-4">
            <span className="text-base font-bold text-gray-800">Total</span>
            <span className="text-base font-bold text-gray-500">=</span>
            <span className="text-xl font-bold text-blue-500">
              ${total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex items-center justify-end gap-3">
          {/* Print */}
          <button
            onClick={handlePrint}
            className="w-11 h-11 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Printer size={18} className="text-gray-600" />
          </button>

          {/* Send */}
          <button
            onClick={handleSend}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors shadow-sm
              ${sent ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
          >
            {sent ? "Sent!" : "Send"}
            <Send size={15} className="text-white" />
          </button>
        </div>

      </div>
    </section>
  );
}