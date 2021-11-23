import React from "react";
import { Skeleton } from "@chakra-ui/react";
import * as S from "./styledComponents/MainContent.styled";

const PhonebookTableLoader = ({ loading }) => {
  return (
    <>
      {loading ? (
        <>
          {new Array(8).fill(0).map((_) => (
            <S.RoundedTr key={Math.random()}>
              {new Array(4).fill(0).map((_) => (
                <S.StyledTd key={Math.random()}>
                  <Skeleton h={"20px"} isLoaded={!loading} />
                </S.StyledTd>
              ))}
            </S.RoundedTr>
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default PhonebookTableLoader;
