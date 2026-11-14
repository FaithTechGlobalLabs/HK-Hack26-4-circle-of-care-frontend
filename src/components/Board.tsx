"use client";

import { useCallback } from "react";
import { getBoard } from "@/lib/api";
import { useResource } from "@/lib/useResource";
import BoardLayout, { REFRESH_MS, useBoardFilters } from "./BoardLayout";
import RequestRow from "./RequestRow";

/** "/" — people who need help. */
export default function Board() {
  const boardFilters = useBoardFilters();
  const { filters } = boardFilters;
  const load = useCallback(() => getBoard(filters), [filters]);
  const { data, error, loading, reload } = useResource(load, REFRESH_MS);

  return (
    <BoardLayout
      title="Who can you help this week?"
      intro="People asked for help on WhatsApp and agreed to share these notes. Where they also agreed to share their number, you can message them on WhatsApp."
      columns={["Request"]}
      emptyText="No open requests right now. New ones appear here as soon as someone agrees to share."
      filters={boardFilters}
      options={data}
      itemCount={data ? data.requests.length : null}
      error={error}
      loading={loading}
      reload={reload}
    >
      {data?.requests.map((req) => <RequestRow key={req.id} req={req} />)}
    </BoardLayout>
  );
}
