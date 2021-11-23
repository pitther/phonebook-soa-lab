import React from "react";
import { Box } from "@chakra-ui/react";
import * as S from "./styledComponents/MainContent.styled";
import PhonebookTable from "./PhonebookTable";

const MainContent = () => {
  return (
    <Box maxW={"700px"} w={{ sm: "100%", md: "80%" }}>
      <S.AccentBox>
        <PhonebookTable />
      </S.AccentBox>
    </Box>
  );
};

export default MainContent;
