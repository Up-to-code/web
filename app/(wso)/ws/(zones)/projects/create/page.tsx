import AgPropertyForm from "@/components/shared/ag-aui/AgPropertyForm";

/**
 * WHY:   Projects need a direct-mode creation route to complement AI-driven draft creation.
 * WHAT:  Renders the mock create-project flow.
 * HOW:   Uses the AgPropertyForm directly to manage its own layout and header.
 */
export default function CreateProjectPage() {
  return (
    <div className="flex min-h-full flex-col p-6 lg:p-12">
      <AgPropertyForm />
    </div>
  );
}
