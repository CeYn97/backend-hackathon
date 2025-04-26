const fs = require('fs');
const path = require('path');
let data = [];

async function initData() {
  const filePath = path.join(__dirname, 'users2.csv');
  const content = fs.readFileSync(filePath, 'utf-8');

  const lines = content.split(/\r?\n/).filter(Boolean);
  if (!lines.length) {
    data = [];
    return;
  }

  const rawHeaders = lines[0].split(';').map(h => h.trim());

  data = lines.slice(1).map(line => {
    const cols = line.split(';');
    const obj = {};
    rawHeaders.forEach((key, idx) => {
      if (key) obj[key] = cols[idx] ? cols[idx].trim() : '';
    });
    return obj;
  });
}

function getUsers({ search = '', page = 1, limit = 10, filters = {} }) {
  const term = search.trim().toLowerCase();
  let filtered = data;

  if (term) {
    filtered = filtered.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(term)
      )
    );
  }

  if (filters.minProf !== null) {
    filtered = filtered.filter(item => Number(item.proficiency.replace('%','')) >= filters.minProf);
  }
  if (filters.maxProf !== null) {
    filtered = filtered.filter(item => Number(item.proficiency.replace('%','')) <= filters.maxProf);
  }

  if (filters.langs.length) {
    filtered = filtered.filter(item => {
      const userLangs = item.langs.split(/\s+/).map(s => s.trim());
      return filters.langs.every(l => userLangs.includes(l));
    });
  }

  if (filters.groups.length) {
    filtered = filtered.filter(item => filters.groups.includes(item.group));
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const users = filtered.slice(start, start + limit);

  return { total, users };
}

module.exports = { initData, getUsers };