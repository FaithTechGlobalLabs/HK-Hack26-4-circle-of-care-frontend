"use client";

import styled from "styled-components";
import { timeAgo } from "@/lib/format";
import type { CareRequest } from "@/lib/types";
import Icon from "./Icon";
import { CategoryBlock, Tag } from "./ui";

export const Row = styled.article`
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
        <Summary>{req.summary}</Summary>
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
