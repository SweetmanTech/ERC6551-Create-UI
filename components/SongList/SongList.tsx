import { useEffect, useState } from 'react'
import Song from '../Song'
import { getNfts } from '../../lib/getNfts'
import { useAccount, useNetwork } from 'wagmi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Mousewheel, Pagination } from 'swiper/modules'
import PendingTxModal from '@components/PendingTxModal'
import useIsMobile from '@hooks/useIsMobile'
import Spinner from '@components/Spinner'
import { motion, AnimatePresence } from 'framer-motion'
import 'swiper/css/bundle' // import Swiper styles

const SongList = () => {
  const { activeChain } = useNetwork()
  const { data: account } = useAccount()
  const [songs, setSongs] = useState([] as any)
  const [open, setOpen] = useState(false)
  const { isMobile } = useIsMobile()

  useEffect(() => {
    const init = async () => {
      const response = await getNfts(activeChain?.id?.toString(), account.address)
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
    <div className="w-full flex justify-center">
      {/* @ts-ignore */}
      <AnimatePresence exitBeforeEnter>
        {songs.length > 0 ? (
          <motion.div
            key="swiper"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            <Swiper
              //  @ts-ignore
              effect="coverflow"
              grabCursor={true}
              mousewheel={true}
              centeredSlides={true}
              slidesPerView={isMobile ? 3 : 5}
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
            >
              {songs.map((song) => (
                <SwiperSlide key={song.title}>
                  <Song
                    song={song}
                    onRegistering={handleRegistering}
                    onError={() => setOpen(false)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        ) : (
          <motion.div
            key="spinner"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Spinner size={isMobile ? 155 : 280} />
          </motion.div>
        )}
      </AnimatePresence>
      {open && <PendingTxModal />}
    </div>
  )
}

export default SongList
