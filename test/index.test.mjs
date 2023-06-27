import { expect, test, vi, beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { rest } from "msw";

import run from "../src/index.mjs";

function randomWait() {
  if (Math.random() > 0.8) {
    return vi.fn().mockRejectedValue("error mining tx");
  } else {
    return vi.fn().mockResolvedValue();
  }
}
const resolveTransaction = (hash) =>
  new Promise((r) =>
    setTimeout(() => r({ hash, wait: randomWait() }), Math.random() * 300)
  );

const crossChainMessenger = {
  proveMessage: vi.fn(resolveTransaction),
  finalizeMessage: vi.fn(resolveTransaction),
};

const server = setupServer(
  rest.get(process.env.API_URL, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(withdrawals))
  )
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("run", async () => {
  await run({ crossChainMessenger });
  expect(crossChainMessenger.proveMessage).toHaveBeenCalledTimes(9);
  expect(crossChainMessenger.finalizeMessage).toHaveBeenCalledTimes(4);
});

const withdrawals = {
  items: [
    {
      challenge_period_end: null,
      from: {
        hash: "0xf66CcEDcD3f99C234cefA713Ab7399F5DD3a6770",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      l1_tx_hash: null,
      l2_timestamp: "2023-06-16T04:57:10.000000Z",
      l2_tx_hash:
        "0x1489684e10902994e9f923d5136adad9939c7960e18981101c32574ad3f80c47",
      msg_nonce: 12,
      msg_nonce_raw:
        "1766847064778384329583297500742918515827483896875618958121606201292619788",
      msg_nonce_version: 1,
      status: "Ready to prove",
    },
    {
      challenge_period_end: null,
      from: {
        hash: "0xc2E2B715d9e302947Ec7e312fd2384b5a1296099",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      l1_tx_hash: null,
      l2_timestamp: "2023-06-15T23:40:34.000000Z",
      l2_tx_hash:
        "0x5b0f385ccb5cf6c5b4bca62b1d5a1b75ed019ce7319b9a8189ae398d5291d990",
      msg_nonce: 11,
      msg_nonce_raw:
        "1766847064778384329583297500742918515827483896875618958121606201292619787",
      msg_nonce_version: 1,
      status: "Ready to prove",
    },
    {
      challenge_period_end: null,
      from: {
        hash: "0xf66CcEDcD3f99C234cefA713Ab7399F5DD3a6770",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      l1_tx_hash: null,
      l2_timestamp: "2023-06-14T05:49:40.000000Z",
      l2_tx_hash:
        "0x570df3b07bd2f75d1a25a63bd8f4b624a46a67f57db1270afc89cabad97977f7",
      msg_nonce: 10,
      msg_nonce_raw:
        "1766847064778384329583297500742918515827483896875618958121606201292619786",
      msg_nonce_version: 1,
      status: "Ready to prove",
    },
    {
      challenge_period_end: null,
      from: {
        hash: "0xf66CcEDcD3f99C234cefA713Ab7399F5DD3a6770",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      l1_tx_hash: null,
      l2_timestamp: "2023-06-14T05:40:20.000000Z",
      l2_tx_hash:
        "0x675dc1c3cee8b8322e64b1466adbf959f801ae4a9a853724686806b1d77cf16d",
      msg_nonce: 9,
      msg_nonce_raw:
        "1766847064778384329583297500742918515827483896875618958121606201292619785",
      msg_nonce_version: 1,
      status: "Ready to prove",
    },
    {
      challenge_period_end: null,
      from: {
        hash: "0xf66CcEDcD3f99C234cefA713Ab7399F5DD3a6770",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      l1_tx_hash: null,
      l2_timestamp: "2023-06-14T05:39:28.000000Z",
      l2_tx_hash:
        "0x881779ecb4eab38354aba2d9d550bc1e4d31998a6ca82e0c1867757b95c1852c",
      msg_nonce: 8,
      msg_nonce_raw:
        "1766847064778384329583297500742918515827483896875618958121606201292619784",
      msg_nonce_version: 1,
      status: "Ready to prove",
    },
    {
      challenge_period_end: null,
      from: {
        hash: "0xf66CcEDcD3f99C234cefA713Ab7399F5DD3a6770",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      l1_tx_hash: null,
      l2_timestamp: "2023-06-14T05:34:54.000000Z",
      l2_tx_hash:
        "0x99802c66753af6b0f374116d5cfe664b542fe0f15a43714521133494dc26d3b2",
      msg_nonce: 7,
      msg_nonce_raw:
        "1766847064778384329583297500742918515827483896875618958121606201292619783",
      msg_nonce_version: 1,
      status: "Ready to prove",
    },
    {
      challenge_period_end: null,
      from: {
        hash: "0xf66CcEDcD3f99C234cefA713Ab7399F5DD3a6770",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      l1_tx_hash: null,
      l2_timestamp: "2023-06-14T05:21:54.000000Z",
      l2_tx_hash:
        "0x215d62828e73793710b5b4463b1668de6a98a5323580b811af6ea0a2d9b05ce9",
      msg_nonce: 6,
      msg_nonce_raw:
        "1766847064778384329583297500742918515827483896875618958121606201292619782",
      msg_nonce_version: 1,
      status: "Ready to prove",
    },
    {
      challenge_period_end: null,
      from: {
        hash: "0xf66CcEDcD3f99C234cefA713Ab7399F5DD3a6770",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      l1_tx_hash: null,
      l2_timestamp: "2023-06-14T05:19:10.000000Z",
      l2_tx_hash:
        "0x90b79797d6decd0803e50c63fa23674b7629185a8203f1ea317f4d83a3ae4863",
      msg_nonce: 5,
      msg_nonce_raw:
        "1766847064778384329583297500742918515827483896875618958121606201292619781",
      msg_nonce_version: 1,
      status: "Ready to prove",
    },
    {
      challenge_period_end: null,
      from: {
        hash: "0xf66CcEDcD3f99C234cefA713Ab7399F5DD3a6770",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      l1_tx_hash: null,
      l2_timestamp: "2023-06-14T05:15:02.000000Z",
      l2_tx_hash:
        "0x524070b42970509ee8e0b0ed46fbc8f5c7c825803258e154c85fcde7f24cf509",
      msg_nonce: 4,
      msg_nonce_raw:
        "1766847064778384329583297500742918515827483896875618958121606201292619780",
      msg_nonce_version: 1,
      status: "Ready to prove",
    },
    {
      challenge_period_end: null,
      from: {
        hash: "0xf66CcEDcD3f99C234cefA713Ab7399F5DD3a6770",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      l1_tx_hash: null,
      l2_timestamp: "2023-06-13T10:15:10.000000Z",
      l2_tx_hash:
        "0xba1d1696c548c4de9585057ac6b383f26dda3b9fe79bf1c353faf5a8c090df71",
      msg_nonce: 3,
      msg_nonce_raw:
        "1766847064778384329583297500742918515827483896875618958121606201292619779",
      msg_nonce_version: 1,
      status: "Ready for relay",
    },
    {
      challenge_period_end: null,
      from: {
        hash: "0xf66CcEDcD3f99C234cefA713Ab7399F5DD3a6770",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      l1_tx_hash: null,
      l2_timestamp: "2023-06-13T09:56:30.000000Z",
      l2_tx_hash:
        "0x7f74fc377432e9f2773fa433ead3ddfefde1d2094a5a46049c0d3681b59ce13d",
      msg_nonce: 2,
      msg_nonce_raw:
        "1766847064778384329583297500742918515827483896875618958121606201292619778",
      msg_nonce_version: 1,
      status: "Ready for relay",
    },
    {
      challenge_period_end: null,
      from: {
        hash: "0xf66CcEDcD3f99C234cefA713Ab7399F5DD3a6770",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      l1_tx_hash: null,
      l2_timestamp: "2023-06-13T07:38:22.000000Z",
      l2_tx_hash:
        "0xef10cb3eff76297a742027a312bffc4e5629e92c1df09602486382ccc2db93f5",
      msg_nonce: 1,
      msg_nonce_raw:
        "1766847064778384329583297500742918515827483896875618958121606201292619777",
      msg_nonce_version: 1,
      status: "Ready for relay",
    },
    {
      challenge_period_end: null,
      from: {
        hash: "0xe9ee758b599BAD62D5552D70141466a049E29995",
        implementation_name: null,
        is_contract: false,
        is_verified: false,
        name: null,
        private_tags: [],
        public_tags: [],
        watchlist_names: [],
      },
      l1_tx_hash: null,
      l2_timestamp: "2023-06-10T04:34:18.000000Z",
      l2_tx_hash:
        "0x6d59d85496e8fb7388c5cff9aa1615efb9c21234f3c8655a5a81d3b4511d0278",
      msg_nonce: 0,
      msg_nonce_raw:
        "1766847064778384329583297500742918515827483896875618958121606201292619776",
      msg_nonce_version: 1,
      status: "Ready for relay",
    },
  ],
  next_page_params: null,
};

// test("JSON", () => {
//   const input = {
//     foo: "hello",
//     bar: "world",
//   };

//   const output = JSON.stringify(input);

//   expect(output).eq('{"foo":"hello","bar":"world"}');
//   assert.deepEqual(JSON.parse(output), input, "matches original");
// });
