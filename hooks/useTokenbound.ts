import { useNetwork, useSigner } from "wagmi"
import { TokenboundClient } from '@tokenbound/sdk'
import handleTxError from "../lib/handleTxError"

const useTokenbound = () => {
    const { data: signer } = useSigner()
    const { activeChain } = useNetwork()
    const tokenboundClient = new TokenboundClient({ signer, chainId: activeChain?.id as number })

    const create = async (address: string, tokenId: string) => {
        try {
            const preparedAccount = (await tokenboundClient.createAccount({
                tokenContract: address,
                tokenId,
            })) as any
        
            const receipt = await preparedAccount.wait()
        
            console.log('SWEETS preparedAccount', receipt) //0x1a2...3b4cd
            return receipt
        } catch (err) {
            handleTxError(err)
            return false
        }
    }

    const getAccount = async (address: string, tokenId: string) => {
        const tokenBoundAccount = tokenboundClient.getAccount({
            tokenContract: address,
            tokenId: tokenId,
        });
        
        console.log("SWEETS tokenBoundAccount", tokenBoundAccount); //0x1a2...3b4cd
        return tokenBoundAccount
    }

    return {
        create,
        getAccount
    }
}

export default useTokenbound