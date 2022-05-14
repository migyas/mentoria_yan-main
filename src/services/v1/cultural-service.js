import { API } from "../api";

async function getAllCultural({ pageNumber, pageLimit }) {
  const { data } = await API.get(
    `/cultura?_page=${pageNumber}&_limit=${pageLimit}`
  );
  return data;
}

export { getAllCultural };
