import { useEffect, useState } from 'react'

const useIsMobile = () => {
  const [isMobile, setMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)

    handleResize() // call this function initially to set the state

    return () => {
      window.removeEventListener('resize', handleResize) // clean up event listener on unmount
    }
  }, [])

  return {
    isMobile,
  }
}

export default useIsMobile
