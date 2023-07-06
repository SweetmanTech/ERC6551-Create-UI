import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useEffect } from 'react'
import { getNfts } from '../../lib/getNfts'
import { useAccount, useNetwork } from 'wagmi'

const HomePage = () => {
  const { activeChain } = useNetwork()
  const { data: account } = useAccount()

  useEffect(() => {
    const init = async () => {
      const response = await getNfts(activeChain.id.toString(), account.address)
      console.log('SWEETS RESPONSE', response)
    }

    init()
  }, [activeChain, account])

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] gap-11">
      <div className="font-body">Onchain Playlist</div>
      <div className="font-body">
        Onchain Playlist turns any piece of music onchain into a smart wallet that can own
        songs and interact with dApps across the Ethereum ecosystem.
      </div>
      <ConnectButton />
    </div>
  )
}

export default HomePage
