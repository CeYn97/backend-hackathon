const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { initData, getUsers } = require("./service");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

initData()
  .then(() => console.log("Data loaded"))
  .catch((err) => {
    console.error("Init error:", err);
    process.exit(1);
  });

app.get("/users", (req, res) => {
  const {
    search = "",
    page = "1",
    limit = "10",
    minProf,
    maxProf,
    langs,
    groups,
    softSkills,
  } = req.query;

  const filters = {
    minProf: minProf ? Number(minProf) : null,
    maxProf: maxProf ? Number(maxProf) : null,
    langs: langs ? langs.split(",") : [],
    groups: groups ? groups.split(",") : [],
    softSkills: softSkills ? softSkills.split(",") : [],
  };

  const { total, users } = getUsers({
    search,
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    filters,
  });

  res.json({ page: Number(page), limit: Number(limit), total, users });
});

app.get("/filters", (req, res) => {
  try {
    const filtersPath = path.join(__dirname, "filters.json");
    const filtersData = JSON.parse(fs.readFileSync(filtersPath, "utf-8"));
    res.json(filtersData);
  } catch (error) {
    console.error("Ошибка при загрузке фильтров:", error);
    res.status(500).json({ error: "Ошибка загрузки фильтров" });
  }
});

app.post("/reload", async (req, res) => {
  try {
    await initData();
    console.log("Data reloaded");
    res.json({ success: true, message: "Данные обновлены!" });
  } catch (error) {
    console.error("Ошибка при обновлении данных:", error);
    res
      .status(500)
      .json({ success: false, message: "Ошибка при обновлении данных." });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
