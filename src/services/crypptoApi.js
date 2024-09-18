const axios = require("axios");

const options = {
  method: "GET",
  url: "https://coinranking1.p.rapidapi.com/stats",
  params: {
    referenceCurrencyUuid: "yhjMzLPhuIDl",
  },
  headers: {
    "x-rapidapi-key": "fb3c7f0d94msh08b37e5c55ffd46p163a39jsn1860217af96b",
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  },
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}
