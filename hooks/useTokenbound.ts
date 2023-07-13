import abi from '../lib/abi/tokenbound-registry-abi.json'
import { useNetwork, usePublicClient, useWalletClient } from "wagmi"
import handleTxError from "../lib/handleTxError"

const REGISTRY_ADDRESS = "0x02101dfB77FDE026414827Fdc604ddAF224F0921"
const IMPLEMENTATION_ADDRESS = "0x2D25602551487C3f3354dD80D76D54383A243358"

const useTokenbound = () => {
    const { data: walletClient } = useWalletClient()
    const { chain: activeChain } = useNetwork()
    const publicClient = usePublicClient()
    const chainId = activeChain?.id
    const salt = 0

    const createAccount = async (contractAddress, tokenId) => {
        try {
            const initData = '0x8129fc1c'
            const hash = await walletClient.writeContract({
                address: REGISTRY_ADDRESS,
                chain: activeChain,
                abi,
                functionName: 'createAccount',
                args: [
                    IMPLEMENTATION_ADDRESS,
                    chainId,
                    contractAddress,
                    tokenId,
                    salt,
                    initData
                ]
            })

            return hash
        } catch (err) {
            handleTxError(err)
            return false
        }
    }

    const getAccount = async (contractAddress, tokenId) => {
        const account = await publicClient.readContract({
            address: REGISTRY_ADDRESS,
            abi,
            functionName: 'account',
            args: [IMPLEMENTATION_ADDRESS, chainId, contractAddress, tokenId, salt]
        })
        return account
    }

    const hasDeployedAccount = async (contractAddress, tokenId) => {
        const account = await getAccount(contractAddress, tokenId)
        const bytecode = await publicClient.getBytecode({
            address: account as any,
        })
        return bytecode !== "0x"
    }

    return {
        createAccount,
        hasDeployedAccount
    }
}

export default useTokenbound