import ethers from "ethers";
import dotenv from "dotenv";
dotenv.config();

import { CrossChainMessenger } from "@eth-optimism/sdk";
import { getOptimismConfiguration } from "@conduitxyz/sdk";

const privateKey = process.env.PRIVATE_KEY;
const conduitSlug = process.env.CONDUIT_SLUG || "pgn-sepolia-i4td3ji6i0";
const l1Url = process.env.L1_RPC;
const l2Url = process.env.L2_RPC;

export async function createCrossChainMessanger() {
  const l1RpcProvider = new ethers.providers.JsonRpcProvider(l1Url);
  const l2RpcProvider = new ethers.providers.JsonRpcProvider(l2Url);

  const l1Signer = new ethers.Wallet(privateKey, l1RpcProvider);
  const l2Signer = new ethers.Wallet(privateKey, l2RpcProvider);

  let config = await getOptimismConfiguration(`conduit:${conduitSlug}`);

  config.l1SignerOrProvider = l1Signer;
  config.l2SignerOrProvider = l2Signer;

  return new CrossChainMessenger(config);
}
