const alchemyId = process.env.ALCHEMY_ID

export const chains = [
  {
    id: '1337',
    name: 'hardhat',
    testnet: false,
    rpcUrls: ['http://localhost:8545'],
  },
  {
    id: '1',
    name: 'Mainnet',
    rpcUrls: [`https://rpc.ankr.com/eth`],
  },
]
