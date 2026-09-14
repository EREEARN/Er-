export type Bounty = {
    id: string;
    status: string;
    daysLeft: string;
    title: string;
    tags: string[];
    reward: string;
    rewardUsd: string;
    poster: string;
    postedAgo: string;
    deadline: string;
    assetType: string;
    contractState: string;
    description: string[];
    requirements: string[];
    deliverables: string[];
    sorobanAddress: string;
};

export const bounties: Bounty[] = [
    {
        id: "build-stellar-wallet-connector-react-hook",
        status: "Open",
        daysLeft: "5 days left",
        title: "Build Stellar Wallet Connector React Hook",
        tags: ["Frontend", "React", "Stellar"],
        reward: "1,200 XLM",
        rewardUsd: "~ $144 USD (Testnet only)",
        poster: "Stellar Nigeria Community",
        postedAgo: "Posted 1 day ago",
        deadline: "May 18, 2026",
        assetType: "Native XLM",
        contractState: "Locked",
        description: [
            "We need a lightweight React hook that connects to popular Stellar wallets (Freighter, Albedo) and exposes a simple API for signing and submitting transactions from any Next.js or React app.",
        ],
        requirements: [
            "Support Freighter and Albedo wallet providers.",
            "Expose connect, disconnect, and signTransaction methods.",
            "Written in TypeScript with full type definitions.",
        ],
        deliverables: [
            "GitHub repository URL containing the hook package.",
            "Usage documentation with a working example app.",
        ],
        sorobanAddress: "CA21...F91K4",
    },
    {
        id: "implement-soroban-multi-sig-escrow-contract",
        status: "Open",
        daysLeft: "12 days left",
        title: "Implement Soroban Multi-Sig Escrow Contract",
        tags: ["Rust", "Soroban", "Smart Contract", "Stellar", "Testing"],
        reward: "3,500 XLM",
        rewardUsd: "~ $420 USD (Testnet only)",
        poster: "Stellar Nigeria Community",
        postedAgo: "Posted 2 days ago",
        deadline: "March 20, 2026",
        assetType: "Native XLM",
        contractState: "Locked",
        description: [
            "We require a reference multi-signature escrow smart contract implementation built using Soroban, the smart contract platform for Stellar. The contract should allow a Poster to lock funds, and require N out of M predefined admin/arbitrator signatures to authorize release or refund in case of dispute.",
            "This contract will serve as one of the key baseline blueprints for standard trade agreements on ÉreEARN Testnet. Clean Rust code, comprehensive unit tests, and thorough documentation are required.",
        ],
        requirements: [
            "Complete Soroban smart contract written in Rust.",
            "Escrow state must securely track poster address, contributor address, locked token identifier, and fee parameters.",
            "Dynamic configuration of signers and signature threshold ratio.",
            "100% test coverage with mock ledger environments.",
        ],
        deliverables: [
            "GitHub repository URL containing the Soroban package.",
            "Tested WASM build bytecode output.",
            "ReadMe tutorial outlining build, test, and on-chain deploy instructions.",
        ],
        sorobanAddress: "CC54...A72G3",
    },
    {
        id: "develop-horizon-rest-api-python-wrapper",
        status: "Open",
        daysLeft: "8 days left",
        title: "Develop Horizon REST API Python wrapper",
        tags: ["Python", "Horizon", "Stellar"],
        reward: "1,800 XLM",
        rewardUsd: "~ $216 USD (Testnet only)",
        poster: "Stellar Nigeria Community",
        postedAgo: "Posted 3 days ago",
        deadline: "May 25, 2026",
        assetType: "Native XLM",
        contractState: "Locked",
        description: [
            "Build a typed Python wrapper around the Horizon REST API to simplify querying accounts, transactions, and payments for developers building on Stellar.",
        ],
        requirements: [
            "Cover accounts, transactions, payments, and effects endpoints.",
            "Fully typed with Python type hints and published to PyPI.",
        ],
        deliverables: [
            "GitHub repository with source and tests.",
            "PyPI package listing and usage documentation.",
        ],
        sorobanAddress: "CB88...D63M2",
    },
    {
        id: "soroban-event-listener-indexer-backend",
        status: "Open",
        daysLeft: "14 days left",
        title: "Soroban Event Listener indexer backend",
        tags: ["Rust", "Indexer", "Backend"],
        reward: "4,000 XLM",
        rewardUsd: "~ $480 USD (Testnet only)",
        poster: "Stellar Nigeria Community",
        postedAgo: "Posted 4 days ago",
        deadline: "June 1, 2026",
        assetType: "Native XLM",
        contractState: "Locked",
        description: [
            "Build a backend service that listens for Soroban contract events and indexes them into a queryable database for downstream dashboards and alerts.",
        ],
        requirements: [
            "Written in Rust with async event streaming.",
            "Persist indexed events to Postgres with a documented schema.",
        ],
        deliverables: [
            "GitHub repository with source code and deployment instructions.",
            "Sample dashboard query demonstrating indexed data.",
        ],
        sorobanAddress: "CD12...E45N7",
    },
    {
        id: "react-native-onboarding-wallet-design-mock",
        status: "Open",
        daysLeft: "3 days left",
        title: "React Native onboarding wallet design mock",
        tags: ["Mobile", "Figma", "UI Design"],
        reward: "1,000 XLM",
        rewardUsd: "~ $120 USD (Testnet only)",
        poster: "Stellar Nigeria Community",
        postedAgo: "Posted 5 days ago",
        deadline: "May 22, 2026",
        assetType: "Native XLM",
        contractState: "Locked",
        description: [
            "Design a polished onboarding and wallet-connect flow for a React Native mobile app, including empty, loading, and error states.",
        ],
        requirements: [
            "Delivered as a Figma file with organized components and variants.",
            "Consistent with ÉreEARN's existing brand colors and typography.",
        ],
        deliverables: [
            "Figma file link with edit access.",
            "Exported PNG previews of each screen.",
        ],
        sorobanAddress: "CE33...G56P9",
    },
    {
        id: "write-stellar-ledger-explorer-tutorial",
        status: "Open",
        daysLeft: "1 day left",
        title: "Write Stellar ledger explorer tutorial",
        tags: ["Technical Writing", "Testnet"],
        reward: "600 XLM",
        rewardUsd: "~ $72 USD (Testnet only)",
        poster: "Stellar Nigeria Community",
        postedAgo: "Posted 6 days ago",
        deadline: "May 15, 2026",
        assetType: "Native XLM",
        contractState: "Locked",
        description: [
            "Write a beginner-friendly tutorial walking through how to explore ledgers, transactions, and operations using a Stellar Testnet explorer.",
        ],
        requirements: [
            "Written in clear Markdown with screenshots.",
            "Cover at least three real Testnet transaction examples.",
        ],
        deliverables: [
            "Markdown tutorial file ready for publishing.",
            "Screenshots hosted alongside the tutorial.",
        ],
        sorobanAddress: "CF77...H89Q1",
    },
];

export function getBountyById(id: string) {
    return bounties.find((bounty) => bounty.id === id);
}
