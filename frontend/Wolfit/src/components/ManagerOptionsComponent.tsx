import React, { useState } from 'react';
import styled from 'styled-components';
import TableComponent from './TableComponent';

// Styled Components for Buttons
const Button = styled.button`
  background-color: purple;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 36px;
  cursor: pointer;
  margin: 10px;
  width: 300px;  /* Set a fixed width */
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #301934;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 30vh;
`;

// ManagerOptionsComponent
const ManagerOptionsComponent: React.FC = () => {
  const [coursesClicked, setCoursesClicked] = useState<boolean>(false);
  const [usersClicked, setUsersClicked] = useState<boolean>(false);

  const handleCoursesButtonClick = () => {
    setCoursesClicked(true);
  };

  const handleUsersClick = () => {
    setUsersClicked(true);
  };

  return (
    coursesClicked ? (
      <TableComponent tableKind="courses" />
    ) : usersClicked ? (
      <TableComponent tableKind="users" />
    ) : (
      <Container>
        <Button onClick={handleCoursesButtonClick}>מסלולים</Button>
        <Button onClick={handleUsersClick}>משתמשים</Button>
      </Container>
    )
  );
};

export default ManagerOptionsComponent;
