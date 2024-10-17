import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { IoIosSearch } from 'react-icons/io';
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa"; 

const StyledNavbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  margin: 0;
  padding: 1rem;
  background-image: url('https://github.com/ansh5643224/Skyanime/blob/main/src/images/bk.png'); /* Replace with your anime background URL */
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.5); /* Fallback color */
  backdrop-filter: blur(2px);
  z-index: 100;
  transition: 0.1s ease-in-out;

  @media (max-width: 500px) {
    padding: 1rem 0.5rem;
  }
`;

const NavbarWrapper = styled.div`
  max-width: 105rem;
  margin: auto;
`;

const TopContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
`;

const LogoImg = styled(Link)`
  width: 7rem;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  color: var(--global-text);
  cursor: pointer;
  transition: color 0.2s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    color: black;
    transform: scale(1.05);
  }

  @media (max-width: 500px) {
    max-width: 6rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: 35rem;
  height: 2.5rem;
  align-items: center;
  padding: 0.6rem;
  border-radius: var(--global-border-radius);
  background-color: var(--global-div);
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};

  @media (max-width: 1000px) {
    max-width: 30rem;
  }

  @media (max-width: 500px) {
    max-width: 100%;
    margin-top: 1rem;
  }
`;

const RightContent = styled.div`
  gap: 0.5rem;
  display: flex;
  align-items: center;
  height: 2rem;
`;

const Icon = styled.div`
  padding: 0 0.25rem;
  color: var(--global-text);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  border-right: 0px solid var(--global-text);
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: var(--global-text);
  font-size: 0.85rem;
  width: 100%;
  outline: none;
`;

const ClearButton = styled.button`
  background: transparent;
  border: none;
  color: var(--global-text);
  font-size: 1.2rem;
  cursor: pointer;
  opacity: ${({ query }) => (query ? 0.5 : 0)};
  visibility: ${({ query }) => (query ? 'visible' : 'hidden')};
  display: flex;
  align-items: center;

  &:hover {
    color: var(--global-text);
    opacity: 1;
  }
`;

const StyledButton = styled.button`
  background: transparent;
  color: var(--global-text);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.6rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: solid 1px rgba(245, 245, 245, 0.1);

  &:active {
    transform: scale(0.9);
  }

  @media (max-width: 500px) {
    margin: 0;
  }
`;

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 500);
  const [isInputVisible, setIsInputVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 500);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileView) {
      setIsInputVisible(false);
    }
  }, [location.pathname, isMobileView]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const formattedQuery = searchQuery.replace(/ /g, '+');
      navigate(`/search?query=${formattedQuery}`);
    }
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <StyledNavbar>
      <NavbarWrapper>
        <TopContainer>
          <LogoImg title="SKYANIME" to="/home" onClick={() => window.scrollTo(0, 0)}>
            <img src="https://raw.githubusercontent.com/ansh5643224/Skyanime/main/public/images/rishab.png" alt="SKYANIME" className='scale-125 ml-4'/>
          </LogoImg>

          {!isMobileView && (
            <InputContainer isVisible={true}>
              <Icon>
                <IoIosSearch />
              </Icon>
              <SearchInput
                type="text"
                placeholder="Search Anime"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
              <ClearButton query={searchQuery} onClick={handleClearSearch}>
                <FiX />
              </ClearButton>
            </InputContainer>
          )}

          <RightContent>
            {isMobileView && (
              <StyledButton onClick={() => setIsInputVisible((prev) => !prev)}>
                <IoIosSearch />
              </StyledButton>
            )}
            <StyledButton>
              <a href="https://youtube.com/@eternalmelodymagic?si=rLBFFHGQ2cVBtxoq" target="_blank" rel="noreferrer">
              <FaYoutube/>
              </a>
            </StyledButton>
            <StyledButton>
              <a href="https://www.instagram.com/rishab_morningstar/profilecard/?igsh=MWtpNHA1ZWxwcmRmaA==" target="_blank" rel="noreferrer">
              <FaInstagram/>
              </a>
            </StyledButton>
            <StyledButton>
              <a href="https://www.instagram.com/ansh_mishra5522" target="_blank" rel="noreferrer">
              <FaInstagram/>
              </a>
            </StyledButton>
            <StyledButton>
              <a href="https://discord.gg/ptu7UeFth8" target="_blank" rel="noreferrer">
              <FaDiscord />
              </a>
            </StyledButton>
          </RightContent>
        </TopContainer>

        {isMobileView && isInputVisible && (
          <InputContainer isVisible={isInputVisible}>
            <Icon>
              <IoIosSearch />
            </Icon>
            <SearchInput
              type="text"
              placeholder="Search Anime"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <ClearButton query={searchQuery} onClick={handleClearSearch}>
              <FiX />
            </ClearButton>
          </InputContainer>
        )}
      </NavbarWrapper>
    </StyledNavbar>
  );
};

export default Navbar;
