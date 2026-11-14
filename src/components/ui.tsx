"use client";

import styled, { css } from "styled-components";
import { categoryColors } from "@/lib/theme";
import Icon from "./Icon";

const condCaps = css`
  font-family: ${({ theme }) => theme.fonts.cond};
  font-weight: 700;
  text-transform: uppercase;
`;

export const Hero = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 8px 0 20px;
`;

export const Muted = styled.p`
  color: ${({ theme }) => theme.colors.muted};
`;

export const Label = styled.span`
  ${condCaps};
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Button = styled.button<{ $small?: boolean; $ghost?: boolean }>`
  ${condCaps};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: ${({ $small }) => ($small ? "42px" : "48px")};
  padding: 0 ${({ $small }) => ($small ? "14px" : "18px")};
  font-size: ${({ $small }) => ($small ? "1.02rem" : "1.15rem")};
  letter-spacing: 0.05em;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme, $ghost }) => ($ghost ? theme.colors.surface : theme.colors.primary)};
  color: ${({ theme, $ghost }) => ($ghost ? theme.colors.primary : theme.colors.primaryInk)};

  svg {
    width: 20px;
    height: 20px;
  }
  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
`;

export const Tag = styled.span<{ $urgent?: boolean }>`
  ${condCaps};
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  padding: 1px 8px;
  background: ${({ theme, $urgent }) => ($urgent ? theme.colors.dangerSoft : theme.colors.soft)};
  color: ${({ theme, $urgent }) => ($urgent ? theme.colors.danger : theme.colors.muted)};
`;

export const Notice = styled.p<{ $tone?: "success" | "error" }>`
  padding: 12px 14px;
  font-weight: 600;
  background: ${({ theme, $tone }) =>
    $tone === "error" ? theme.colors.dangerSoft : theme.colors.primarySoft};
  color: ${({ theme, $tone }) => ($tone === "error" ? theme.colors.danger : theme.colors.ink)};
`;

export const Empty = styled.div`
  padding: 40px 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

const Square = styled.span<{ $cat: string }>`
  flex: none;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, $cat }) => categoryColors(theme, $cat).tint};
  color: ${({ theme, $cat }) => categoryColors(theme, $cat).color};
`;

/** Pale tinted square with the category icon in its colour. */
export function CategoryBlock({ category }: { category: string }) {
  return (
    <Square $cat={category}>
      <Icon name={category} size={26} />
    </Square>
  );
}
