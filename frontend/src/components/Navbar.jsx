import '../App.css';

export default function Navbar() {
  return (
    <nav style={navStyle}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Student Finder</h1>
        <button onClick={() => window.location.reload()}>Обновить</button>
      </div>
    </nav>
  );
}

const navStyle = {
  backgroundColor: '#0066cc',
  padding: '1rem 0',
  color: 'white'
};