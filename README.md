# 🚀 Advanced Distributed Ledger Tampering Detection System

## 📌 Project Overview

The **Advanced Distributed Ledger Tampering Detection System** is a web-based application that simulates a blockchain network with multiple nodes and detects tampering in real time.

This project demonstrates core blockchain concepts such as **immutability, decentralization, and data integrity**, while providing an interactive dashboard for visualization.


## 🎯 Aim

To design and develop a system that simulates a distributed ledger and detects tampered blocks using real-time validation techniques.



## 💡 Key Features

* 🌐 Multi-node blockchain simulation
* ➕ Block creation (transactions)
* ⚠️ Tampering functionality to simulate attacks
* ✅ Real-time validation of blocks
* 🔍 Only hacked blocks are highlighted (for clear visualization)
* 📊 Node validity status display
* 📈 Dashboard analytics (nodes, blocks, validity)
* 🧮 Integrity percentage calculation
* 🍩 Interactive doughnut chart (Chart.js)
* 🔄 Sync animation during updates
* 🔔 Toast notifications for user actions


## 🧠 Core Concepts Used

* Blockchain structure (Blocks + Hash + Previous Hash)
* SHA-256 Cryptographic Hashing
* Distributed Ledger Technology (DLT)
* Data Integrity & Immutability
* Tampering Detection Mechanism



## ⚙️ Tech Stack

### 🔹 Frontend
* HTML
* CSS
* JavaScript
* Chart.js

### 🔹 Backend
* Node.js
* Express.js

### 🔹 Security
* Crypto module (SHA-256 hashing)



## 🏗️ Project Structure

```
DLT-Tampering-Detection-System/
│
├── public/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│
├── server.js
├── blockchain.js
├── package.json
└── README.md




## 🔄 How It Works

1. System initializes multiple blockchain nodes
2. Each node contains a Genesis Block
3. User adds transactions → Blocks are added to all nodes
4. User can tamper any block (simulate attack)
5. System detects invalid blocks instantly
6. Dashboard updates with:

   * Valid/Invalid blocks
   * Node status
   * Integrity percentage
   * Graph visualization


## 🔐 Tampering Detection Logic

* If block data is modified → hash becomes invalid
* System checks:

  * Data integrity
  * Hash validity
* Only tampered blocks are highlighted for clarity



## 📊 Output Visualization
* Real-time blockchain view
* Highlighted hacked blocks
* Doughnut chart (Valid vs Invalid blocks)
* Integrity percentage indicator

## ▶️ How to Run the Project

### Step 1: Clone Repository
git clone https://github.com/your-username/Advanced-Distributed-Ledger-Tampering-Detection-System.git


### Step 2: Install Dependencies
npm install


### Step 3: Run Server
node server.js


### Step 4: Open in Browser
http://localhost:3000

## 🎓 Use Cases
* Educational tool for blockchain learning
* Demonstration of tampering detection
* Cybersecurity awareness
* Academic mini / final year project



## 🚀 Future Scope
* AI-based anomaly detection
* Real blockchain integration (Ethereum / Hyperledger)
* User authentication system
* Cloud deployment (AWS / Render)
* Advanced consensus algorithms

