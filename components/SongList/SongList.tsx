// @ts-nocheck
import { useEffect, useState } from 'react'
import Song from '../Song'
import { getNfts } from '../../lib/getNfts'
import { useAccount, useNetwork } from 'wagmi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Mousewheel, Pagination } from 'swiper/modules'
import 'swiper/css/bundle' // import Swiper styles
import PendingTxModal from '@components/PendingTxModal'

const SongList = () => {
  const { activeChain } = useNetwork()
  const { data: account } = useAccount()
  const [songs, setSongs] = useState([] as any)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const init = async () => {
      const response = await getNfts(activeChain?.id?.toString(), account.address)
      console.log('SWEETS RESPONSE', response)
      const seen = new Set()
      const result = response.filter((v) => {
        const address = v.contract.address
        if (!seen[address]) {
          seen[address] = true
          return true
        }
        return false
      }, {})
      setSongs(result)
    }

    if (!activeChain || !account) return
    init()
  }, [activeChain, account])

  const handleRegistering = () => {
    console.log('SWEETS OPEN POPUP')
    setOpen(true)
  }

  return (
    <div className="w-full">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        mousewheel={true}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={10}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={false}
        modules={[Mousewheel, EffectCoverflow, Pagination]}
        className="w-full h-full"
      >
        {songs.map((song) => (
          <SwiperSlide key={song.title} className="flex justify-center items-center">
            <Song
              song={song}
              onRegistering={handleRegistering}
              onError={() => setOpen(false)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {open && <PendingTxModal />}
    </div>
  )
}

export default SongList
