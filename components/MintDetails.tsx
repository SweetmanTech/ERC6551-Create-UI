import { Box, Flex, Text, Stack, Separator } from '@zoralabs/zord'
import React, { useMemo } from 'react'
import { SubgraphERC721Drop } from 'models/subgraph'
import { useERC721DropContract } from 'providers/ERC721DropProvider'
import { useSaleStatus } from 'hooks/useSaleStatus'
import { parseInt } from 'lodash'
import { OPEN_EDITION_SIZE, dateOptions } from 'lib/constants'

export function MintDetails({
  collection,
  showPresale = true,
}: {
  collection: SubgraphERC721Drop
  showPresale?: boolean
}) {
  const { totalMinted } = useERC721DropContract()
  const { presaleExists } = useSaleStatus({ collection })

  const presaleStartDate = useMemo(
    () => new Date(Number(collection?.salesConfig?.presaleStart) * 1000),
    [collection?.salesConfig?.presaleStart]
  )
  const presaleEndDate = useMemo(
    () => new Date(Number(collection?.salesConfig?.presaleEnd) * 1000),
    [collection?.salesConfig?.presaleEnd]
  )

  // TODO: handle integer overflows for when we do open mints
  const formattedMintedCount = Intl.NumberFormat('en', {
    notation: 'standard',
  }).format(totalMinted || parseInt(collection.totalMinted))

  const formattedTotalSupplyCount = Intl.NumberFormat('en', {
    notation: 'standard',
  }).format(parseInt(collection.maxSupply))

  return (
    <Stack gap="x4">
      <Stack gap="x3">
        <Flex gap="x3" justify="space-between">
          <Text variant="paragraph-sm" color="tertiary">
            Número vendido
          </Text>
          <Text variant="paragraph-sm">
            {formattedMintedCount}
            {parseInt(collection.maxSupply) > OPEN_EDITION_SIZE ? (
              ' NFTs'
            ) : (
              <Box display="inline" color="tertiary">
                /{formattedTotalSupplyCount}
              </Box>
            )}
          </Text>
        </Flex>
        <Separator my="x2" />

        {showPresale && presaleExists && (
          <>
            <Flex gap="x2" justify="space-between">
              <Text variant="paragraph-sm" color="tertiary">
                Presale start
              </Text>
              <Text variant="paragraph-sm" align="right">
                {presaleStartDate.toLocaleString(
                  ...(dateOptions as [string, Intl.DateTimeFormatOptions])
                )}
              </Text>
            </Flex>
            <Flex gap="x2" justify="space-between">
              <Text variant="paragraph-sm" color="tertiary">
                Presale end
              </Text>
              <Text variant="paragraph-sm" align="right">
                {!isNaN(presaleEndDate.getTime())
                  ? presaleEndDate.toLocaleString(
                      ...(dateOptions as [string, Intl.DateTimeFormatOptions])
                    )
                  : 'Never'}
              </Text>
            </Flex>
          </>
        )}
      </Stack>
    </Stack>
  )
}
