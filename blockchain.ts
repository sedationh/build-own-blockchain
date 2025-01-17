import { ec as EC } from "elliptic";

export const ec = new EC("secp256k1");

export const hasher = new Bun.CryptoHasher("sha256");

export class Transaction {
  fromAddress: string;
  toAddress: string;
  amount: number;
  timestamp: number;
  signature?: string;

  constructor(fromAddress: string, toAddress: string, amount: number) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.timestamp = Date.now();
  }

  calculateHash() {
    return hasher
      .update(this.fromAddress)
      .update(this.toAddress)
      .update(this.amount.toString())
      .update(this.timestamp.toString())
      .digest("hex");
  }

  sign(signingKey: EC.KeyPair) {
    if (signingKey.getPublic("hex") !== this.fromAddress) {
      throw new Error("You cannot sign transactions for other wallets!");
    }

    const hashTx = this.calculateHash();
    const sig = signingKey.sign(hashTx, "base64");
    this.signature = sig.toDER("hex");
  }

  isValid(): boolean {
    // If the transaction doesn't have a from address we assume it's a
    // mining reward and that it's valid. You could verify this in a
    // different way (special field for instance)
    if (!this.fromAddress) return true;

    if (!this.signature) {
      throw new Error("No signature in this transaction");
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}

export class Block {
  timestamp: string;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  nonce = 0;

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
    return hasher
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

  hasValidTransactions() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }

    return true;
  }
}

export class Blockchain {
  chain: Block[] = [this.createGenesisBlock()];
  difficulty = 5;
  mindReward = 100;
  pendingTransactions: Transaction[] = [];

  createGenesisBlock(): Block {
    return new Block("2024/07/28", [], "0");
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
    // user transaction need fromAddress and toAddress
    if (transaction.fromAddress === "" || transaction.toAddress === "") {
      throw new Error("Transaction must include a valid from and to address.");
    }

    if (!transaction.isValid()) {
      throw new Error("Invalid transaction");
    }

    if (transaction.amount < 0) {
      throw new Error("Amount must be positive");
    }

    const walletBalance = this.getBalanceOfAddress(transaction.fromAddress);
    if (walletBalance < transaction.amount) {
      throw new Error("Not enough balance");
    }

    const pendingTxForWallet = this.pendingTransactions.filter(
      (tx) => tx.fromAddress === transaction.fromAddress
    );

    if (pendingTxForWallet.length > 0) {
      const totalPendingAmount = pendingTxForWallet
        .map((tx) => tx.amount)
        .reduce((prev, curr) => prev + curr);

      const totalAmount = totalPendingAmount + transaction.amount;
      if (totalAmount > walletBalance) {
        throw new Error(
          "Pending transactions for this wallet is higher than its balance."
        );
      }
    }

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

      if (!currentBlock.hasValidTransactions()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}
