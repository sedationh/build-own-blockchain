import { Blockchain, ec, Transaction } from "./blockchain";

// 使用示例
const myKey = ec.keyFromPrivate(
  "7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf"
);

const myWalletAddress = myKey.getPublic("hex");

// 使用示例
const myBlockchain = new Blockchain();

myBlockchain.minePendingTransactions(myWalletAddress);

const tx1 = new Transaction(myWalletAddress, "address2", 100);
tx1.sign(myKey);
myBlockchain.addTransaction(tx1);

myBlockchain.minePendingTransactions(myWalletAddress);

const tx2 = new Transaction(myWalletAddress, "address1", 50);
tx2.sign(myKey);
myBlockchain.addTransaction(tx2);
myBlockchain.minePendingTransactions(myWalletAddress);

console.log(
  "\nBalance of myWalletAddress is",
  myBlockchain.getBalanceOfAddress(myWalletAddress)
);
