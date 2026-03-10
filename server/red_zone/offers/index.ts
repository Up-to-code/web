import { requireDeveloperSession } from "@/server/auth/guards";
import type { ResolvedSession } from "@/server/auth/session";
import type { OffersSnapshot } from "@/server/contracts/offers";
import { convexOffersRepository, type OffersRepository } from "@/server/infrastructure/convex/offersRepository";

type RedOffersDependencies = {
  requireDeveloper: () => Promise<ResolvedSession>;
  repository: OffersRepository;
};

const defaultDependencies: RedOffersDependencies = {
  requireDeveloper: requireDeveloperSession,
  repository: convexOffersRepository,
};

/**
 * WHY:   Developer workspace offer pages need one RED-owned server entrypoint instead of direct Convex queries.
 * WHAT:  Returns the sent, received, and marketplace offer lists visible to the current developer.
 * HOW:   First enforces a valid developer session, then loads the shared offer projections in parallel.
 */
export async function getRedOffersSnapshot(
  dependencies: RedOffersDependencies = defaultDependencies,
): Promise<OffersSnapshot> {
  await dependencies.requireDeveloper();

  const [sent, received, marketplace] = await Promise.all([
    dependencies.repository.listSent(),
    dependencies.repository.listReceived(),
    dependencies.repository.listMarketplace(),
  ]);

  return { sent, received, marketplace };
}
