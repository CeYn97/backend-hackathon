import React from 'react';

const availableGroups = ['frontend', 'backend', 'desktop', 'mobile'];
const availableLangs = [
  'html', 'css', 'js', 'ts', 'react', 'vue', 'angular',
  'python', 'node', 'go', 'php', 'ruby',
  'csharp', 'java', 'cpp', 'electron',
  'swift', 'kotlin', 'react-native', 'flutter'
];

export default function Filters({
  minProf,
  maxProf,
  onMinProfChange,
  onMaxProfChange,
  langs,
  onLangsChange,
  groups,
  onGroupsChange,
  onClear
}) {
  const toggle = (item, arr, cb) => {
    cb(arr.includes(item)
      ? arr.filter(x => x !== item)
      : [...arr, item]
    );
  };

  return (
    <div style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #ddd' }}>
      <div>
        <label>
          Уровень от:
          <input
            type="number"
            value={minProf}
            onChange={e => onMinProfChange(e.target.value)}
            style={{ width: '60px', margin: '0 0.5rem' }}
          />%
        </label>
        <label>
          до:
          <input
            type="number"
            value={maxProf}
            onChange={e => onMaxProfChange(e.target.value)}
            style={{ width: '60px', margin: '0 0.5rem' }}
          />%
        </label>
      </div>
      <div>
        <strong>Языки:</strong>
        {availableLangs.map(lang => (
          <label key={lang} style={{ margin: '0 0.5rem' }}>
            <input
              type="checkbox"
              checked={langs.includes(lang)}
              onChange={() => toggle(lang, langs, onLangsChange)}
            /> {lang}
          </label>
        ))}
      </div>
      <div>
        <strong>Группы:</strong>
        {availableGroups.map(gr => (
          <label key={gr} style={{ margin: '0 0.5rem' }}>
            <input
              type="checkbox"
              checked={groups.includes(gr)}
              onChange={() => toggle(gr, groups, onGroupsChange)}
            /> {gr}
          </label>
        ))}
      </div>
      <button onClick={onClear} style={{ marginTop: '0.5rem' }}>
        Сбросить фильтры
      </button>
    </div>
  );
}