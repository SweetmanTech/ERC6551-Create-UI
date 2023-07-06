import getAlchemyNetwork from "../getAlchemyNetwork";
import { Alchemy } from "alchemy-sdk";

export const getAlchemy = (chainId: any) => {
  const network = getAlchemyNetwork(chainId)

  const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    network
  };
  const alchemy = new Alchemy(config);
  return alchemy
}