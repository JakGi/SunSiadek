import CustomizedMenus from './Menu';
import styled from 'styled-components';
import { useAuth } from '../context/AuthProvider';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const NavBox = styled.div`
  width: 95%;
  background-color: #f2f3f4;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavigationBox = () => {
  const { currentUser } = useAuth();

  return (
    <NavBox>
      <Link to="/">
        <img src={logo} width="45" alt="This is a logo" />
      </Link>
      {currentUser && <p>Sunsiad: {currentUser.email}</p>}
      <CustomizedMenus></CustomizedMenus>
    </NavBox>
  );
};
