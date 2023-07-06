import { ConnectButton } from '@rainbow-me/rainbowkit'
import Songs from '../Songs'
import { useAccount } from 'wagmi'

const HomePage = () => {
  const { data: address } = useAccount()

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] gap-11">
      <div className="font-body">Onchain Playlist</div>
      <div className="font-body">
        Onchain Playlist turns any piece of music onchain into a smart wallet that can own
        songs and interact with dApps across the Ethereum ecosystem.
      </div>
      <ConnectButton />
      {address && <Songs />}
    </div>
  )
}

export default HomePage
