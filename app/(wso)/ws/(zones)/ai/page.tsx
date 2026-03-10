import AIPage from "./AIPage";

/**
 * WHY:   The route entry should stay thin while the AI workspace UI lives in an isolated folder.
 * WHAT:  Delegates `/ws/ai` rendering to the client-side AI page orchestrator.
 * HOW:   Keeps the route file minimal and pushes all UI state into `AIPage/`.
 */
export default function AiPageRoute() {
  return <AIPage />;
}
