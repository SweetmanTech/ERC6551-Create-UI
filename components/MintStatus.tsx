import { ConnectButton } from '@rainbow-me/rainbowkit'
import {
  Box,
  Button,
  Eyebrow,
  Paragraph,
  Flex,
  Heading,
  Text,
  Stack,
  SpinnerOG,
} from '@zoralabs/zord'
import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { SubgraphERC721Drop } from 'models/subgraph'
import { useERC721DropContract } from 'providers/ERC721DropProvider'
import { useAccount, useNetwork, useSigner } from 'wagmi'
import { formatCryptoVal } from 'lib/numbers'
import { OPEN_EDITION_SIZE } from 'lib/constants'
import { parseInt } from 'lodash'
import { priceDateHeading, mintCounterInput } from 'styles/styles.css'
import { useSaleStatus } from 'hooks/useSaleStatus'
import { CountdownTimer } from 'components/CountdownTimer'
import { cleanErrors } from 'lib/errors'
import { AllowListEntry } from 'lib/merkle-proof'
import { BigNumber, ethers } from 'ethers'
import abi from '@lib/ERC721Drop-abi.json'
import handleTxError from 'lib/handleTxError'
import { CrossmintPayButton } from '@crossmint/client-sdk-react-ui'
import axios from 'axios'

function SaleStatus({
  collection,
  isMinted,
  setIsMinted,
  presale,
  mintCounter = 1,
  availableMints,
  allowlistEntry,
}: {
  collection: SubgraphERC721Drop
  isMinted: boolean
  setIsMinted: (state: boolean) => void
  presale: boolean
  mintCounter: number
  availableMints: number
  allowlistEntry?: AllowListEntry
}) {
  const { data: account } = useAccount()
  const { switchNetwork } = useNetwork()
  const { data: signer } = useSigner()

  const dropProvider = useERC721DropContract()
  const { chainId, correctNetwork } = useERC721DropContract()
  const [awaitingApproval, setAwaitingApproval] = useState<boolean>(false)
  const [isMinting, setIsMinting] = useState<boolean>(false)
  const [errors, setErrors] = useState<string>()
  const priceInEth = useMemo(
    () =>
      ethers.utils
        .formatEther(collection.salesConfig.publicSalePrice.toString())
        .toString(),
    [collection.salesConfig.publicSalePrice]
  )
  const { startDate, endDate, isSoldOut, saleIsActive, saleNotStarted, saleIsFinished } =
    useSaleStatus({
      collection,
      presale,
    })

  const mint = async () => {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi,
      signer
    )
    const tx = await contract.purchase(mintCounter, {
      value: BigNumber.from(collection.salesConfig.publicSalePrice)
        .mul(mintCounter)
        .toString(),
    })
    return tx
  }

  const handleMint = useCallback(async () => {
    setIsMinted(false)
    setAwaitingApproval(true)
    setErrors(undefined)
    try {
      const tx = await mint()
      setAwaitingApproval(false)
      setIsMinting(true)
      if (tx) {
        await tx.wait(2)
        setIsMinting(false)
        setIsMinted(true)
      } else {
        throw 'Error creating transaction! Please try again'
      }
    } catch (e: any) {
      handleTxError(e)
      setErrors(cleanErrors(e))
      setAwaitingApproval(false)
      setIsMinting(false)
    }
  }, [dropProvider, mintCounter, allowlistEntry])

  if (saleIsFinished || isSoldOut) {
    return (
      <Box>
        <Heading align="center" size="xs">
          {saleIsFinished ? 'Minting complete' : 'Sold out'}
        </Heading>
        <Paragraph
          mt="x1"
          align="center"
          size="sm"
          color="secondary"
          maxW="x64"
          mx="auto"
        >
          There may be NFTs for sale on the secondary&nbsp;market.
        </Paragraph>
        <Button
          as="a"
          href={`https://zora.co/collections/${collection.address}`}
          target="_blank"
          rel="noreferrer"
          size="lg"
          mt="x3"
        >
          View on Zora Marketplace
        </Button>
      </Box>
    )
  }

  return (
    <>
      <CrossmintPayButton
        clientId={process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_ID}
        environment="staging"
        className="xmint-btn"
        // mintTo={account as string}
        mintConfig={{
          type: 'erc-721',
          totalPrice: priceInEth,
          _quantity: 1,
          // _to: account as string,
          _target: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        }}
      />
      <ConnectButton.Custom>
        {({ openChainModal, openConnectModal }) => (
          <Button
            icon={isMinted ? 'Check' : undefined}
            iconSize="sm"
            size="lg"
            variant={
              account == null
                ? undefined
                : !correctNetwork
                ? 'destructive'
                : saleNotStarted || availableMints < 1
                ? 'secondary'
                : undefined
            }
            onClick={
              !account
                ? openConnectModal
                : !correctNetwork
                ? () => switchNetwork?.(chainId)
                : handleMint
            }
            style={
              isMinted
                ? { backgroundColor: '#1CB687' }
                : {
                    backgroundColor: '#f105cd',
                  }
            }
            className="fill-blue-500 font-bold text-xl"
            disabled={
              isMinting ||
              awaitingApproval ||
              (account && correctNetwork && saleNotStarted) ||
              (account && correctNetwork && availableMints < 1)
            }
          >
            {isMinting ? (
              <SpinnerOG />
            ) : !account ? (
              'Connectar billetera'
            ) : !correctNetwork ? (
              'Red incorrecta'
            ) : awaitingApproval ? (
              'Confirmar en billetera'
            ) : isMinted ? (
              'Minted'
            ) : saleNotStarted ? (
              'No empezado'
            ) : availableMints < 1 ? (
              'Límite de menta alcanzado'
            ) : (
              'Mint'
            )}
          </Button>
        )}
      </ConnectButton.Custom>
      {saleIsActive && (
        <Text variant="paragraph-sm" align="center" color="tertiary">
          <CountdownTimer targetTime={endDate} refresh={true} appendText=" left" />
        </Text>
      )}
      {saleNotStarted && (
        <Text variant="paragraph-sm" align="center" color="tertiary">
          <CountdownTimer
            targetTime={startDate}
            refresh={true}
            prependText="Starts in "
          />
        </Text>
      )}
      {errors && (
        <Text wordBreak="break-word" variant="paragraph-sm" style={{ color: 'red' }}>
          {errors}
        </Text>
      )}
    </>
  )
}

