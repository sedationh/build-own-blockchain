class Transaction {
  fromAddress: string;
  toAddress: string;
  amount: number;

  constructor(fromAddress: string, toAddress: string, amount: number) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block {
  timestamp: string;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  nonce = 0;

  hasher = new Bun.CryptoHasher("sha256");

  constructor(
    timestamp: string,
    transactions: Transaction[],
    previousHash = ""
  ) {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return this.hasher
      .update(this.timestamp)
      .update(JSON.stringify(this.transactions))
      .update(this.previousHash)
      .update(this.nonce.toString())
      .digest("hex");
  }

  mineBlock(difficulty: number): void {
    const target = Array(difficulty + 1).join("0");
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: " + this.hash);
  }
}

class Blockchain {
  chain: Block[] = [this.createGenesisBlock()];
  difficulty = 5;
  mindReward = 100;
  pendingTransactions: Transaction[] = [];

  constructor() {}

  createGenesisBlock(): Block {
    return new Block("2024/07/28", [], "0");
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock: Block): void {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  minePendingTransactions(miningRewardAddress: string): void {
    const newBlock = new Block(Date.now().toString(), this.pendingTransactions);
    this.pendingTransactions.push(
      new Transaction("", miningRewardAddress, this.mindReward)
    );

    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);

    this.pendingTransactions = [];
  }

  addTransaction(transaction: Transaction): void {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address: string): number {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
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
let myBlockchain = new Blockchain();
myBlockchain.addTransaction(new Transaction("address1", "address2", 100));
myBlockchain.addTransaction(new Transaction("address2", "address1", 50));

console.log("\nStarting the miner...");
myBlockchain.minePendingTransactions("miner-address");

console.log(
  "\nBalance of xavier is",
  myBlockchain.getBalanceOfAddress("miner-address")
);

console.log("\nStarting the miner again...");
myBlockchain.minePendingTransactions("miner-address");

console.log(
  "\nBalance of xavier is",
  myBlockchain.getBalanceOfAddress("miner-address")
);

console.log("\n" + JSON.stringify(myBlockchain, null, 2));
