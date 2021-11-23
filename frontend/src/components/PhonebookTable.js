import React, { useState } from "react";
import {
  IconButton,
  Input,
  Table,
  Tbody,
  Tfoot,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import * as S from "./styledComponents/MainContent.styled";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import PhonebookTableLoader from "./PhonebookTableLoader";
import useRecords from "../hooks/useRecords";

const PhonebookTable = () => {
  const toast = useToast();
  const { records, loading, deleteRecord, addRecord } = useRecords();

  const [inputRecord, setInputRecord] = useState({
    name: "",
    mobile: "",
    home: "",
  });
  const onDeleteRecord = async (id) => {
    await deleteRecord(id);
  };
  const onAddRecord = async () => {
    if (inputRecord.name && (inputRecord.mobile || inputRecord.home)) {
      await addRecord(inputRecord);
      setInputRecord({ name: "", mobile: "", home: "" });
      return;
    }
    toast({
      title: "Name and mobile or home number fields must be filled",
      status: "warning",
      duration: 4000,
      position: "bottom",
      isClosable: true,
    });
  };
  const onInputRecord = (type, e) => {
    switch (type) {
      case "name": {
        setInputRecord((prev) => ({ ...prev, name: e.target.value }));
        return;
      }
      case "mobile": {
        setInputRecord((prev) => ({ ...prev, mobile: e.target.value }));

        return;
      }
      case "home": {
        setInputRecord((prev) => ({ ...prev, home: e.target.value }));
        return;
      }
      default:
        return;
    }
  };

  return (
    <>
      <Table size={"sm"} variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <S.StyledTh>Name</S.StyledTh>
            <S.StyledTh>Mobile</S.StyledTh>
            <S.StyledTh>Home</S.StyledTh>
            <S.StyledTh />
          </Tr>
        </Thead>
        <Tbody>
          <PhonebookTableLoader loading={loading} />

          {!loading ? (
            records
              .sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              })
              ?.map((record) => (
                <S.RoundedTr key={record.id}>
                  <S.StyledTd>{record.name}</S.StyledTd>
                  <S.StyledTd>
                    <S.PhoneLabel href={"tel:" + record.mobile}>
                      {record.mobile}
                    </S.PhoneLabel>
                  </S.StyledTd>
                  <S.StyledTd>
                    <S.PhoneLabel href={"tel:" + record.home}>
                      {record.home}
                    </S.PhoneLabel>
                  </S.StyledTd>
                  <S.StyledTd>
                    <IconButton
                      size={"sm"}
                      aria-label="Delete"
                      onClick={(e) => onDeleteRecord(record.id)}
                      icon={<CloseIcon />}
                    />
                  </S.StyledTd>
                </S.RoundedTr>
              ))
          ) : (
            <></>
          )}
        </Tbody>

        <Tfoot>
          <Tr>
            <S.StyledTh>
              <Input
                variant="unstyled"
                onChange={(e) => onInputRecord("name", e)}
                value={inputRecord.name}
                size={"sm"}
                placeholder="Name"
              />
            </S.StyledTh>
            <S.StyledTh>
              <Input
                variant="unstyled"
                onChange={(e) => onInputRecord("mobile", e)}
                value={inputRecord.mobile}
                size={"sm"}
                type="tel"
                placeholder="Mobile number"
              />
            </S.StyledTh>
            <S.StyledTh>
              <Input
                variant="unstyled"
                onChange={(e) => onInputRecord("home", e)}
                value={inputRecord.home}
                size={"sm"}
                type="tel"
                placeholder="Home number"
              />
            </S.StyledTh>
            <S.StyledTh>
              <IconButton
                size={"sm"}
                aria-label="Add record"
                onClick={onAddRecord}
                icon={<AddIcon />}
              />
            </S.StyledTh>
          </Tr>
        </Tfoot>
      </Table>
    </>
  );
};

export default PhonebookTable;
