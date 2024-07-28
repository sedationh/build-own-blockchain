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