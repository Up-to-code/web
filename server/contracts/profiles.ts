/**
 * WHY:   Profile data crosses repository, domain, and UI boundaries during workspace rendering.
 * WHAT:  ProfileSummary captures the current user's role and organization link fields.
 * HOW:   It mirrors the current web-facing subset of the Convex `userProfiles` record.
 */
export type ProfileSummary = {
  role?: string;
  roleStatus?: string;
  requestedRole?: string;
  brokerId?: string;
  REDId?: string;
  isActive?: boolean;
};
