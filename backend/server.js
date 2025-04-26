const express = require('express');
const cors = require('cors');
const { initData, getUsers } = require('./service');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

initData()
  .then(() => console.log('Data loaded'))
  .catch(err => {
    console.error('Init error:', err);
    process.exit(1);
  });

app.get('/users', (req, res) => {
  const {
    search = '',
    page = '1',
    limit = '10',
    minProf,
    maxProf,
    langs,
    groups
  } = req.query;

  const filters = {
    minProf: minProf ? Number(minProf) : null,
    maxProf: maxProf ? Number(maxProf) : null,
    langs: langs ? langs.split(',') : [],
    groups: groups ? groups.split(',') : []
  };

  const { total, users } = getUsers({
    search,
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    filters
  });

  res.json({ page: Number(page), limit: Number(limit), total, users });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});