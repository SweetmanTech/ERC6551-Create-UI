import { ConnectButton } from '@rainbow-me/rainbowkit'
import SongList from '../../SongList'
import { useEffect } from 'react'

const CoverPage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#ffffff'
    document.documentElement.style.backgroundColor = '#ffffff'
  }, [])

  return (
    <div className="h-[100vh]">
      <ConnectButton />
      <SongList />
    </div>
  )
}

export default CoverPage
