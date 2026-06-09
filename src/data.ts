import { Project, SkillItem } from "./types";

export const PORTFOLIO_OWNER = {
  name: "Manash Harsh",
  role: "B.Tech CSE (AI & ML) Student • 2nd Year",
  email: "manashharsh2243@gmail.com",
  linkedin: "linkedin.com/in/manash-harsh-ba43a536b",
  phone: "+91 8210320025",
  university: "Jaypee University of Information Technology",
  location: "Solan, Himachal Pradesh",
  resumeUrl: "#", // will trigger a modal/print sheet
};

export const PROJECTS: Project[] = [
  {
    id: "supermarket-billing",
    title: "Supermarket Billing System",
    description: "Developed a console-based supermarket billing system using C++. Implemented product selection, quantity input, price calculation, and automated bill generation. Utilized complex loops, conditional statements, and arrays.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOVSBnfdE93UZ-r4vkoRUNWUxHEJtOPchQOLQH1BVG0m438XOGTUQUAJi7byzihXemJuHMY41Cz68jYc7ny6YdtDyXgK215OpPw74QRY9U3SZBnU8f_r0TBAB8tV7RqWyC4Y6cY6tUU1RUpvzbutbTYKEGW2-OBpbu8KzLbMAcZh6J5VJ0MUbaup4Nqs7OG9CVfEpFyUJokWkuNrpZgySdCTFrZEZ-H_DEPm_7NhG1uo-KRvlUGkik31tYS9w4dJMlix8BhCzcVA8",
    tech: ["C++", "Console UI", "Algorithms", "File Streams"],
    codeUrl: "#code",
    demoUrl: "#demo",
    fullCodeSnippet: `// ============================================================================
// PROJECT: SUPERMARKET BILLING SYSTEM (Console Edition)
// AUTHOR: Manash Harsh
// LANGUAGE: C++
// JUIT • Solan, Himachal Pradesh 
// ============================================================================

#include <iostream>
#include <vector>
#include <string>
#include <iomanip>

using namespace std;

struct Item {
    int id;
    string name;
    double price;
    int quantity;
};

class SupermarketBilling {
private:
    vector<Item> inventory;
    vector<Item> cart;

public:
    SupermarketBilling() {
        // Initialize default stock/inventory
        inventory.push_back({101, "Whole Milk 1L", 45.00, 50});
        inventory.push_back({102, "Brown Bread 400g", 35.00, 30});
        inventory.push_back({103, "Oats Oats Oats 1kg", 180.00, 20});
        inventory.push_back({104, "Basmati Rice 5kg", 450.00, 15});
        inventory.push_back({105, "Organic Honey 500g", 220.00, 25});
    }

    void displayInventory() {
        cout << "\\n" << setfill('=') << setw(60) << "=" << endl;
        cout << setfill(' ');
        cout << "  " << left << setw(10) << "Code" 
             << left << setw(25) << "Item Name" 
             << left << setw(12) << "Price (Rs)" 
             << "Stock Ava" << endl;
        cout << setfill('-') << setw(60) << "-" << endl;
        cout << setfill(' ');

        for (const auto& item : inventory) {
            cout << "  " << left << setw(10) << item.id 
                 << left << setw(25) << item.name 
                 << "Rs " << left << setw(12) << fixed << setprecision(2) << item.price 
                 << item.quantity << endl;
        }
        cout << setfill('=') << setw(60) << "=" << endl;
    }

    Item* findInventoryItem(int code) {
        for (auto& item : inventory) {
            if (item.id == code) return &item;
        }
        return nullptr;
    }

    void addToCart(int code, int qty) {
        Item* item = findInventoryItem(code);
        if (!item) {
            cout << "[Error] Item Code not found! Please check inventory.\\n";
            return;
        }

        if (item->quantity < qty) {
            cout << "[Error] Out of stock! Only " << item->quantity << " available.\\n";
            return;
        }

        // Deduct from Stock & Add to Cart
        item->quantity -= qty;
        cart.push_back({item->id, item->name, item->price, qty});
        cout << "[Success] Added " << qty << " x " << item->name << " to cart.\\n";
    }

    void generateBill() {
        if (cart.empty()) {
            cout << "[Warning] Your shopping cart is empty!\\n";
            return;
        }

        double subtotal = 0;
        double taxRate = 0.05; // 5% GST

        cout << "\\n\\n" << setfill('*') << setw(65) << "*" << endl;
        cout << "             SUPERMARKET BILLING INVOICE (C++ v1.0)               " << endl;
        cout << "                   MANASH HARSH - Portfolio                       " << endl;
        cout << setfill('*') << setw(65) << "*" << endl;
        cout << setfill(' ');
        
        cout << "\\n" << left << setw(25) << "Item Name" 
             << right << setw(10) << "Price" 
             << right << setw(10) << "Qty" 
             << right << setw(15) << "Total (Rs)" << endl;
        cout << setfill('-') << setw(65) << "-" << endl;
        cout << setfill(' ');

        for (const auto& item : cart) {
            double lineTotal = item.price * item.quantity;
            subtotal += lineTotal;
            cout << left << setw(25) << item.name 
                 << right << setw(10) << fixed << setprecision(2) << item.price 
                 << right << setw(10) << item.quantity 
                 << right << setw(15) << lineTotal << endl;
        }

        double tax = subtotal * taxRate;
        double grandTotal = subtotal + tax;

        cout << setfill('-') << setw(65) << "-" << endl;
        cout << setfill(' ');
        cout << right << setw(50) << "Subtotal: Rs " << fixed << setprecision(2) << subtotal << endl;
        cout << right << setw(50) << "Tax (5% GST): Rs " << fixed << setprecision(2) << tax << endl;
        cout << setfill('=') << setw(65) << "=" << endl;
        cout << setfill(' ');
        cout << "  " << right << setw(46) << "GRAND TOTAL: Rs " << fixed << setprecision(2) << grandTotal << endl;
        cout << setfill('=') << setw(65) << "=" << endl;
        cout << "\\n        Thank you for shopping with us! Have a wonderful day.\\n\\n";
    }

    void clearCart() {
        cart.clear();
    }
};

int main() {
    SupermarketBilling market;
    int choice;
    
    cout << "=================================================\\n";
    cout << "    Welcome to the Supermarket Management System \\n";
    cout << "=================================================\\n";
    
    do {
        cout << "1. Display Available Products\\n";
        cout << "2. Add Product to Shopping Cart\\n";
        cout << "3. Generate Bill Receipt & Checkout\\n";
        cout << "4. Exit System\\n";
        cout << "Enter your choice (1-4): ";
        cin >> choice;

        switch (choice) {
            case 1:
                market.displayInventory();
                break;
            case 2: {
                int code;
                int qty;
                cout << "Enter Product ID Code: ";
                cin >> code;
                cout << "Enter Quantity: ";
                cin >> qty;
                market.addToCart(code, qty);
                break;
            }
            case 3:
                market.generateBill();
                break;
            case 4:
                cout << "Exiting system. Goodbye!\\n";
                break;
            default:
                cout << "Invalid choice! Please choose between 1 and 4.\\n";
        }
        cout << "\\n";
    } while (choice != 4);

    return 0;
}`,
  },
  {
    id: "ai-placement-copilot",
    title: "AI Placement Co-Pilot",
    description: "An intelligent career and placement preparation platform tailored for students. Features automated resume analysis, personalized mock interview simulations, and AI-driven skill gap assessments to guide employment readiness.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    tech: ["Next.js", "Gemini AI", "Tailwind CSS", "Vercel", "TypeScript"],
    codeUrl: "#",
    demoUrl: "https://placement-copilot-seven.vercel.app/",
  },
  {
    id: "juit-ai-assistant",
    title: "JUIT AI Assistant",
    description: "An interactive, LLM-powered assistant optimized for academic and research workflows at Jaypee University of Information Technology. Streamlines query-resolution, research search, and local JUIT information aggregation.",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    tech: ["Python", "Streamlit", "LangChain", "RAG", "Google Gemini"],
    codeUrl: "#",
    demoUrl: "https://juit-research-assistant-7er7bchpfx6yzcufsieu6n.streamlit.app/",
  },
  {
    id: "personal-portfolio",
    title: "Personal Portfolio Website",
    description: "A highly-polished interactive React developer portfolio showcasing projects, academic accomplishments, and a printable custom-themed PDF resume. Features dynamic in-app source-code modal viewer, real-time client-side profile photo uploading with persistence, and rich micro-interactions.",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    codeUrl: "#",
    demoUrl: "#",
  },
];

export const TECHNICAL_SKILLS: SkillItem[] = [
  { name: "C / C++ Programming", percentage: 85 },
  { name: "Data Structures & Algo", percentage: 70 },
  { name: "Git & Version Control", percentage: 60 },
];
