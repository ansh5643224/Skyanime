import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBell, FaDownload } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';

// Styled components with hardcoded dark theme colors
const UpdatedContainer = styled.div`
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
  display: flex;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Table = styled.table`
  font-size: 0.9rem;
  border-collapse: collapse;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
`;

const TableRow = styled.tr``;

const TableCell = styled.td`
  text-align: center;
  padding: 0.35rem;
`;

const ButtonWrapper = styled.div`
  width: 90px;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  @media (max-width: 400px) {
    width: 100%;
    gap: 0.25rem;
    margin: auto;
  }
`;

const ButtonBase = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: none;
  font-weight: bold;
  border-radius: 0.3rem;
  cursor: pointer;
  background-color: #141414;
  color: #e8e8e8;
  transition: background-color 0.2s ease, transform 0.2s ease-in-out;
  text-align: center;

  &:hover,
  &:active,
  &:focus {
    background-color: #8080cf;
    transform: scale(1.025);
  }

  &:active {
    transform: scale(0.975);
  }

  &.active {
    background-color: #8080cf;
  }
`;

const Button = styled(ButtonBase)``;

const DownloadLink = styled.a`
  display: inline-flex;
  align-items: center;
  margin-left: 0.5rem;
  padding: 0.5rem;
  gap: 0.25rem;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  background-color: #141414;
  color: #e8e8e8;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.2s ease-in-out;

  svg {
    font-size: 0.8rem;
  }

  &:hover,
  &:active,
  &:focus {
    background-color: #8080cf;
    transform: scale(1.025);
  }

  &:active {
    transform: scale(0.975);
  }
`;

const ResponsiveTableContainer = styled.div`
  background-color: rgba(20, 20, 20, 0.5);
  padding: 0.5rem;
  border-radius: 0.3rem;
  @media (max-width: 200px) {
    display: block;
  }
`;

const EpisodeInfoColumn = styled.div`
  flex-grow: 1;
  display: block;
  background-color: rgba(20, 20, 20, 0.5);
  border-radius: 0.3rem;
  padding: 0.75rem;
  @media (max-width: 1000px) {
    display: block;
    margin-right: 0rem;
  }
  p {
    font-size: 0.9rem;
    margin: 0;
  }
  h4 {
    margin: 0rem;
    font-size: 1.15rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 500px) {
    p {
      font-size: 0.8rem;
      margin: 0rem;
    }
    h4 {
      font-size: 1rem;
      margin-bottom: 0rem;
    }
  }
`;


// Styled components...

const MediaSource = ({
  sourceType: initialSourceType,
  setSourceType: initialSetSourceType,
  language: initialLanguage,
  setLanguage: initialSetLanguage,
  downloadLink,
  episodeId,
  airingTime,
  nextEpisodenumber,
}) => {
  const { animeId, animeTitle: initialAnimeTitle, episodeNumber } = useParams();
  const navigate = useNavigate();
  const [sourceType, setSourceType] = useState(initialSourceType);
  const [language, setLanguage] = useState(initialLanguage);
  const [animeTitle, setAnimeTitle] = useState(initialAnimeTitle);

  const handleButtonClick = (newSourceType, newLanguage) => {
    setSourceType(newSourceType);
    setLanguage(newLanguage);
    initialSetSourceType(newSourceType);
    initialSetLanguage(newLanguage);

    let updatedAnimeTitle = animeTitle;

    if (newLanguage === 'dub') {
      if (!animeTitle.endsWith('-dub')) {
        updatedAnimeTitle = `${animeTitle}-dub`;
      }
    } else if (newLanguage === 'sub') {
      if (animeTitle.endsWith('-dub')) {
        updatedAnimeTitle = animeTitle.replace('-dub', '');
      }
    }

    setAnimeTitle(updatedAnimeTitle);

    // Update the URL
    navigate(`/watch/${animeId}/${updatedAnimeTitle}/${episodeNumber}`);
  };

  return (
    <UpdatedContainer>
      <EpisodeInfoColumn>
        {episodeId ? (
          <>
            You're watching on SkyAnime <strong>Episode {episodeId}</strong>
            <DownloadLink
              href={downloadLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDownload />Download Episode
            </DownloadLink>
            <br />
            <br />
            <p>If current servers don't work, please try other servers.</p>
          </>
        ) : (
          'Loading episode information...'
        )}
        {airingTime && (
          <>
            <p className='flex gap-1'>
              <span className='block'>Next Ep in{' '}</span>
              <FaBell className='mt-1'/>
              <strong> {airingTime}</strong>.
            </p>
          </>
        )}
      </EpisodeInfoColumn>
      <ResponsiveTableContainer>
        <Table>
          <tbody>
            <TableRow>
              <TableCell>SUB</TableCell>
              <TableCell>
                <ButtonWrapper>
                  <Button
                    className={
                      sourceType === 'default' && language === 'sub'
                        ? 'active'
                        : ''
                    }
                    onClick={() => handleButtonClick('default', 'sub')}
                  >
                    Default
                  </Button>
                </ButtonWrapper>
              </TableCell>
              <TableCell>
                <ButtonWrapper>
                  <Button
                    className={
                      sourceType === 'vidstreaming' && language === 'sub'
                        ? 'active'
                        : ''
                    }
                    onClick={() => handleButtonClick('vidstreaming', 'sub')}
                  >
                    Server1
                  </Button>
                </ButtonWrapper>
              </TableCell>
              <TableCell>
                <ButtonWrapper>
                  <Button
                    className={
                      sourceType === 'gogo' && language === 'sub'
                        ? 'active'
                        : ''
                    }
                    onClick={() => handleButtonClick('gogo', 'sub')}
                  >
                    Server2
                  </Button>
                </ButtonWrapper>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>DUB</TableCell>
              <TableCell>
                <ButtonWrapper>
                  <Button
                    className={
                      sourceType === 'default' && language === 'dub'
                        ? 'active'
                        : ''
                    }
                    onClick={() => handleButtonClick('default', 'dub')}
                  >
                    Default
                  </Button>
                </ButtonWrapper>
              </TableCell>
              <TableCell>
                <ButtonWrapper>
                  <Button
                    className={
                      sourceType === 'vidstreaming' && language === 'dub'
                        ? 'active'
                        : ''
                    }
                    onClick={() => handleButtonClick('vidstreaming', 'dub')}
                  >
                    Server1
                  </Button>
                </ButtonWrapper>
              </TableCell>
              <TableCell>
                <ButtonWrapper>
                  <Button
                    className={
                      sourceType === 'gogo' && language === 'dub'
                        ? 'active'
                        : ''
                    }
                    onClick={() => handleButtonClick('gogo', 'dub')}
                  >
                    Server2
                  </Button>
                </ButtonWrapper>
              </TableCell>
            </TableRow>
          </tbody>
        </Table>
      </ResponsiveTableContainer>
    </UpdatedContainer>
  );
};

// Sample data for testing...

export { MediaSource };
