import { NftOrdering } from "alchemy-sdk";
import { getAlchemy } from "../clients/alchemy";

export async function getNfts(chainId: string, account: string) {
  try {
    const alchemy = getAlchemy(chainId)
    const response = await alchemy.nft.getNftsForOwner(account, {
      orderBy: NftOrdering.TRANSFERTIME,
    });
    if (!response.ownedNfts) {
      return [];
    }

    return response.ownedNfts.reverse();
  } catch (err) {
    console.error(err);
    return [];
  }
}



