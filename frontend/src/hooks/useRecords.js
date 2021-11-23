import { useCallback, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

const useRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const updateRecords = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/records/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseObject = await response.json();
      if (responseObject.records) {
        setRecords(responseObject.records);
        setLoading(false);
        return;
      }
      toast({
        title: "Cannot get records from server.",
        description: responseObject.error || "Internal error.",
        status: "error",
        duration: 4000,
        position: "bottom",
        isClosable: true,
      });
      setRecords([]);
    } catch (e) {
      toast({
        title: "Cannot get records from server.",
        description: e.toString(),
        status: "error",
        duration: 4000,
        position: "bottom",
        isClosable: true,
      });
      setRecords([]);
    }
    setLoading(false);
  }, []);

  const deleteRecord = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/records/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseObject = await response.json();
      if (responseObject.deleted) {
        toast({
          title: "Record removed from db.",
          status: "success",
          duration: 4000,
          position: "bottom",
          isClosable: true,
        });
        setLoading(false);
        await updateRecords();
        return;
      }
      toast({
        title: "Cannot remove record from db.",
        description: responseObject.error || id,
        status: "error",
        duration: 4000,
        position: "bottom",
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Cannot remove record",
        description: e.toString(),
        status: "error",
        duration: 4000,
        position: "bottom",
        isClosable: true,
      });
    }
    setLoading(false);
  }, []);

  const addRecord = useCallback(async (record) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/records/`, {
        method: "PUT",
        body: JSON.stringify(record),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      const responseObject = await response.json();
      if (responseObject.added) {
        toast({
          title: "Record added to db.",
          status: "success",
          duration: 4000,
          position: "bottom",
          isClosable: true,
        });
        setLoading(false);
        await updateRecords();
        return;
      }
      toast({
        title: "Cannot add record to db.",
        description: responseObject.error,
        status: "error",
        duration: 4000,
        position: "bottom",
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Cannot add record",
        description: e.toString(),
        status: "error",
        duration: 4000,
        position: "bottom",
        isClosable: true,
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    updateRecords();
  }, [updateRecords]);

  return { records, loading, updateRecords, deleteRecord, addRecord };
};

export default useRecords;
