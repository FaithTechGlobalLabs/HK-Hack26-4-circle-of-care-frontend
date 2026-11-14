"use client";

import { useCallback, type ReactNode } from "react";
import Link from "next/link";
import styled from "styled-components";
import { getPost } from "@/lib/api";
import { timeAgo } from "@/lib/format";
import type { Post } from "@/lib/types";
import { useResource } from "@/lib/useResource";
import ApiErrorView from "./ApiErrorView";
import { REFRESH_MS } from "./BoardLayout";
import Icon from "./Icon";
import { Contact, Tags } from "./RequestRow";
import { CategoryBlock, Empty, Label, Muted, Notice, Tag } from "./ui";

const BOARDS = {
  need: { href: "/", label: "Need help" },
  offer: { href: "/offers", label: "Offering help" },
} as const;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 44px;
  margin: 4px 0 12px;
  font-family: ${({ theme }) => theme.fonts.cond};
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.muted};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  svg {
    width: 20px;
    height: 20px;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 16px;
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.rule};

  h1 {
    font-size: clamp(1.9rem, 6.5vw, 2.6rem);
    overflow-wrap: anywhere;
  }
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 18px 0 20px;
`;

const Lead = styled.p`
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1.35;
  overflow-wrap: anywhere;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
`;

const Details = styled.p`
  white-space: pre-line;
  overflow-wrap: anywhere;
`;

const Facts = styled.dl`
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;

  > div {
    display: grid;
    gap: 2px;
    padding: 10px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  }
  > div:last-child {
    border-bottom: 0;
  }
  dt {
    font-family: ${({ theme }) => theme.fonts.cond};
    font-weight: 700;
    font-size: 0.95rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.muted};
  }
  dd {
    margin: 0;
    overflow-wrap: anywhere;
  }

  @media (min-width: 560px) {
    > div {
      grid-template-columns: 170px 1fr;
      gap: 12px;
      align-items: baseline;
    }
  }
`;

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function TagList({ labels }: { labels: string[] }) {
  if (labels.length === 0) return <>Not given</>;
  return (
    <Tags>
      {labels.map((label, i) => (
        <Tag key={`${i}-${label}`}>{label}</Tag>
      ))}
    </Tags>
  );
}

/** "Started 2 hours ago · last message 5 minutes ago · 12 messages" */
function timeline(post: Post) {
  const count = post.message_count;
  return [
    `Started ${timeAgo(post.started_at ?? post.created_at)}`,
    post.last_message_at ? `last message ${timeAgo(post.last_message_at)}` : "",
    count ? `${count} ${count === 1 ? "message" : "messages"}` : "",
  ]
    .filter(Boolean)
    .join(" · ");
}

function Back({ kind }: { kind?: Post["kind"] }) {
  const board = BOARDS[kind ?? "need"];
  return (
    <BackLink href={board.href}>
      <Icon name="back" />
      {kind ? `${board.label} board` : "Back to the board"}
    </BackLink>
  );
}

/** Shown while the route params or the post are loading. */
export function PostLoading() {
  return (
    <>
      <Back />
      <Empty aria-live="polite">Loading…</Empty>
    </>
  );
}

function NotOnBoard() {
  return (
    <>
      <Back />
      <Empty role="alert">
        <p>This post is no longer on the board. It may already have a helper, or the person asked to take it down.</p>
        <Muted>
          <Link href={BOARDS.need.href}>Need help board</Link> · <Link href={BOARDS.offer.href}>Offering help board</Link>
        </Muted>
      </Empty>
    </>
  );
}

function PostView({ post }: { post: Post }) {
  const isNeed = post.kind === "need";
  const noun = isNeed ? "request" : "offer";

  return (
    <article>
      <Header>
        <CategoryBlock category={post.category} />
        <div>
          <Label>
            {post.kind_label} · {post.ref}
          </Label>
          <h1>{[post.category_label, post.district].filter(Boolean).join(" · ")}</h1>
        </div>
      </Header>

      <Intro>
        <Lead>{post.summary}</Lead>
        <Muted>{timeline(post)}</Muted>
        <Contact phone={post.contact_phone} link={post.contact_link} />
      </Intro>

      <Section aria-labelledby="about">
        <h2 id="about">About this {noun}</h2>
        <Details>{post.details || post.summary}</Details>
      </Section>

      <Section aria-labelledby="facts">
        <h2 id="facts">At a glance</h2>
        <Facts>
          <Fact label="Category">{post.category_label}</Fact>
          <Fact label="District">{post.district || "Not given"}</Fact>
          {isNeed && (
            <Fact label="Urgency">
              {post.urgency === "high" ? <Tag $urgent>{post.urgency_label}</Tag> : post.urgency_label}
            </Fact>
          )}
          <Fact label={isNeed ? "What would help" : "What they offer"}>
            <TagList labels={post.needs} />
          </Fact>
          {isNeed && (
            <Fact label="Household">
              <TagList labels={post.household} />
            </Fact>
          )}
          {!isNeed && <Fact label="Available">{post.availability || "Not given"}</Fact>}
          <Fact label="Language">{post.language}</Fact>
          <Fact label="Status">{post.status_label}</Fact>
        </Facts>
      </Section>
    </article>
  );
}

/** "/posts/[id]": one post from either board, refreshed like the boards. */
export default function PostDetail({ id }: { id: string }) {
  const load = useCallback(() => getPost(id), [id]);
  const { data, error, loading, reload } = useResource(load, REFRESH_MS);

  if (error?.kind === "not_found") return <NotOnBoard />;
  if (error && (!data || error.kind === "passcode")) {
    return (
      <>
        <Back kind={data?.kind} />
        <ApiErrorView error={error} onRetry={reload} />
      </>
    );
  }
  if (loading || !data) return <PostLoading />;

  return (
    <>
      <Back kind={data.kind} />
      {error && <Notice $tone="error">Can&apos;t refresh right now. Showing what we loaded last.</Notice>}
      <PostView post={data} />
    </>
  );
}
