import { useNetwork, useSigner } from "wagmi"
import { TokenboundClient } from '@tokenbound/sdk'

const useTokenbound = () => {
    const { data: signer } = useSigner()
    const { activeChain } = useNetwork()
    const tokenboundClient = new TokenboundClient({ signer, chainId: activeChain?.id as number })

    const create = async (address: string, tokenId: string) => {
        const preparedAccount = (await tokenboundClient.createAccount({
            tokenContract: address,
            tokenId,
        })) as any
    
        const receipt = await preparedAccount.wait()
    
        console.log('SWEETS preparedAccount', receipt) //0x1a2...3b4cd
        return receipt
    }

    return {
        create
    }
}

export default useTokenbound