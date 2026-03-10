import HistoryPage from "../HistoryPage";

/**
 * WHY:   The AI zone local navigation needs a lightweight history route alongside the conversation screen.
 * WHAT:  Renders the AI history page.
 * HOW:   Delegates to the page-local history component folder.
 */
export default function AiHistoryRoute() {
  return <HistoryPage />;
}
