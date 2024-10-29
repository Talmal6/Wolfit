import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components for Scrollable Table Container
const TableContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  margin: 20px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 18px;
  text-align: left;
`;

const TableHead = styled.thead`
  background-color: #007bff;
  color: white;
`;

const TableHeader = styled.th`
  padding: 12px 15px;
  border: 1px solid #ddd;
  position: sticky;
  top: 0;
  background-color: #007bff;
  color: white;
`;

const TableRow = styled.tr<{ isSelected: boolean }>`
  background-color: ${(props) =>
    props.isSelected ? '#cce5ff' : 'transparent'};
  &:nth-child(even) {
    background-color: ${(props) =>
      props.isSelected ? '#cce5ff' : 'black'};
  }
`;

const TableData = styled.td`
  padding: 12px 15px;
  border: 1px solid #ddd;
`;

export interface TableComponentProps {
  tableKind: string;
}

const TableComponent: React.FC<TableComponentProps> = ({ tableKind }) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]); // Holds fetched data

  useEffect(() => {
    const fetchData = async () => {
      const tableType = tableKind === 'courses' ? 'courses' : 'users';
      try {
        const response = await fetch(
          `http://localhost:3000/request-${tableType}-table`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}), // Sending an empty body
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log('Fetched data:', result);
            alert('Fetched data: ' + JSON.stringify(result));
          let dataArray = [];

          if (Array.isArray(result)) {
            dataArray = result;
          } else if (Array.isArray(result.users)) {
            dataArray = result.users;
            dataArray.sort((a: any, b: any) => {
                    return b.score - a.score;
                
            });
          } else if (Array.isArray(result.courses)) {
            dataArray = result.data;
          } else {
            alert('Received data is not an array: ' + JSON.stringify(result));
            return;
          }

          setData(dataArray);
          console.log('Data set:', dataArray);
        } else {
          alert('Error fetching data');
        }
      } catch (err) {
        alert('Error fetching data from server: ' + err);
      }
    };

    fetchData();
  }, [tableKind]); // Re-run when `tableKind` changes

  const handleRowClick = (index: number) => {
    setSelectedRow(index === selectedRow ? null : index); // Toggle row selection
  };

  const headerArray =
    tableKind === 'courses'
      ? ['שם', 'ניקוד מקסימלי', 'ניקוד מינימלי', 'מספר מכשיר']
      : ['שם משתמש', 'ניקוד']; // Updated header

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow isSelected={false}>
            {headerArray.map((header, index) => (
              <TableHeader key={index}>{header}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <tbody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              isSelected={selectedRow === index}
              onClick={() => handleRowClick(index)}
            >
              {tableKind === 'courses' ? (
                <>
                  <TableData>{row.courseName}</TableData>
                  <TableData>{row.maxScore}</TableData>
                  <TableData>{row.minScore}</TableData>
                  <TableData>{row.devicePort}</TableData>
                </>
              ) : (
                <>
                  <TableData>{row.name}</TableData>   {/* Updated property */}
                  <TableData>{row.score}</TableData>  {/* Updated property */}
                </>
              )}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
