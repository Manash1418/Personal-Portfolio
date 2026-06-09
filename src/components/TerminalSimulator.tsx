import React, { useState, useRef, useEffect } from "react";
import { Terminal, RefreshCw, ShoppingCart, Play, CheckCircle2, AlertTriangle, Cpu, Command, X } from "lucide-react";

interface TerminalSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function TerminalSimulator({ isOpen, onClose }: TerminalSimulatorProps) {
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "// Host: JUIT JAYPEE ARCH LINUX DEPLOY",
    "// Compiling system using gcc v13.2.0...",
    "// Compilation finished successfully in 0.082s.",
    "// Launching process 'supermarket_billing_system'...",
    "",
    "=================================================",
    "    Welcome to the Supermarket Management System ",
    "=================================================",
    "1. Display Available Products",
    "2. Add Product to Shopping Cart",
    "3. Generate Bill Receipt & Checkout",
    "4. Exit System",
    "",
    "Ready for commands. Use the interactive panel below."
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [billGenerated, setBillGenerated] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Default mock inventory
  const [stock, setStock] = useState([
    { id: 101, name: "Whole Milk 1L", price: 45.00, quantity: 50 },
    { id: 102, name: "Brown Bread 400g", price: 35.00, quantity: 30 },
    { id: 103, name: "Oats Oats Oats 1kg", price: 180.00, quantity: 20 },
    { id: 104, name: "Basmati Rice 5kg", price: 450.00, quantity: 15 },
    { id: 105, name: "Organic Honey 500g", price: 220.00, quantity: 25 }
  ]);

  useEffect(() => {
    // Scroll to bottom of terminal when logs update
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleLogs]);

  if (!isOpen) return null;

  const appendLogs = (lines: string[]) => {
    setConsoleLogs((prev) => [...prev, ...lines]);
  };

  const handleDisplayInventory = () => {
    const lines = [
      "Choice selected: 1",
      "",
      "============================================================",
      "  Code      Item Name                Price (Rs)  Stock",
      "------------------------------------------------------------",
      ...stock.map(
        (item) =>
          `  ${item.id}       ${item.name.padEnd(25)}Rs ${item.price.toFixed(2).padEnd(12)}${item.quantity}`
      ),
      "============================================================",
      ""
    ];
    appendLogs(lines);
  };

