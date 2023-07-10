import { useNetwork } from 'wagmi'
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
    <button type="button" onClick={handleClick}>
      {imageSrc && (
        <Image
          src={getIpfsLink(song?.media?.[0]?.gateway)}
          height={300}
          width={300}
          alt="song"
          className="rounded-xl h-[300px] w-[300px] object-contain"
        />
      )}
    </button>
  )
}

export default Song
