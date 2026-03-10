import { requireBrokerSession } from "@/server/auth/guards";
import type { ResolvedSession } from "@/server/auth/session";
import type { OffersSnapshot } from "@/server/contracts/offers";
import { convexOffersRepository, type OffersRepository } from "@/server/infrastructure/convex/offersRepository";

type BrokerOffersDependencies = {
  requireBroker: () => Promise<ResolvedSession>;
  repository: OffersRepository;
};

const defaultDependencies: BrokerOffersDependencies = {
  requireBroker: requireBrokerSession,
  repository: convexOffersRepository,
};

/**
 * WHY:   Broker workspace offer pages need one broker-owned entrypoint for all visible offer lists.
 * WHAT:  Returns the sent, received, and marketplace offer projections for the current broker.
 * HOW:   Enforces the broker session first, then reads the auth-scoped shared offer lists in parallel.
 */
export async function getBrokerOffersSnapshot(
  dependencies: BrokerOffersDependencies = defaultDependencies,
): Promise<OffersSnapshot> {
  await dependencies.requireBroker();

  const [sent, received, marketplace] = await Promise.all([
    dependencies.repository.listSent(),
    dependencies.repository.listReceived(),
    dependencies.repository.listMarketplace(),
  ]);

  return { sent, received, marketplace };
}
