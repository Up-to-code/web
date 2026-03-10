import { notFound } from "next/navigation";
import ClientDetailPage from "../../ClientDetailPage";
import { getCrmClientById } from "../../mockData";

type WorkspaceCrmClientDetailRouteProps = {
  params: Promise<{ clientId: string }>;
};

/**
 * WHY:   CRM client rows should open into a dedicated client detail page inside the same zone shell.
 * WHAT:  Resolves one mock client and renders its detail screen.
 * HOW:   Uses the colocated CRM lookup helpers and returns 404 when the id is unknown.
 */
export default async function WorkspaceCrmClientDetailRoute({
  params,
}: WorkspaceCrmClientDetailRouteProps) {
  const { clientId } = await params;
  const client = getCrmClientById(clientId);

  if (!client) {
    notFound();
  }

  return <ClientDetailPage client={client} />;
}
