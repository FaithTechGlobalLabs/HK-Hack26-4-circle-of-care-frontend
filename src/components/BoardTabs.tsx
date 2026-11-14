"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const TABS = [
  { href: "/", label: "Need help" },
  { href: "/offers", label: "Offering help" },
];

const Tabs = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 4px 0 20px;
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.rule};
`;

const Tab = styled(Link)<{ $active: boolean }>`
  padding: 12px 8px;
  text-align: center;
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.cond};
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme, $active }) => ($active ? theme.colors.ink : theme.colors.muted)};
  box-shadow: ${({ theme, $active }) => ($active ? `inset 0 -3px 0 ${theme.colors.primary}` : "none")};
`;

/** "Need help" | "Offering help" switch shown above both boards. */
export default function BoardTabs() {
  const pathname = usePathname();
  return (
    <Tabs aria-label="Board">
      {TABS.map((t) => (
        <Tab key={t.href} href={t.href} $active={pathname === t.href} aria-current={pathname === t.href ? "page" : undefined}>
          {t.label}
        </Tab>
      ))}
    </Tabs>
  );
}
