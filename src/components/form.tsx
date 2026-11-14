"use client";

import type { ReactNode } from "react";
import styled, { css } from "styled-components";

const control = css`
  width: 100%;
  padding: 10px 12px;
  border: 1.5px solid ${({ theme }) => theme.colors.rule};
  border-radius: 0;
  background: ${({ theme }) => theme.colors.surface};

  &[aria-invalid="true"] {
    border-color: ${({ theme }) => theme.colors.danger};
  }
`;

export const Input = styled.input`
  ${control};
  min-height: 48px;
`;

export const TextArea = styled.textarea`
  ${control};
  min-height: 110px;
  resize: vertical;
`;

const LabelText = styled.label`
  display: block;
  margin-bottom: 6px;
  font-family: ${({ theme }) => theme.fonts.cond};
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;

  small {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0;
    text-transform: none;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const ErrorList = styled.ul`
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.danger};
`;

interface FieldProps {
  label: string;
  htmlFor: string;
  optional?: boolean;
  errors?: string[];
  children: ReactNode;
}

export function Field({ label, htmlFor, optional, errors, children }: FieldProps) {
  return (
    <div>
      <LabelText htmlFor={htmlFor}>
        {label} {optional && <small>(optional)</small>}
      </LabelText>
      {children}
      {errors && errors.length > 0 && (
        <ErrorList id={`${htmlFor}-errors`}>
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ErrorList>
      )}
    </div>
  );
}
