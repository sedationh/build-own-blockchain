class Block {
  timestamp: string;
  data: any;
  previousHash: string;
  hash: string;
  nonce = 0;

  hasher = new Bun.CryptoHasher("sha256");

  constructor(timestamp: string, data: any, previousHash = "") {
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return this.hasher
      .update(this.timestamp)
      .update(JSON.stringify(this.data))
      .update(this.previousHash)
      .digest("hex");
  }
}

class Blockchain {
  chain: Block[] = [this.createGenesisBlock()];
  difficulty = 2;

  constructor() {}

  createGenesisBlock(): Block {
    return new Block("2024/07/28", "Genesis block", "0");
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock: Block): void {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

// 使用示例
const myBlockchain = new Blockchain();
console.log("Mining block 1...");
myBlockchain.addBlock(new Block("2024/07/28", { amount: 4 }));

console.log("Mining block 2...");
myBlockchain.addBlock(new Block("2024/07/29", { amount: 8 }));

console.log("Blockchain valid?", myBlockchain.isChainValid());
console.log(JSON.stringify(myBlockchain.chain, null, 4));
