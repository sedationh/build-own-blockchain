import { expect, test, mock } from "bun:test";
import { ec as EC } from "elliptic";
import { Transaction } from "../blockchain";

const ec = new EC("secp256k1");
const myKey = ec.keyFromPrivate(
  "7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf"
);

const publicKey = myKey.getPublic("hex");
const privateKey = myKey.getPrivate("hex");

test("Transaction constructor", () => {
  const transaction = new Transaction(publicKey, "toAddress", 10);

  expect(transaction.fromAddress).toBe(publicKey);
  expect(transaction.toAddress).toBe("toAddress");
  expect(transaction.amount).toBe(10);
  expect(transaction.timestamp).not.toBeNaN();
});

test("sign and isValid", () => {
  const transaction = new Transaction(publicKey, "toAddress", 10);
  transaction.sign(myKey);

  expect(transaction.signature).toBeDefined();
  expect(transaction.isValid()).toBe(true);
});

test("isValid without signature", () => {
  const transaction = new Transaction(publicKey, "toAddress", 10);

  try {
    transaction.isValid();
    // 不要执行到这里
    throw new Error("Expected error was not thrown");
  } catch (error: any) {
    expect(error.message).toBe("No signature in this transaction");
  }
});

test("sign with invalid key", () => {
  const anotherKey = ec.genKeyPair();
  const transaction = new Transaction(publicKey, "toAddress", 10);

  try {
    transaction.sign(anotherKey);
    throw new Error("Expected error was not thrown");
  } catch (error: any) {
    // Error 这里再看看如何写
    expect(error.message).toBe(
      "You cannot sign transactions for other wallets!"
    );
  }
});

test("isValid for mining reward", () => {
  const transaction = new Transaction("", "toAddress", 10);
  expect(transaction.isValid()).toBe(true);
});
