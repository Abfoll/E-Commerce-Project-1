import React from 'react'

const DataTable = ({ data, columns, actions }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.format ? column.format(row[column.accessor]) : row[column.accessor]}
                </td>
              ))}
              {actions && (
                <td>
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      className={`btn btn-${action.type}`}
                      onClick={() => action.onClick(row)}
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable