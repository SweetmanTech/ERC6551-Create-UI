import Image from 'next/image'
import Spinner from '../Spinner'
import useTokenbound from '../../hooks/useTokenbound'
import { useRouter } from 'next/router'
import { useNetwork } from 'wagmi'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Song = ({ song }: any) => {
  const src = song?.media?.[0]?.gateway
  const songAddress = song?.contract?.address
  const tokenId = song?.tokenId
  const { activeChain } = useNetwork()
  const { create } = useTokenbound()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const successRedirect = () => {
    router.push(
      `https://alpha.onchainplaylist.xyz/${activeChain?.id}/${songAddress}/${tokenId}`
    )
  }

  const handleClick = async () => {
    setLoading(true)
    let response = await create(songAddress, tokenId)
    if (response) {
      successRedirect()
    }
    setLoading(false)
  }

  return (
    <>
      {src && !loading ? (
        <button type="button" onClick={handleClick}>
          <Image alt="song" height={50} width={50} src={src} />
        </button>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default Song
