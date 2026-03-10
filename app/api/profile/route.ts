import { toErrorResponse } from "@/server/contracts/errors";
import { getCurrentProfileForCurrentUser } from "@/server/domains/profiles/service";

/**
 * WHY:   The migrated gateway needs a stable profile endpoint separate from raw Convex queries.
 * WHAT:  Returns the current authenticated user's profile summary.
 * HOW:   Delegates to the profiles domain service and maps failures through the domain error serializer.
 */
export async function GET() {
  try {
    const profile = await getCurrentProfileForCurrentUser();
    return Response.json(profile);
  } catch (error) {
    return toErrorResponse(error);
  }
}
