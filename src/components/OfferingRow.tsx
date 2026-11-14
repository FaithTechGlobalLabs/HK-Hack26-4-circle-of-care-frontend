"use client";

import styled from "styled-components";
import type { Offering } from "@/lib/types";
import { Body, Contact, Meta, metaLine, Row, Summary, Tags } from "./RequestRow";
import { CategoryBlock, Tag } from "./ui";

const Availability = styled.p`
  font-size: 0.95rem;

  b {
    font-family: ${({ theme }) => theme.fonts.cond};
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.muted};
    margin-right: 6px;
  }
`;

export default function OfferingRow({ offering }: { offering: Offering }) {
  return (
    <Row>
      <CategoryBlock category={offering.category} />
      <Body>
        <Summary>{offering.summary}</Summary>
        <Meta>{metaLine(offering, true)}</Meta>
        {offering.offers.length > 0 && (
          <Tags>
            {offering.offers.map((label, i) => (
              <Tag key={`${i}-${label}`}>{label}</Tag>
            ))}
          </Tags>
        )}
        {offering.availability && (
          <Availability>
            <b>Available</b>
            {offering.availability}
          </Availability>
        )}
        <Contact phone={offering.contact_phone} link={offering.contact_link} />
      </Body>
    </Row>
  );
}
