const getErc721Drop = (contractAddress, metadata, price, maxSalePurchasePerAddress,totalSupply,maxSupply) => ( 
    {
        id: 'string',
        created: {
          id: 'string',
          block: 'string',
          timestamp: 'string',
        },
        creator: 'string',
        address: contractAddress,
        name: metadata.name,
        symbol: 'string',
        contractConfig: {
          metadataRenderer: 'string',
          editionSize: 'string',
          royaltyBPS: 'number',
          fundsRecipient: 'string',
        },
        salesConfig: {
          publicSalePrice: price.toString(),
          maxSalePurchasePerAddress: maxSalePurchasePerAddress.toString(),
          publicSaleStart: '0',
          publicSaleEnd: '9223372036854775807',
          presaleStart: '0',
          presaleEnd: '0',
          presaleMerkleRoot:
            '0x0000000000000000000000000000000000000000000000000000000000000000',
        },
        salesConfigHistory: [
          {
            publicSalePrice: 'string',
            maxSalePurchasePerAddress: 'string',
            publicSaleStart: 'string',
            publicSaleEnd: 'string',
            presaleStart: 'string',
            presaleEnd: 'string',
            presaleMerkleRoot:
              '0x0000000000000000000000000000000000000000000000000000000000000000',
          },
        ],
        editionMetadata: {
          id: 'string',
          description: metadata.description,
          imageURI: metadata.image,
          contractURI: 'string',
          animationURI: metadata.animation_url || '',
          mimeType: metadata.mimeType || '',
        },
        sales: [
          {
            id: 'string',
            pricePerToken: 'string',
            priceTotal: 'string',
            count: 'string',
            purchaser: 'string',
            firstPurchasedTokenId: 0,
            txn: {
              id: 'string',
              block: 'string',
              timestamp: 'string',
            },
          },
        ],
        transfers: [
          {
            id: 'string',
            tokenId: 'string',
            to: 'string',
            from: 'string',
            txn: {
              id: 'string',
              block: 'string',
              timestamp: 'string',
            },
          },
        ],
        totalMinted: totalSupply.toString(),
        maxSupply: maxSupply.toString(),
        txn: {
          id: 'string',
          block: 'string',
          timestamp: 'string',
        },
    }
)

export default getErc721Drop