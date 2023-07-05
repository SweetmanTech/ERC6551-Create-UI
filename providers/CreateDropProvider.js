import React, { useContext, useState } from 'react'
import { useAccount, useNetwork, useSigner } from 'wagmi'
import { ethers } from 'ethers'
import getZoraNFTCreatorV1Address from '@lib/getZoraNFTCreatorV1Address'
import abi from '@lib/ZoraNFTCreatorV1-abi.json'
import { toast } from 'react-toastify'

export const CreateDropContext = React.createContext({})

export const CreateDropProvider = ({ children }) => {
  const { data: account } = useAccount()
  const { data: signer } = useSigner()
  const { activeChain } = useNetwork()
  const [name, setName] = useState('Wura, A Narrative')
  const [symbol, setSymbol] = useState('WURA')
  const [defaultAdmin, setDefaultAdmin] = useState(account?.address)
  const [musicMetadata, setMusicMetadata] = useState(account?.address)
  const [contractMetadata, setContractMetadata] = useState(
    'ipfs://bafkreif67d4hefyr5klirohzqnbed4ntgmjk6yjo2jdsnm7irrempwbxjm'
  )
  const [editionSize, setEditionSize] = useState(150)
  const [royaltyBps, setRoyaltyBps] = useState(300)
  const [lengthOfDrop, setLengthOfDrop] = useState(31)
  const [fundsRecipient, setFundsRecipient] = useState(account?.address)
  const [publicSalePrice, setPublicSalePrice] = useState('22200000000000000')
  const [maxSalePurchasePerAddress, setMaxSalePurchasePerAddress] = useState(0)
  const [publicSaleStart, setPublicSaleStart] = useState(Math.round(Date.now() / 1000))
  const [publicSaleEnd, setPublicSaleEnd] = useState(publicSaleStart + 60 * 60 * 24 * 31)
  const [presaleStart, setPresaleStart] = useState(0)
  const [presaleEnd, setPresaleEnd] = useState(0)
  const [presaleMerkleRoot, setPresaleMerkleRoot] = useState(
    '0x0000000000000000000000000000000000000000000000000000000000000000'
  )
  const contractAddress = getZoraNFTCreatorV1Address(activeChain?.id)
  const contract = new ethers.Contract(contractAddress, abi, signer)

  const createDrop = () => {
    const uriBase = musicMetadata + '?'
    const contractUri = contractMetadata
    const dropDurationSeconds = 60 * 60 * 24 * parseInt(lengthOfDrop)
    const publicSaleEnd =
      dropDurationSeconds > 0
        ? parseInt(publicSaleStart) + dropDurationSeconds
        : 253392527340

    return contract
      .createDrop(
        name,
        symbol,
        defaultAdmin || account?.address,
        editionSize,
        royaltyBps,
        fundsRecipient || account?.address,
        [
          publicSalePrice,
          maxSalePurchasePerAddress,
          publicSaleStart,
          publicSaleEnd,
          presaleStart,
          presaleEnd,
          presaleMerkleRoot,
        ],
        uriBase,
        contractUri
      )
      .then(async (tx) => {
        const receipt = await tx.wait()
        const dropAddress = receipt.events.find((e) => e.event === 'CreatedDrop').args
          .editionContractAddress
        toast.success(
          <a target="__blank" href={`/${activeChain.id}/${dropAddress}`}>
            view drop here
          </a>,
          { autoClose: false, closeOnClick: false }
        )
        return receipt
      })
      .catch(console.error)
  }

  return (
    <CreateDropContext.Provider
      value={{
        createDrop,
        name,
        setContractMetadata,
        setMusicMetadata,
        lengthOfDrop,
        setLengthOfDrop,
        setName,
        symbol,
        setSymbol,
        defaultAdmin,
        setDefaultAdmin,
        editionSize,
        setEditionSize,
        royaltyBps,
        setRoyaltyBps,
        fundsRecipient,
        setFundsRecipient,
        publicSalePrice,
        setPublicSalePrice,
        maxSalePurchasePerAddress,
        setMaxSalePurchasePerAddress,
        publicSaleStart,
        setPublicSaleStart,
        publicSaleEnd,
        setPublicSaleEnd,
        presaleStart,
        setPresaleStart,
        presaleEnd,
        setPresaleEnd,
        presaleMerkleRoot,
        setPresaleMerkleRoot,
      }}
    >
      {children}
    </CreateDropContext.Provider>
  )
}

export const useCreateDrop = () => useContext(CreateDropContext)
