import { alchemyId } from './constants'

const { ethers } = require('ethers')

const getDefaultProvider = (networkName, chainId) => {
  const polygonRpc = alchemyId
    ? `https://polygon-mainnet.g.alchemy.com/v2/${alchemyId}`
    : 'https://polygon-rpc.com'
  const mumbaiRpc = alchemyId
    ? `https://polygon-mumbai.g.alchemy.com/v2/${alchemyId}`
    : 'https://rpc-mumbai.maticvigil.com'

  const chainIdInt = parseInt(chainId?.toString())

  if (!chainId) return null
  if (networkName?.includes('matic')) {
    if (chainIdInt === 137) {
      return ethers.getDefaultProvider(polygonRpc)
    } else {
      return ethers.getDefaultProvider(mumbaiRpc)
    }
  }
  return ethers.getDefaultProvider({
    chainId: chainIdInt,
    name: networkName,
  })
}

export default getDefaultProvider
