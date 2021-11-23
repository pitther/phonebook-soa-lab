import styled from "styled-components";
import { Box, Td, Th, Tr } from "@chakra-ui/react";
import breakpoint from "styled-components-breakpoint";

export const HeaderContainer = styled(Box)`
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) =>
    theme.colorMode === "light" ? theme.headerLight : theme.headerDark};
`;

export const AccentBox = styled(Box)`
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
`;

export const PhoneLabel = styled.a`
  ${breakpoint("sm")`
    font-weight: 600;
    font-size: 14px;
  `}

  ${breakpoint("xs")`
    font-weight: 500;
    font-size: 10px;
  `}

  color: ${({ theme }) =>
    theme.colorMode === "light" ? theme.phoneLight : theme.phoneDark};
`;

export const RoundedTr = styled(Tr)``;

export const StyledTd = styled(Td)`
  ${breakpoint("sm")`
    padding: 13px !important;
   
  `}

  ${breakpoint("xs")`
    padding: 3px  !important;
  `}

  border-color: transparent !important;
`;

export const StyledTh = styled(Th)`
  ${breakpoint("sm")`
    padding: 13px !important;
  `}

  ${breakpoint("xs")`
    padding: 3px  !important;
  `}

  border-color: transparent !important;
`;
