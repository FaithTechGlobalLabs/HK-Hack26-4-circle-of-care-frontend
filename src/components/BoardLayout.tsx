"use client";

import { useMemo, useState, type ReactNode } from "react";
import styled from "styled-components";
import type { ApiError } from "@/lib/api";
import { categoryColors } from "@/lib/theme";
import type { BoardFilters, Category } from "@/lib/types";
import ApiErrorView from "./ApiErrorView";
import BoardTabs from "./BoardTabs";
import Icon from "./Icon";
import { Empty, Hero, Label, Muted, Notice } from "./ui";

/** How often the boards re-fetch, so new WhatsApp chats show up during a demo. */
export const REFRESH_MS = 30_000;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
`;

const Chip = styled.button<{ $cat?: string; $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 40px;
  padding: 0 12px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.cond};
  font-weight: 700;
  font-size: 1.02rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border: 1.5px solid ${({ theme, $active }) => ($active ? theme.colors.ink : theme.colors.rule)};
  background: ${({ theme, $active }) => ($active ? theme.colors.ink : theme.colors.surface)};
  color: ${({ theme, $active }) => ($active ? theme.colors.surface : theme.colors.muted)};

  svg {
    width: 18px;
    height: 18px;
    color: ${({ theme, $cat, $active }) =>
      $active ? theme.colors.surface : categoryColors(theme, $cat ?? "").color};
  }
`;

const Select = styled.select`
  min-height: 40px;
  padding: 0 10px;
  border: 1.5px solid ${({ theme }) => theme.colors.rule};
  border-radius: 0;
  background: ${({ theme }) => theme.colors.surface};
`;

const ListHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-top: 1.5px solid ${({ theme }) => theme.colors.rule};
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
`;

/** Category + district filter state shared by both boards. */
export function useBoardFilters() {
  const [category, setCategory] = useState("");
  const [district, setDistrict] = useState("");
  const filters: BoardFilters = useMemo(() => ({ category, district }), [category, district]);
  return { filters, setCategory, setDistrict };
}

interface BoardLayoutProps {
  title: string;
  intro: string;
  /** Left / right column labels above the list. Right is optional. */
  columns: [string, string?];
  emptyText: string;
  filters: ReturnType<typeof useBoardFilters>;
  options: { categories: Category[]; districts: string[] } | null;
  itemCount: number | null;
  error: ApiError | null;
  loading: boolean;
  reload: () => void;
  children: ReactNode;
}

/** Tabs, heading, filters and the list states (loading / empty / error / passcode) for a board. */
export default function BoardLayout({
  title,
  intro,
  columns,
  emptyText,
  filters: { filters, setCategory, setDistrict },
  options,
  itemCount,
  error,
  loading,
  reload,
  children,
}: BoardLayoutProps) {
  const { category = "", district = "" } = filters;

  return (
    <>
      <BoardTabs />
      {error && (!options || error.kind === "passcode") ? (
        <ApiErrorView error={error} onRetry={reload} />
      ) : (
        <>
          <Hero>
            <h1>{title}</h1>
            <Muted>{intro}</Muted>
          </Hero>

          {options && (
            <Filters role="group" aria-label="Filter">
              <Chip type="button" $active={!category} aria-pressed={!category} onClick={() => setCategory("")}>
                All
              </Chip>
              {options.categories.map((c) => (
                <Chip
                  key={c.value}
                  type="button"
                  $cat={c.value}
                  $active={category === c.value}
                  aria-pressed={category === c.value}
                  onClick={() => setCategory(c.value)}
                >
                  <Icon name={c.value} />
                  {c.label}
                </Chip>
              ))}
              {(options.districts.length > 0 || district) && (
                <Select aria-label="District" value={district} onChange={(e) => setDistrict(e.target.value)}>
                  <option value="">All districts</option>
                  {options.districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </Select>
              )}
            </Filters>
          )}

          {error && <Notice $tone="error">Can&apos;t refresh right now. Showing the last list we loaded.</Notice>}

          <ListHead>
            <Label>{columns[0]}</Label>
            {columns[1] && <Label>{columns[1]}</Label>}
          </ListHead>

          {loading && <Empty aria-live="polite">Loading…</Empty>}
          {children}
          {itemCount === 0 && (
            <Empty>
              {category || district ? "Nothing for this filter right now." : emptyText}
            </Empty>
          )}
        </>
      )}
    </>
  );
}
