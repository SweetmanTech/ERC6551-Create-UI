import Image from 'next/image'
import Spinner from '../Spinner'
import useTokenbound from '../../hooks/useTokenbound'

const Song = ({ song }: any) => {
  const src = song?.media?.[0]?.gateway
  const songAddress = song?.contract?.address
  const tokenId = song?.tokenId
  const { create } = useTokenbound()

  const handleClick = async () => {
    console.log('SWEETS REGISTER TOKEN 2', songAddress, tokenId)
    const response = await create(songAddress, tokenId)
    console.log('SWEETS REGISTER TOKEN response', response)
  }

  return (
    <>
      {src ? (
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
