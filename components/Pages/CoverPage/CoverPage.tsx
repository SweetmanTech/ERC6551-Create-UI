import SongList from '../../SongList'
import { useEffect } from 'react'

const CoverPage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#ffffff'
    document.documentElement.style.backgroundColor = '#ffffff'
  }, [])

  return (
    <div className="h-[100vh]">
      <SongList />
    </div>
  )
}

export default CoverPage
