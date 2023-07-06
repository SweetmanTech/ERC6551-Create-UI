import { Contract } from 'ethers'
import abi from '../../lib/abi/tokenbound-registry-abi.json'
import { useNetwork, useSigner } from 'wagmi'
import getIpfsLink from '@lib/getIpfsLink'
import Image from 'next/image'

const Song = ({ song }: any) => {
  const { data: signer } = useSigner()
  const { activeChain } = useNetwork()
  const imageSrc = getIpfsLink(song?.media?.[0]?.gateway)

  const handleClick = async () => {
    const contract = new Contract(
      '0x02101dfB77FDE026414827Fdc604ddAF224F0921',
      abi,
      signer
    )
    const implementation = '0x2D25602551487C3f3354dD80D76D54383A243358'
    const chainId = activeChain?.id
    const tokenContract = song?.contract?.address
    const tokenId = song?.tokenId
    const salt = 0
    const initData = '0x8129fc1c'
    const tx = await contract.createAccount(
      implementation,
      chainId,
      tokenContract,
      tokenId,
      salt,
      initData
    )
    const receipt = await tx.wait()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex flex-col justify-center items-center"
    >
      {song?.title}
      {imageSrc && (
        <Image
          src={getIpfsLink(song?.media?.[0]?.gateway)}
          height={100}
          width={100}
          alt="song"
        />
      )}
    </button>
  )
}

export default Song
