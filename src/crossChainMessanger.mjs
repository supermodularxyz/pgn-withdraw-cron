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
  console.log("Creating Optimism CrossChainMessenger...");
  const l1RpcProvider = new ethers.providers.JsonRpcProvider(l1Url);
  const l2RpcProvider = new ethers.providers.JsonRpcProvider(l2Url);

  console.log(`
Providers created:
L1: ${l1Url}
L2: ${l2Url}
`);

  const l1Signer = new ethers.Wallet(privateKey, l1RpcProvider);
  const l2Signer = new ethers.Wallet(privateKey, l2RpcProvider);

  console.log(`Signer address: ${await l1Signer.address}\n`);

  console.log(`Getting Conduit Optimism configuration...\n`);
  let config = await getOptimismConfiguration(`conduit:${conduitSlug}`);

  config.l1SignerOrProvider = l1Signer;
  config.l2SignerOrProvider = l2Signer;

  return new CrossChainMessenger(config);
}