  const handleAddToCart = (id: number, orderQty: number) => {
    const stockItem = stock.find((item) => item.id === id);
    if (!stockItem) {
      appendLogs([`Choice selected: 2`, `[Error] Item Code ${id} not found in inventory.`, ""]);
      return;
    }

    if (stockItem.quantity < orderQty) {
      appendLogs([
        `Choice selected: 2`,
        `[Error] Insufficient stock. Only ${stockItem.quantity} units of '${stockItem.name}' available.`,
        ""
      ]);
      return;
    }

    // Deduct stock
    setStock((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity - orderQty } : item))
    );

    // Add to cart state
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + orderQty } : item
        );
      } else {
        return [...prev, { id, name: stockItem.name, price: stockItem.price, quantity: orderQty }];
      }
    });

    setBillGenerated(false);
    appendLogs([
      `Choice selected: 2`,
      `>> Select code: ${id}`,
      `>> Quantity: ${orderQty}`,
      `[Success] Added ${orderQty} x ${stockItem.name} to checkout cart.`,
      ""
    ]);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      appendLogs([
        "Choice selected: 3",
        "[Warning] Your shopping cart is empty! Add products before checking out.",
        ""
      ]);
      return;
    }

    let subtotal = 0;
    const itemsLines = cart.map((item) => {
      const lineCost = item.price * item.quantity;
      subtotal += lineCost;
      return `${item.name.padEnd(25)}Rs ${item.price.toFixed(2).padStart(8)}  x ${String(item.quantity).padEnd(2)}  Rs ${lineCost.toFixed(2).padStart(12)}`;
    });

    const tax = subtotal * 0.05; // 5% GST
    const grand = subtotal + tax;

    const lines = [
      "Choice selected: 3",
      "",
      "*****************************************************************",
      "             SUPERMARKET BILLING INVOICE (C++ v1.0)               ",
      "                   MANASH HARSH - Portfolio                       ",
      "*****************************************************************",
      "",
      "Item Name                Price      Qty  Line Total (Rs)         ",
      "-----------------------------------------------------------------",
      ...itemsLines,
      "-----------------------------------------------------------------",
      `Subtotal:                                       Rs ${subtotal.toFixed(2).padStart(10)}`,
      `Tax (5% GST):                                   Rs ${tax.toFixed(2).padStart(10)}`,
      "=================================================================",
      `  GRAND TOTAL:                                  Rs ${grand.toFixed(2).padStart(10)}`,
      "=================================================================",
      "",
      "        Thank you for shopping with us! Have a wonderful day.    ",
      ""
    ];

    setBillGenerated(true);
    appendLogs(lines);
  };

  const handleReset = () => {
    // Reset stocks and cart
    setStock([
      { id: 101, name: "Whole Milk 1L", price: 45.00, quantity: 50 },
      { id: 102, name: "Brown Bread 400g", price: 35.00, quantity: 30 },
      { id: 103, name: "Oats Oats Oats 1kg", price: 180.00, quantity: 20 },
      { id: 104, name: "Basmati Rice 5kg", price: 450.00, quantity: 15 },
      { id: 105, name: "Organic Honey 500g", price: 220.00, quantity: 25 }
    ]);
    setCart([]);
    setBillGenerated(false);
    setConsoleLogs([
      "// Resetting simulated console kernel environment...",
      "=================================================",
      "    Welcome to the Supermarket Management System ",
      "=================================================",
      "1. Display Available Products",
      "2. Add Product to Shopping Cart",
      "3. Generate Bill Receipt & Checkout",
      "4. Exit System",
      "",
      "Local system restarted successfully."
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-[#0c1222] rounded-xl overflow-hidden border border-outline-variant/30 flex flex-col shadow-2xl">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-outline-variant/15 bg-[#080d1a]">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary animate-pulse" />
            <h3 className="text-xs font-mono font-bold text-on-surface">Interactive Sandbox Runtime: Main.exe</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="p-1.5 text-on-surface-variant hover:text-primary rounded hover:bg-surface-container transition-all cursor-pointer"
              title="Reset Sandbox Application State"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-on-surface-variant hover:text-on-surface rounded hover:bg-surface-container transition-all cursor-pointer"
              aria-label="Exit Sandbox runtime"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Console Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-grow overflow-hidden">
          
          {/* Output Display Area (Classic Dark Console) */}
          <div className="lg:col-span-8 bg-[#040813] p-4 md:p-6 overflow-y-auto flex flex-col font-mono text-xs md:text-sm text-green-400 border-r border-[#1e293b] select-all max-h-[400px] lg:max-h-none min-h-[250px]">
            <div className="flex-grow space-y-1">
              {consoleLogs.map((log, index) => (
                <div key={index} className="min-h-[1.5em] whitespace-pre-wrap break-words leading-relaxed select-text">
                  {log}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>

          {/* Interactive Input Dashboard / Command Center */}
          <div className="lg:col-span-4 bg-[#0a0f1d] p-6 flex flex-col gap-5 overflow-y-auto max-h-[350px] lg:max-h-none">
            <div>
              <h4 className="text-sm font-headline font-semibold text-on-surface">C++ Controller Dashboard</h4>
              <p className="text-[11px] text-on-surface-variant font-body">Interact with the code compiled in-memory.</p>
            </div>

            {/* Quick Action blocks */}
            <div className="space-y-4 flex-grow">
              
              {/* Option 1: Print Products */}
              <button
                onClick={handleDisplayInventory}
                className="w-full py-2.5 px-4 bg-[#111827] hover:bg-[#1f2937] border border-outline-variant/15 hover:border-primary/30 rounded text-left flex items-center justify-between text-xs font-mono text-on-surface-variant hover:text-primary transition-all cursor-pointer"
              >
                <span>1. View Available Stock</span>
                <span className="text-[10px] text-primary/70">Execute</span>
              </button>

              {/* Option 2: Add Products */}
              <div className="p-3.5 bg-surface-container rounded border border-outline-variant/10 space-y-2.5">
                <div className="flex items-center gap-1.5">
                  <ShoppingCart className="w-3.5 h-3.5 text-secondary" />
                  <span className="text-xs font-mono font-bold text-on-surface">2. Cart Simulator</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {stock.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleAddToCart(item.id, 1)}
                      disabled={item.quantity <= 0}
                      className={`py-1.5 px-2 rounded border border-outline-variant/10 font-mono text-[10px] flex flex-col justify-between items-start transition-all ${
                        item.quantity <= 0
                          ? "bg-surface-container-high text-outline-variant/40 cursor-not-allowed"
                          : "bg-surface-container-low hover:bg-surface-container-high hover:border-secondary text-left text-on-surface hover:text-secondary cursor-pointer"
                      }`}
                    >
                      <span className="truncate w-full font-bold">{item.name}</span>
                      <span className="opacity-80">Rs {item.price} ({item.quantity} left)</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 3: Process Billing receipt */}
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className={`w-full py-3 px-4 rounded font-bold text-xs font-mono flex items-center justify-center gap-2 transition-all duration-300 ${
                  cart.length === 0
                    ? "bg-[#1f2937]/30 border border-outline-variant/10 text-outline-variant/50 cursor-not-allowed"
                    : "bg-primary text-on-primary hover:shadow-[0_0_15px_rgba(159,204,239,0.35)] cursor-pointer"
                }`}
              >
                <Command className="w-3.5 h-3.5" />
                <span>3. Checkout & Print Bill ({cart.reduce((s, c) => s + c.quantity, 0)} Items)</span>
              </button>

            </div>

            {/* Shopping Cart Summary inside Dashboard */}
            <div className="p-3 bg-surface-container-low/40 rounded border border-outline-variant/10 text-[11px] space-y-1.5 font-mono">
              <span className="text-outline-variant block">Cart Registry ({cart.length} unique)</span>
              {cart.length === 0 ? (
                <span className="text-outline-variant/40 italic block py-1">Cart is currently empty.</span>
              ) : (
                <div className="space-y-1 max-h-[100px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-on-surface-variant">
                      <span className="truncate max-w-[120px]">{item.name}</span>
                      <span>{item.quantity} x Rs {item.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
