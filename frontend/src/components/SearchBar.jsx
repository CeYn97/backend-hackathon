export default function SearchBar({ value, onChange }) {
    return (
      <div style={{ margin: '1.5rem 0' }}>
        <input
          type="text"
          placeholder="Поиск студентов..."
          value={value}
          onChange={e => onChange(e.target.value)}
          style={inputStyle}
        />
      </div>
    );
  }
  
  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  };