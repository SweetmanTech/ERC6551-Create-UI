import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import SongList from '../SongList'

const HomePage = () => {
  const { data: account } = useAccount()

  return (
    <div className="flex text-white flex-col justify-center items-center h-[100vh] gap-11 bg-black bg-[url('/images/landing_background_2.png')] bg-cover bg-center">
      <div className="flex flex-col gap-3">
        <div className="font-hanson text-5xl">Create a CD with</div>
        <div className="font-hanson text-5xl">your Music NFTs</div>
      </div>
      <div>
        <div className="font-body text-center">Turn any piece of music into a CD.</div>
        <div className="font-body text-center">
          CDs can own songs and interact with dApps
        </div>
        <div className="font-body text-center">across the Ethereum ecosystem.</div>
      </div>
      <ConnectButton label="Create CD" />
      {account && <SongList />}
    </div>
  )
}

export default HomePage
