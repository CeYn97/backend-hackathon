import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import UserTable from './components/UserTable';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [minProf, setMinProf] = useState('');
  const [maxProf, setMaxProf] = useState('');
  const [langs, setLangs] = useState([]);
  const [groups, setGroups] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchUsers = async () => {
    const params = { search, page, limit };
    if (minProf) params.minProf = minProf;
    if (maxProf) params.maxProf = maxProf;
    if (langs.length) params.langs = langs.join(',');
    if (groups.length) params.groups = groups.join(',');

    const res = await axios.get('http://localhost:3001/users', { params });
    setUsers(res.data.users);
    setTotal(res.data.total);
  };

  useEffect(() => { fetchUsers(); }, [search, page, minProf, maxProf, langs, groups]);

  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="container content">
        <SearchBar value={search} onChange={term => { setSearch(term); setPage(1); }} />
        <Filters
          minProf={minProf}
          maxProf={maxProf}
          onMinProfChange={v => { setMinProf(v); setPage(1); }}
          onMaxProfChange={v => { setMaxProf(v); setPage(1); }}
          langs={langs}
          onLangsChange={arr => { setLangs(arr); setPage(1); }}
          groups={groups}
          onGroupsChange={arr => { setGroups(arr); setPage(1); }}
          onClear={() => {
            setMinProf('');
            setMaxProf('');
            setLangs([]);
            setGroups([]);
            setPage(1);
          }}
        />
        <UserTable
          users={users}
          total={total}
          page={page}
          limit={limit}
          onPageChange={p => setPage(p)}
        />
      </div>
    </div>
  );
}

export default App;