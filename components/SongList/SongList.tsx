import { useEffect, useState } from 'react'
import Song from '../Song'
import { getNfts } from '../../lib/getNfts'
import { useAccount, useNetwork } from 'wagmi'

const SongList = () => {
  const { activeChain } = useNetwork()
  const { data: account } = useAccount()
  const [songs, setSongs] = useState([] as any)

  useEffect(() => {
    const init = async () => {
      const response = await getNfts(activeChain?.id?.toString(), account.address)
      console.log('SWEETS RESPONSE', response)
      setSongs(response)
    }

    if (!activeChain || !account) return
    init()
  }, [activeChain, account])

  return (
    <div className="custom-scroll grid grid-cols-3 gap-2 overflow-y-auto">
      {songs.map((song) => (
        <Song key={song?.title} song={song} />
      ))}
    </div>
  )
}

export default SongList
