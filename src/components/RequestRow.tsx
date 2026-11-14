"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import styled from "styled-components";
import { timeAgo } from "@/lib/format";
import type { CareRequest } from "@/lib/types";
import Icon from "./Icon";
import { CategoryBlock, Tag } from "./ui";

export const Row = styled.article`
  position: relative;
  display: flex;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
`;

export const Body = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

export const Summary = styled.p`
  font-weight: 700;
  font-size: 1.08rem;
  line-height: 1.35;
  overflow-wrap: anywhere;
`;

/** The summary links to the post. Its ::after stretches over the whole row so the row is clickable,
 * while the WhatsApp link sits above it and stays clickable on its own. */
const SummaryLinkStyled = styled(Link)`
  color: inherit;
  text-decoration: none;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
  }
  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
  }
  &:focus-visible {
    outline: none;
  }
  &:focus-visible::after {
    outline: 3px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export function SummaryLink({ id, children }: { id: number; children: ReactNode }) {
  return (
    <Summary>
      <SummaryLinkStyled href={`/posts/${id}`}>{children}</SummaryLinkStyled>
    </Summary>
  );
}

export const Meta = styled.p`
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Count = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;

  b {
    font-family: ${({ theme }) => theme.fonts.cond};
    font-size: 2.3rem;
    font-weight: 700;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  span {
    max-width: 72px;
    font-size: 0.82rem;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const ContactLinkStyled = styled.a`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: ${({ theme }) => theme.fonts.cond};
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  svg {
    width: 18px;
    height: 18px;
  }
`;

/** The person's WhatsApp number when they agreed to share it, otherwise a note. */
export function Contact({ phone, link }: { phone: string; link: string }) {
  if (!phone) return <Meta>Contact through a coordinator</Meta>;
  return (
    <ContactLinkStyled href={link} target="_blank" rel="noopener noreferrer">
      <Icon name="chat" />
      WhatsApp {phone}
    </ContactLinkStyled>
  );
}

type MetaFields = Pick<CareRequest, "category_label" | "district" | "created_at" | "ref">;

/** "Food · Tsuen Wan · 5 minutes ago · R-1012" */
export function metaLine(req: MetaFields, withTime: boolean) {
  return [
    req.category_label || "General",
    req.district,
    withTime ? timeAgo(req.created_at) : "",
    req.ref,
  ]
    .filter(Boolean)
    .join(" · ");
}

export default function RequestRow({ req }: { req: CareRequest }) {
  return (
    <Row>
      <CategoryBlock category={req.category} />
      <Body>
        <SummaryLink id={req.id}>{req.summary}</SummaryLink>
        <Meta>{metaLine(req, true)}</Meta>
        <Tags>
          {req.urgency === "high" && <Tag $urgent>{req.urgency_label || "Today or tomorrow"}</Tag>}
          {[...req.needs, ...req.household].map((label, i) => (
            <Tag key={`${i}-${label}`}>{label}</Tag>
          ))}
        </Tags>
        <Contact phone={req.contact_phone} link={req.contact_link} />
      </Body>
      <Count>
        <b>{req.still_needed}</b>
        <span>{req.helpers_wanted > 1 ? `of ${req.helpers_wanted} helpers` : "helper"}</span>
      </Count>
    </Row>
  );
}
