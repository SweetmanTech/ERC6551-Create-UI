import { Box, Well, Paragraph, SpinnerOG } from '@zoralabs/zord'
import ERC721DropContractProvider from '@providers/ERC721DropProvider'
import { NextPage } from 'next'
import { SubgraphERC721Drop } from 'models/subgraph'
import { MintStatus } from '@components/MintStatus'
import { MintDetails } from '@components/MintDetails'
import SeoHead from '@components/SeoHead'

interface HomePageProps {
  collection: SubgraphERC721Drop
  chainId?: number
}

const HomePage: NextPage<HomePageProps> = ({ collection }) => {
  return (
    <>
      <SeoHead />
      <div
        className="font-body flex grid grid-cols-6 p-5 justify-center align-center bg-[url('/images/background_1800.png')] "
        style={{ backgroundColor: '#f105cd' }}
      >
        <div className="order-1 flex col-span-6 md:col-span-3 justify-center">
          <img className="lg:max-w-lg" src="/images/Logo_new_festival_token.png" />
        </div>
        <div className="order-2 flex flex-col justify-end text-md text-white md:text-2xl col-span-6 md:col-span-3 gap-5 pb-5">
          <p>
            {process.env.NEXT_PUBLIC_TITLE}: {process.env.NEXT_PUBLIC_DESCRIPTION_TEXT}
          </p>
        </div>
        <div className="order-3 col-span-3 flex justify-center items-center"></div>
        <div className="order-4 flex flex-col justify-start text-white text-md md:text-2xl col-span-3">
          <p>
            Creamos un <span className="font-bold">festival</span> de arte y tecnología
            para artistas de todo el mundo!
          </p>
          <p className="pb-5">
            En esta segunda edición, desarrollamos un reproductor NFT y una serie de obras
            colectivas para apoyar a músicos y al proyecto.
          </p>
        </div>
        <div className="order-6 grid justify-items-center text-white	text-center lg:order-5 text-2xl col-span-6 lg:col-span-3">
          <div className="flex flex-col gap-3">
            <p className="font-bold">Canciones del Reproductor</p>
            <a
              href="https://instagram.com/fellerfelliniok"
              target="_blank"
              rel="noreferrer"
            >
              <p>FELLER FELLINI - MOTA</p>
            </a>
            <a href="https://instagram.com/etcetcduo" target="_blank" rel="noreferrer">
              <p>ETC ETC - MONTE FUJI</p>
            </a>
            <a href="https://instagram.com/pachocantin" target="_blank" rel="noreferrer">
              <p>PACHO CANTIN - EL VUELO AZUL</p>
            </a>
            <a
              href="https://instagram.com/seres.de.arena.eth"
              target="_blank"
              rel="noreferrer"
            >
              <p>SERES DE ARENA - LA TRAMPA</p>
            </a>
            <a
              href="https://instagram.com/curadodeespanto"
              target="_blank"
              rel="noreferrer"
            >
              <p>CURADO DE ESPANTO - POLVO</p>
            </a>
            <a
              href="https://instagram.com/maxi_mediotano"
              target="_blank"
              rel="noreferrer"
            >
              <p>MAXI MEDIOTANO - DOMINGO</p>
            </a>
            <a
              href="https://instagram.com/alejoalarcon9"
              target="_blank"
              rel="noreferrer"
            >
              <p>ALEJO ALARCON - ERA DE ACUARIO</p>
            </a>
            <a href="https://instagram.com/octavocolor" target="_blank" rel="noreferrer">
              <p>OCTAVO COLOR - TEMA 1</p>
            </a>
            <a
              href="https://instagram.com/veteranosdelpanico"
              target="_blank"
              rel="noreferrer"
            >
              <p>VETERANOS DEL PANICO - ASILO</p>
            </a>
          </div>
        </div>
        <div className="my-5 order-5 lg:order-6 flex flex-col justify-start text-xs md:text-lg col-span-6 lg:col-span-3">
          <ERC721DropContractProvider
            erc721DropAddress={process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
            chainId={parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)}
          >
            <Well
              className="rounded-none border-black bg-white"
              p="x6"
              style={{ borderBottom: 0 }}
            >
              <iframe
                className="h-[500px] sm:h-[800px]"
                src="https://cdn.warpsound.ai/ipfs/QmVYW5vHaV322Kvp2So5ErngP1PrDUneYqo4e9TNygAGSn?playlist-url=https://nftstorage.link/ipfs/bafkreihtzmq6y47l3cvsazwzgug542iq2nq76djyfupalucqgoza2wgol4"
                frameBorder="0"
              ></iframe>
            </Well>
            <Well className="rounded-none border-black bg-white" p="x6">
              <Box>
                {collection != null ? (
                  <>
                    <MintDetails collection={collection} showPresale={false} />
                    <MintStatus collection={collection} />
                  </>
                ) : (
                  <Paragraph align="center" mt="x8">
                    <SpinnerOG />
                  </Paragraph>
                )}
              </Box>
            </Well>
          </ERC721DropContractProvider>
        </div>
      </div>
    </>
  )
}

export default HomePage
