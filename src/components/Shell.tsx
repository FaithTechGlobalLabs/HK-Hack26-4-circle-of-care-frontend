"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import styled from "styled-components";

const Wrap = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 max(16px, env(safe-area-inset-right, 0px)) 64px max(16px, env(safe-area-inset-left, 0px));
`;

const Top = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 0;
  flex-wrap: wrap;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: baseline;
  gap: 8px;
  text-decoration: none;

  b {
    font-family: ${({ theme }) => theme.fonts.cond};
    font-size: 1.75rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.primary};
  }
  span {
    font-size: 0.95rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <Wrap>
      <Top>
        <Brand href="/">
          <b>Circle of Care</b>
          <span lang="zh-HK">關懷圈</span>
        </Brand>
      </Top>
      <main>{children}</main>
    </Wrap>
  );
}