export function MintStatus({
  collection,
  presale = false,
  showPrice = true,
  allowlistEntry,
}: {
  collection: SubgraphERC721Drop
  presale?: boolean
  showPrice?: boolean
  allowlistEntry?: AllowListEntry
}) {
  const { userMintedCount, totalMinted, updateMintCounters } = useERC721DropContract()
  const { isSoldOut, saleIsActive, saleIsFinished } = useSaleStatus({
    collection,
    presale,
  })
  const parsedMax = parseInt(
    presale
      ? allowlistEntry?.maxCount || '0'
      : collection?.salesConfig?.maxSalePurchasePerAddress
  )
  const maxPerWallet = parsedMax === 0 ? 1000000 : parsedMax
  const [isMinted, setIsMinted] = useState<boolean>(false)
  const [mintCounter, setMintCounter] = useState(1)
  const [maticPrice, setMaticPrice] = useState(0)
  const availableMints = maxPerWallet - (userMintedCount || 0)
  const internalPrice = allowlistEntry?.price || collection?.salesConfig?.publicSalePrice
  const displayPrice = useMemo(
    () =>
      parseInt(
        formatCryptoVal(Number(internalPrice) * maticPrice * (mintCounter || 1))
      ).toFixed(2),
    [internalPrice, mintCounter]
  )

  useEffect(() => {
    updateMintCounters()
  }, [updateMintCounters, isMinted])

  useEffect(() => {
    const getMaticPrice = async () => {
      const { data: price } = await axios.get('/api/getMaticPrice')
      setMaticPrice(price.USD)
    }
    getMaticPrice()
  }, [])

  function handleMintCounterUpdate(value: any) {
    setMintCounter(value)
    setIsMinted(false)
  }

  const clampMintCounter = useCallback(() => {
    if (mintCounter > availableMints) setMintCounter(Math.max(1, availableMints))
    else if (mintCounter < 1) setMintCounter(1)
    else setMintCounter(Math.round(mintCounter))
  }, [mintCounter, isMinted])

  // TODO: handle integer overflows for when we do open mints
  const formattedMintedCount = Intl.NumberFormat('en', {
    notation: 'standard',
  }).format(totalMinted || parseInt(collection.totalMinted))

  const formattedTotalSupplyCount = Intl.NumberFormat('en', {
    notation: 'standard',
  }).format(parseInt(collection.maxSupply))

  return (
    <Stack gap="x4">
      {showPrice && !saleIsFinished && !isSoldOut && (
        <Flex gap="x3" flexChildren justify="space-between" align="flex-end" wrap="wrap">
          <Stack gap="x1" style={{ flex: 'none' }}>
            <Eyebrow>Precio</Eyebrow>
            <Heading size="sm" className={priceDateHeading}>
              {internalPrice === '0'
                ? 'Free'
                : `$${displayPrice == 0 ? 0.01 * mintCounter : displayPrice}`}
            </Heading>
          </Stack>

          {saleIsActive && !isSoldOut ? (
            <Stack gap="x1" style={{ textAlign: 'right' }}>
              <Flex gap="x2" justify="flex-end" align="center">
                <Button
                  w="x12"
                  variant="circle"
                  disabled={mintCounter <= 1}
                  onClick={() =>
                    handleMintCounterUpdate((state: number) =>
                      state > 0 ? state - 1 : state
                    )
                  }
                >
                  <Heading size="sm" className={priceDateHeading}>
                    –
                  </Heading>
                </Button>
                <Heading display="flex" size="sm" className={priceDateHeading}>
                  <input
                    type="number"
                    min={1}
                    placeholder="1"
                    value={mintCounter || ''}
                    onBlur={clampMintCounter}
                    onChange={(e) => handleMintCounterUpdate(Number(e.target.value))}
                    className={mintCounterInput}
                  />
                </Heading>
                <Button
                  w="x12"
                  disabled={mintCounter >= availableMints}
                  variant="circle"
                  onClick={() =>
                    setMintCounter((state) => (state < maxPerWallet ? state + 1 : state))
                  }
                >
                  <Heading size="sm" className={priceDateHeading}>
                    +
                  </Heading>
                </Button>
              </Flex>
            </Stack>
          ) : saleIsFinished ? (
            <Stack gap="x1" style={{ flex: 'none' }}>
              <Eyebrow>Sold</Eyebrow>
              <Heading size="sm" className={priceDateHeading}>
                {formattedMintedCount}
                {parseInt(collection.maxSupply) > OPEN_EDITION_SIZE ? (
                  ' NFTs'
                ) : (
                  <Box
                    display="inline"
                    color="tertiary"
                    style={{ lineHeight: 'inherit' }}
                  >
                    /{formattedTotalSupplyCount}
                  </Box>
                )}
              </Heading>
            </Stack>
          ) : null}
        </Flex>
      )}

      <SaleStatus
        collection={collection}
        mintCounter={mintCounter}
        isMinted={isMinted}
        presale={presale}
        setIsMinted={setIsMinted}
        allowlistEntry={allowlistEntry}
        availableMints={availableMints}
      />
    </Stack>
  )
}
