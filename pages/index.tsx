import { ethers, utils } from 'ethers'
import { GetStaticProps } from 'next'
import { ipfsImage } from '@lib/helpers'
import abi from '@lib/ERC721Drop-abi.json'
import metadataAbi from '@lib/MetadataRenderer-abi.json'
import metadataRendererAbi from '@lib/MetadataRenderer-abi.json'
import getDefaultProvider from '@lib/getDefaultProvider'
import { allChains } from 'wagmi'
import HomePage from '@components/HomePage/HomePage'
import getErc721Drop from '@lib/getErc721Drop'

const MintPage = ({ collection, chainId }) => (
  <HomePage collection={collection} chainId={chainId} />
)
export default MintPage

export const getServerSideProps: GetStaticProps = async (context) => {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  if (!utils.isAddress(contractAddress.toString())) {
    return {
      notFound: true,
    }
  }

  // Create Ethers Contract
  const chain = allChains.find((chain) => chain.id.toString() === chainId)
  const provider = getDefaultProvider(chain.network, chainId)
  const contract = new ethers.Contract(contractAddress.toString(), abi, provider)

  // Get metadata renderer
  try {
    const metadataRendererAddress = await contract.metadataRenderer()
    const metadataRenderer = new ethers.Contract(
      metadataRendererAddress,
      metadataAbi,
      provider
    )
    const base = await metadataRenderer.metadataBaseByContract(contractAddress.toString())
    const uri = base.base
    const metadataURI = ipfsImage(uri)
    const axios = require('axios').default
    const { data: metadata } = await axios.get(metadataURI)

    const salesConfig = await contract.salesConfig()
    const price = salesConfig.publicSalePrice
    const maxSalePurchasePerAddress = salesConfig.maxSalePurchasePerAddress
    const totalSupply = await contract.totalSupply()
    const config = await contract.config()
    const maxSupply = config.editionSize

    const erc721Drop = getErc721Drop(
      contractAddress,
      metadata,
      price,
      maxSalePurchasePerAddress,
      totalSupply,
      maxSupply
    )

    return {
      props: { collection: erc721Drop, chainId: chain.id },
    }
  } catch (error) {
    console.error(error)
    return {
      props: { collection: {}, chainId: chain.id },
    }
  }
}
