import dotenv from "dotenv";
import { createCrossChainMessenger } from "./crossChainMessenger.mjs";

dotenv.config();

const STATUS = {
  prove: "Ready to prove",
  finalize: "Ready for relay",
};

export default async function run({ crossChainMessenger }) {
  try {
    const start = Date.now();
    const withdrawals = await fetchWithdrawals();

    console.log(`${withdrawals.length} withdrawals found.`);
    console.log(withdrawals);
    for (const { status, l2_tx_hash: hash } of withdrawals) {
      switch (status) {
        case STATUS.prove: {
          console.log(hash, "Proving...");
          await crossChainMessenger.proveMessage(hash);
          console.log(hash, "Proved!");
          break;
        }
        case STATUS.finalize: {
          console.log(hash, "Finalizing...");
          await crossChainMessenger.finalizeMessage(hash);
          console.log(hash, "Finalized!");
          break;
        }
      }
    }

    console.log(
      `Processed ${withdrawals.length} withdrawals in ${(
        (Date.now() - start) /
        60
      ).toFixed(2)} seconds.`
    );
  } catch (error) {
    console.log("Error handling withdrawals!", error);
    process.exit(1);
  }
}

async function fetchWithdrawals() {
  const apiUrl =
    process.env.API_URL ||
    "https://explorer.sepolia.publicgoods.network/api/v2/optimism/withdrawals";
  console.log("Fetching withdrawals from:", apiUrl);
  return fetch(apiUrl)
    .then((r) => r.json())
    .then((r) => r.items);
}

const crossChainMessenger = await createCrossChainMessenger();

run({ crossChainMessenger });
