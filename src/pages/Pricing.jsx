const plans = [
  {
    name: "Basic",
    price: "$14.99",
    features: [
      { text: "Free Setup",               active: true  },
      { text: "Bandwidth Limit 10 GB",    active: true  },
      { text: "20 User Connection",       active: true  },
      { text: "Analytics Report",         active: false },
      { text: "Public API Access",        active: false },
      { text: "Plugins Intregation",      active: false },
      { text: "Custom Content Management",active: false },
    ],
    highlight: false,
  },
  {
    name: "Standard",
    price: "$49.99",
    features: [
      { text: "Free Setup",               active: true  },
      { text: "Bandwidth Limit 10 GB",    active: true  },
      { text: "20 User Connection",       active: true  },
      { text: "Analytics Report",         active: true  },
      { text: "Public API Access",        active: true  },
      { text: "Plugins Intregation",      active: false },
      { text: "Custom Content Management",active: false },
    ],
    highlight: false,
  },
  {
    name: "Premium",
    price: "$89.99",
    features: [
      { text: "Free Setup",               active: true },
      { text: "Bandwidth Limit 10 GB",    active: true },
      { text: "20 User Connection",       active: true },
      { text: "Analytics Report",         active: true },
      { text: "Public API Access",        active: true },
      { text: "Plugins Intregation",      active: true },
      { text: "Custom Content Management",active: true },
    ],
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <section className="p-4 lg:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Pricing</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Top */}
            <div className="px-8 pt-8 pb-6 text-center border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-1">{plan.name}</h2>
              <p className="text-sm text-gray-400 mb-4">Monthly Charge</p>
              <p className="text-5xl font-bold text-blue-500">{plan.price}</p>
            </div>

            {/* Features */}
            <div className="flex-1 px-8 py-6 border-b border-gray-100">
              <ul className="space-y-4">
                {plan.features.map((f, i) => (
                  <li
                    key={i}
                    className={`text-center text-sm ${f.active ? "text-gray-700 font-medium" : "text-gray-300"}`}
                  >
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="px-8 py-6 flex flex-col items-center gap-3">
              <button
                className={`w-full py-3 rounded-full text-sm font-semibold transition-colors
                  ${plan.highlight
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "border-2 border-blue-500 text-blue-500 hover:bg-blue-50"}`}
              >
                Get Started
              </button>
              <button className="text-sm text-gray-700 font-semibold underline hover:text-blue-500 transition-colors">
                Start Your 30 Day Free Trial
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}