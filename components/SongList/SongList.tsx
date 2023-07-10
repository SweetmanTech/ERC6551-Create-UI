// @ts-nocheck
import { useEffect, useState } from 'react'
import Song from '../Song'
import { getNfts } from '../../lib/getNfts'
import { useAccount, useNetwork } from 'wagmi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import 'swiper/css/bundle' // import Swiper styles

const SongList = () => {
  const { activeChain } = useNetwork()
  const { data: account } = useAccount()
  const [songs, setSongs] = useState([] as any)

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

  return (
    <div className="w-full h-[300px]">
      <Swiper
        effect="coverflow"
        grabCursor={true}
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
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="w-full h-full"
      >
        {songs.map((song) => (
          <SwiperSlide key={song.title} className="flex justify-center items-center">
            <img
              className="h-[300px] w-[300px] object-contain"
              src={song?.media?.[0]?.gateway}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SongList
