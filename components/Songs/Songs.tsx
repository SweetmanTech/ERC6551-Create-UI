import { getNfts } from '../../lib/alchemy/nft'
import { useEffect, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import Spinner from '../Spinner'
import Song from './Song'

const Songs = () => {
  const { activeChain } = useNetwork()
  const { data: account } = useAccount()
  const [songs, setSongs] = useState([] as any)
  const hasSongs = songs.length > 0
  const chainId = activeChain?.id as any
  const address = account?.address as string

  console.log('SWEETS network', activeChain)
  console.log('SWEETS address', address)
  useEffect(() => {
    const init = async () => {
      const response = await getNfts(chainId, address)
      console.log('SWEETS response', response)
      setSongs(response)
    }

    if (!chainId || !address) return
    init()
  }, [])

  return (
    <div>
      {hasSongs ? (
        <div>
          {songs.map((song: any) => (
            <Song song={song} />
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default Songs
