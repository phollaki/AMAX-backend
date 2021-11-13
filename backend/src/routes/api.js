import { Router } from "express";
import axios from "axios";
const router = Router();

const routes = [
  {
    url: "http://localhost:5001/api/v1/auth/login",
    options: (username, password) => ({ email: username, password }),
  },
  {
    url: "http://192.168.137.120:8000/api/login",
    options: (username, password) => ({
      email: username,
      password,
      token_name: "yas",
    }),
  },
  {
    url: "http://192.168.137.5:8000/api/tokenGen",
    options: (username, password) => ({
      email: username,
      password,
    }),
  },
];
const errorSymbol = Symbol();

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  let payload;
  for (const { url, options } of routes) {
    const result = await axios
      .post(url, options(username, password))
      .catch(() => errorSymbol);
    if (result !== errorSymbol) {
      payload = result.data;
    }
  }
  if (payload === undefined) {
    res.json("Bad credentials");
  } else {
    res.json(payload);
  }
});

router.get("/Events", async (req, res) => {
  const { data } = await axios.get(
    "http://192.168.56.1:5001/api/v1/event/EventsPublic"
  );
  res.json(data);
});

router.get("/Mangas", async (req, res) => {
  const { data } = await axios.get("http://192.168.137.120:8000/api/manga");
  res.json(data);
});
router.post("/money", async (req, res) => {
  const { text, price } = req.body;
  const { data } = await axios.post(
    "http://192.168.137.189:5000/api/v1/transactions",
    {
      text,
      amount: price,
    }
  );
  res.json(data);
});

router.get("/Valami", async (req, res) => {
  const valami = await axios.get("valami link");
  res.json(valami);
});

export default router;
