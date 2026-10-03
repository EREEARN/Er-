import { StellarWalletsKit, Networks } from "@creit-tech/stellar-wallets-kit";
import { AlbedoModule } from "@creit-tech/stellar-wallets-kit/modules/albedo";
import { FreighterModule } from "@creit-tech/stellar-wallets-kit/modules/freighter";
import { HanaModule } from "@creit-tech/stellar-wallets-kit/modules/hana";
import { LobstrModule } from "@creit-tech/stellar-wallets-kit/modules/lobstr";
import { RabetModule } from "@creit-tech/stellar-wallets-kit/modules/rabet";
import { xBullModule } from "@creit-tech/stellar-wallets-kit/modules/xbull";

let initialized = false;

/** Starts the kit with the mainstream no-config wallets. MetaMask's module is excluded: it depends on the legacy "@creit.tech/stellar-wallets-kit" package which isn't installed and breaks the build. Browser-only, safe to call multiple times. */
export function initStellarWalletsKit() {
    if (initialized || typeof window === "undefined") return;

    StellarWalletsKit.init({
        modules: [
            new FreighterModule(),
            new AlbedoModule(),
            new xBullModule(),
            new LobstrModule(),
            new RabetModule(),
            new HanaModule(),
        ],
        network: Networks.TESTNET,
    });
    initialized = true;
}

/** Shape of the errors the kit rejects with (e.g. when the user closes the auth modal). */
export type StellarWalletsKitError = { code: number; message: string };

export function isStellarWalletsKitError(error: unknown): error is StellarWalletsKitError {
    return typeof error === "object" && error !== null && "code" in error && "message" in error;
}

export { StellarWalletsKit, Networks };
