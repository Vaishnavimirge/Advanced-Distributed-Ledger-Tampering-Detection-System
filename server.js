const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const PORT = 3000;

// Block
class Block {
  constructor(index, data, prevHash) {
    this.index = index;
    this.timestamp = new Date().toLocaleString();
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(this.index + this.timestamp + this.data + this.prevHash)
      .digest("hex");
  }
}

// Blockchain
class Blockchain {
  constructor() {
    this.chain = [this.createGenesis()];
  }

  createGenesis() {
    return new Block(0, "Genesis Block", "0");
  }

  addBlock(data) {
    const prev = this.chain[this.chain.length - 1];
    const newBlock = new Block(this.chain.length, data, prev.hash);
    this.chain.push(newBlock);
  }

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const curr = this.chain[i];
      const prev = this.chain[i - 1];

      if (curr.hash !== curr.calculateHash()) return false;
      if (curr.prevHash !== prev.hash) return false;
    }
    return true;
  }
}

// Create nodes
function createNodes() {
  return [
    { id: 1, chain: new Blockchain() },
    { id: 2, chain: new Blockchain() },
    { id: 3, chain: new Blockchain() }
  ];
}

let nodes = createNodes();

// Routes
app.post("/add", (req, res) => {
  const { data } = req.body;
  nodes.forEach(n => n.chain.addBlock(data));
  res.send("Added");
});

app.get("/nodes", (req, res) => {
  res.json(nodes.map(n => ({
    id: n.id,
    chain: n.chain.chain,
    valid: n.chain.isValid()
  })));
});

app.post("/tamper", (req, res) => {
  const { nodeId, index } = req.body;
  const node = nodes.find(n => n.id === nodeId);

  if (node && node.chain.chain[index]) {
    node.chain.chain[index].data = "HACKED!";
    node.chain.chain[index].hash = "INVALID_HASH";
  }

  res.send("Tampered");
});

app.post("/reset", (req, res) => {
  nodes = createNodes();
  res.send("Reset Done");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});