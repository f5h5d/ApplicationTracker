"use client";
import axios from "axios";

export const fetchJobApplications = async () => {
  const response = await axios.get("http://localhost:8080/api/applications/");

  return response.data;
};

export const fetchSearchedJobApplications = async (searchTerm: string) => {
  const response = await axios.get(
    `http://localhost:8080/api/applications/search?search=${searchTerm}`,
  );

  return response.data;
};
