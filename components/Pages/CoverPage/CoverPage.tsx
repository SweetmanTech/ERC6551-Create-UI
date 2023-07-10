import SongList from '../../SongList'
import { useEffect } from 'react'

const CoverPage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#ffffff'
    document.documentElement.style.backgroundColor = '#ffffff'
  }, [])

  console.log('SWEETS SONG LIST')

  return (
    <div className="h-[100vh] z-1">
      <SongList />
    </div>
  )
}

export default CoverPage
