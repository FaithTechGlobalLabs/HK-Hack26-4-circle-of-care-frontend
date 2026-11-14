"use client";

import type { ApiError } from "@/lib/api";
import PasscodeGate from "./PasscodeGate";
import { Button, Empty } from "./ui";

const MESSAGES: Record<string, string> = {
  unreachable: "Can't reach the server. Is Django running on port 8000?",
  not_found: "This request isn't on the board any more. It may already have enough helpers.",
  other: "Something went wrong loading this page.",
};

/** Full-page error state for a failed API call; asks for the passcode on 401. */
export default function ApiErrorView({ error, onRetry }: { error: ApiError; onRetry: () => void }) {
  if (error.kind === "passcode") return <PasscodeGate wrong={error.sentPasscode} onSaved={onRetry} />;

  return (
    <Empty role="alert">
      <p>{MESSAGES[error.kind] ?? MESSAGES.other}</p>
      {error.kind !== "not_found" && (
        <Button type="button" $ghost $small onClick={onRetry}>
          Try again
        </Button>
      )}
    </Empty>
  );
}
