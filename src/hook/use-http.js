import React, { Component, useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestFn = useCallback(async (configReq, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(configReq.url, {
        method: configReq.method ? configReq.method : "GET",
        headers: configReq.headers ? configReq.headers : {},
        body: configReq.body ? JSON.stringify(configReq.body) : null,
      });
      if (!response.ok) {
        throw new Error("Request Field");
      }
      const data = await response.json();
      applyData(data);
    } catch (err) {
      // setError(err.message || "Something Went Wrong");
      setError("Something Went Wrong");
    }

    setIsLoading(false);
  }, []);
  return {
    isLoading: isLoading,
    error: error,
    requestFn: requestFn,
  };
};

export default useHttp;
