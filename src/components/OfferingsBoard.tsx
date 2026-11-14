"use client";

import { useCallback } from "react";
import { getOfferings } from "@/lib/api";
import { useResource } from "@/lib/useResource";
import BoardLayout, { REFRESH_MS, useBoardFilters } from "./BoardLayout";
import OfferingRow from "./OfferingRow";

/** "/offers" — people offering help. Browse only; coordinators match them up. */
export default function OfferingsBoard() {
  const boardFilters = useBoardFilters();
  const { filters } = boardFilters;
  const load = useCallback(() => getOfferings(filters), [filters]);
  const { data, error, loading, reload } = useResource(load, REFRESH_MS);

  return (
    <BoardLayout
      title="Who's offering to help"
      intro="People told the WhatsApp bot what they can give and agreed to share it. Where they also agreed to share their number, you can message them on WhatsApp."
      columns={["Offer"]}
      emptyText="No offers of help yet. New ones appear here as soon as a volunteer shares one."
      filters={boardFilters}
      options={data}
      itemCount={data ? data.offerings.length : null}
      error={error}
      loading={loading}
      reload={reload}
    >
      {data?.offerings.map((o) => <OfferingRow key={o.id} offering={o} />)}
    </BoardLayout>
  );
}
