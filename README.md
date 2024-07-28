## v1

This code demonstrates the basic concepts of a blockchain, including block hash calculation, linkage between blocks, and blockchain validity verification.

## v2

This code demonstrates the basic concepts of a blockchain, including block hash calculation, linkage between blocks, blockchain validity verification, and the implementation of a proof-of-work mechanism.


```
Mining block 1...
Block mined: 000000f10ef3e1bc00898fc4cdccc967327bf707b52e5119a3c7ca68d3477253
Mining block 2...
Block mined: 00000007650814e68e59902a5450aa54221a04cc6a755baec5d5ecebeaf08242
Blockchain valid? true
[
    {
        "timestamp": "2024/07/28",
        "data": "Genesis block",
        "previousHash": "0",
        "hash": "7010d044d97b5bfe08c48e8833f8c4476fcd8635f1402f9e05c255fab1462ab8",
        "nonce": 0,
        "hasher": {}
    },
    {
        "timestamp": "2024/07/28",
        "data": {
            "amount": 4
        },
        "previousHash": "7010d044d97b5bfe08c48e8833f8c4476fcd8635f1402f9e05c255fab1462ab8",
        "hash": "000000f10ef3e1bc00898fc4cdccc967327bf707b52e5119a3c7ca68d3477253",
        "nonce": 8846102,
        "hasher": {}
    },
    {
        "timestamp": "2024/07/29",
        "data": {
            "amount": 8
        },
        "previousHash": "000000f10ef3e1bc00898fc4cdccc967327bf707b52e5119a3c7ca68d3477253",
        "hash": "00000007650814e68e59902a5450aa54221a04cc6a755baec5d5ecebeaf08242",
        "nonce": 3578555,
        "hasher": {}
    }
]
```

## v3

This code demonstrates the basic concepts of a blockchain, including block hash calculation, linkage between blocks, blockchain validity verification, implementation of a proof-of-work mechanism, and transaction processing with mining rewards.

```

Starting the miner...
Block mined: 00000ab026e52848dbd2bf49a1053cca8e243c8648641615572b8cff223a13cd

Balance of xavier is 100

Starting the miner again...
Block mined: 00000807e149e5cdc2455aeb18c38d0eea73bba81a0a419e207c67e30f404146

Balance of xavier is 200

{
  "chain": [
    {
      "timestamp": "2024/07/28",
      "transactions": [],
      "previousHash": "0",
      "hash": "7e59d83aefc02172daf5855dcc246cd80403459b32d7f5e6cbc0538bef379375",
      "nonce": 0,
      "hasher": {}
    },
    {
      "timestamp": "1722174035619",
      "transactions": [
        {
          "fromAddress": "address1",
          "toAddress": "address2",
          "amount": 100
        },
        {
          "fromAddress": "address2",
          "toAddress": "address1",
          "amount": 50
        },
        {
          "fromAddress": "",
          "toAddress": "miner-address",
          "amount": 100
        }
      ],
      "previousHash": "",
      "hash": "00000ab026e52848dbd2bf49a1053cca8e243c8648641615572b8cff223a13cd",
      "nonce": 710114,
      "hasher": {}
    },
    {
      "timestamp": "1722174036645",
      "transactions": [
        {
          "fromAddress": "",
          "toAddress": "miner-address",
          "amount": 100
        }
      ],
      "previousHash": "",
      "hash": "00000807e149e5cdc2455aeb18c38d0eea73bba81a0a419e207c67e30f404146",
      "nonce": 253325,
      "hasher": {}
    }
  ],
  "difficulty": 5,
  "mindReward": 100,
  "pendingTransactions": []
}
```