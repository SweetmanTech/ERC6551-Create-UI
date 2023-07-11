import { motion } from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const CustomConnectButton = ({ label = 'Create CD', controls }: any) => {
  const variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div variants={variants} initial="hidden" animate="show">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const ready = mounted
          const connected = ready && account && chain
          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
              className="text-white"
            >
              {(() => {
                if (!connected) {
                  return (
                    <motion.button
                      onClick={openConnectModal}
                      type="button"
                      className="border border-white rounded-3xl w-[200px] h-11"
                      variants={variants}
                      initial="hidden"
                      animate={controls}
                      whileHover={{ scale: 1.1 }}
                    >
                      Connect
                    </motion.button>
                  )
                }

                return (
                  <div className="flex gap-5">
                    <motion.button
                      onClick={openAccountModal}
                      type="button"
                      className="border border-white rounded-3xl w-[200px] py-1"
                      variants={variants}
                      initial="hidden"
                      animate={controls}
                      whileHover={{ scale: 1.1 }}
                    >
                      {account?.ensName || account?.displayName}
                    </motion.button>
                    <button
                      onClick={openChainModal}
                      style={{ display: 'flex', alignItems: 'center' }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 25,
                            height: 25,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 25, height: 25 }}
                            />
                          )}
                        </div>
                      )}
                    </button>
                  </div>
                )
              })()}
            </div>
          )
        }}
      </ConnectButton.Custom>
    </motion.div>
  )
}

export default CustomConnectButton
