import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import SongList from '../SongList'

const HomePage = () => {
  const { data: account } = useAccount()

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] gap-11">
      <div className="font-body">onchain CD</div>
      <div className="font-body text-center">turn any piece of music into a CD</div>
      <div className="font-body text-center">
        CDs can own songs and interact with dApps across the Ethereum ecosystem.
      </div>
      <ConnectButton label="sign in" />
      {account && <SongList />}
    </div>
  )
}

export default HomePage
