import ReactPaginate from 'react-paginate';
import '../App.css';

export default function UserTable({ users, total, page, limit, onPageChange }) {
  const pageCount = Math.ceil(total / limit);

  const columns = [
    { key: 'ФИО', label: 'ФИО' },
    { key: 'Почта', label: 'Почта' },
    { key: 'Логин', label: 'Логин' },
    { key: 'Статус', label: 'Статус' },
    { key: 'Телефон', label: 'Телефон' },
    { key: 'group', label: 'Группа' },
    { key: 'langs', label: 'Языки' },
    { key: 'proficiency', label: 'Уровень*' }
  ];

  return (
    <>
      <table style={tableStyle}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={thTdStyle}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i} style={i % 2 ? { backgroundColor: '#f9f9f9' } : {}}>
              {columns.map(col => (
                <td key={col.key} style={thTdStyle}>
                  {u[col.key] || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

          <p>* - Уровень показывает, насколько хорошо студент владеет указанными технологиями.</p>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
        <ReactPaginate
          pageCount={pageCount}
          forcePage={page - 1}
          onPageChange={c => onPageChange(c.selected + 1)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          breakLabel="…"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          pageLinkClassName="page-link"
          previousLabel="<"
          nextLabel=">"
          activeClassName="active"
        />
      </div>
    </>
  );
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.95rem'
};
const thTdStyle = {
  border: '1px solid #ddd',
  padding: '0.75rem',
  textAlign: 'left'
};
