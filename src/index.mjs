import dotenv from "dotenv";
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

    const transactions = await Promise.all(
      withdrawals.map(async ({ status, l2_tx_hash: hash }) => {
        switch (status) {
          case STATUS.prove: {
            console.log(hash, "Proving...");
            return crossChainMessenger.proveMessage(hash);
          }
          case STATUS.finalize: {
            console.log(hash, "Finalizing...");
            return crossChainMessenger.finalizeMessage(hash);
          }
        }
      })
    );

    console.log(
      `Processed ${transactions.length}/${withdrawals.length} withdrawals in ${(
        (Date.now() - start) /
        60
      ).toFixed(2)} seconds.`
    );
  } catch (error) {
    console.log("Error handling withdrawals!", error);
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

// TODO: Create CrossChainMessanger
const crossChainMessenger = {
  proveMessage: () => Promise.resolve(),
  finalizeMessage: () => Promise.resolve(),
};

run({ crossChainMessenger });
