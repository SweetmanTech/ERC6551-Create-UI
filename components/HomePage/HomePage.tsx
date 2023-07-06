import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useEffect } from 'react'
import { getNfts } from '../../lib/getNfts'
import { useAccount, useNetwork } from 'wagmi'

const HomePage = () => {
  const { activeChain } = useNetwork()
  const { data: account } = useAccount()

  useEffect(() => {
    const init = async () => {
      const response = await getNfts(activeChain?.id?.toString(), account.address)
      console.log('SWEETS RESPONSE', response)
    }

    if (!activeChain || !account) return
    init()
  }, [activeChain, account])

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] gap-11">
      <div className="font-body">onchain CD</div>
      <div className="font-body text-center">
        turn any piece of music into a CD that can own songs and interact with dApps
        across the Ethereum ecosystem.
      </div>
      <ConnectButton label="sign in" />
    </div>
  )
}

export default HomePage
