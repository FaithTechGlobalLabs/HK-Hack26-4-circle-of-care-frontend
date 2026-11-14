"use client";

import { useState, type FormEvent } from "react";
import styled from "styled-components";
import { setPasscode } from "@/lib/api";
import { Button, Hero, Muted, Notice } from "./ui";
import { Field, Input } from "./form";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/** Shown when the API answers 401: asks for the board passcode, stores it, then retries. */
export default function PasscodeGate({ wrong, onSaved }: { wrong: boolean; onSaved: () => void }) {
  const [code, setCode] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setPasscode(code.trim());
    onSaved();
  }

  return (
    <>
      <Hero>
        <h1>Volunteers only</h1>
        <Muted>Enter the board passcode your church coordinator shared with you.</Muted>
      </Hero>
      <Form onSubmit={submit}>
        {wrong && <Notice $tone="error">That passcode didn&apos;t work. Please check and try again.</Notice>}
        <Field label="Passcode" htmlFor="passcode">
          <Input
            id="passcode"
            type="password"
            autoComplete="current-password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoFocus
          />
        </Field>
        <Button type="submit">Open the board</Button>
      </Form>
    </>
  );
}
