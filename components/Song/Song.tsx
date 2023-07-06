import { Contract } from 'ethers'
import abi from '../../lib/abi/tokenbound-registry-abi.json'
import { useNetwork, useSigner } from 'wagmi'

const Song = ({ song }: any) => {
  const { data: signer } = useSigner()
  const { activeChain } = useNetwork()

  const handleClick = async () => {
    console.log('SWEETS CLICKED', song.title)
    const contract = new Contract(
      '0x02101dfB77FDE026414827Fdc604ddAF224F0921',
      abi,
      signer
    )
    console.log('SWEETS CONTRACT', contract)
    const implementation = '0x2D25602551487C3f3354dD80D76D54383A243358'
    const chainId = activeChain?.id
    const tokenContract = song?.contract?.address
    const tokenId = song?.tokenId
    const salt = 0
    const initData = '0x8129fc1c'
    console.log('SWEETS implementation', implementation)
    console.log('SWEETS chainId', chainId)
    console.log('SWEETS tokenContract', tokenContract)
    console.log('SWEETS tokenId', tokenId)
    console.log('SWEETS initData', initData)

    const tx = await contract.createAccount(
      implementation,
      chainId,
      tokenContract,
      tokenId,
      salt,
      initData
    )

    const receipt = await tx.wait()
    console.log('SWEETS RECEIPT', receipt)
  }

  return (
    <button type="button" onClick={handleClick}>
      {song?.title}
    </button>
  )
}

export default Song
