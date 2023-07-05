import { ConnectButton } from '@rainbow-me/rainbowkit'

const HomePage = () => (
  <div className="flex flex-col justify-center items-center h-[100vh] gap-11">
    <div className="font-body">Onchain Playlist</div>
    <div className="font-body">
      Onchain Playlist turns any piece of music onchain into a smart wallet that can own
      songs and interact with dApps across the Ethereum ecosystem.
    </div>
    <ConnectButton />
  </div>
)

export default HomePage
