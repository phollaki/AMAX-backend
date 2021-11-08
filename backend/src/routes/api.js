import { Router } from "express";
import axios from "axios";
const router = Router();

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const { data } = await axios
    .post("http://192.168.56.1:5001/api/v1/auth/login", {
      email: username,
      password: password,
    })
    .catch((err) => {
      console.log(err.message);
    });
  res.json(data);
});

router.get("/Events", async (req, res) => {
  const { data } = await axios.get(
    "http://192.168.56.1:5001/api/v1/event/EventsPublic"
  );
  console.log(data);
  res.json(data);
});

router.get("/Mangas", async (req, res) => {
  const mangas = await axios.get("manga link");
  res.json(mangas);
});

router.get("/Valami", async (req, res) => {
  const valami = await axios.get("valami link");
  res.json(valami);
});

/*router.post("/check" , async(req,res)=>{
  const {data} = await axios.post('http://192.168.0.104:3003/api/check')
  console.log("data:")
  console.log(data)
  res.json(data)
})*/

export default router;
