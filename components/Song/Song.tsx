import { Contract } from 'ethers'
import { useNetwork, useSigner } from 'wagmi'
import getIpfsLink from '@lib/getIpfsLink'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useTokenbound from '../../hooks/useTokenbound'
import { toast } from 'react-toastify'

const Song = ({ song }: any) => {
  const imageSrc = getIpfsLink(song?.media?.[0]?.gateway)
  const router = useRouter()
  const { activeChain } = useNetwork()
  const { createAccount, hasDeployedAccount } = useTokenbound()
  const tokenId = song?.tokenId
  const tokenContract = song?.contract?.address

  const handleSuccess = () => {
    toast.success('CD created! Opening...')
    router.push(
      `https://alpha.onchainplaylist.xyz/${activeChain?.id}/${tokenContract}/${tokenId}`
    )
  }

  const handleClick = async () => {
    const alreadyExists = await hasDeployedAccount(tokenContract, tokenId)
    if (alreadyExists) {
      handleSuccess()
      return
    }
    const response = await createAccount(tokenContract, tokenId)
    if (response) {
      handleSuccess()
    }
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
