import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchImages = async (query, page) => {
  const response = await axios.get("search/photos", {
    params: {
      query,
      page,
      per_page: 10,
    },
    headers: {
      Authorization: "Client-ID A9JYAacY3_G2QLuQLAqhxi8TDCu3CBLVWjz-8NOG17Y",
    },
  });
  return response.data.results;
};
