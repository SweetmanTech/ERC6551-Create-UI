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
            return receipt
        } catch (err) {
            handleTxError(err)
            return false
        }
    }

    return {
        create
    }
}

export default useTokenbound