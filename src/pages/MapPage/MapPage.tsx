import { useContext, useEffect } from 'react';

import Box from '../../components/shared/Box/Box';
import SectionGraph from '../../components/SectionGraph/SectionGraph';
import { Heading1 } from '../../components/shared';

import { ThemeContext } from '../../contexts/ThemeContextProvider';
import { SnackBarContext } from '../../contexts/SnackBarProvider';

import useLines from '../../hooks/useLines';
import PALETTE from '../../constants/palette';
import { PageProps } from '../types';
import { Container, Lines } from './MapPage.style';
import { ERROR_MESSAGE } from '../../constants/messages';

const MapPage = ({ setIsLoading }: PageProps) => {
  const [lines, setLines, fetchLines] = useLines([]);

  const themeColor = useContext(ThemeContext)?.themeColor;
  const addMessage = useContext(SnackBarContext)?.addMessage;

  useEffect(() => {
    const fetchData = async () => {
      const timer = setTimeout(() => setIsLoading(true), 500);

      try {
        await fetchLines();
      } catch (error) {
        console.error(error);
        addMessage?.(ERROR_MESSAGE.DEFAULT);
        setLines([]);
      } finally {
        clearTimeout(timer);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Box hatColor={themeColor} backgroundColor={PALETTE.WHITE}>
        <Heading1>지하철 전체보기</Heading1>
        <Lines>
          {lines.map((line) => (
            <div>
              <SectionGraph line={line} />
            </div>
          ))}
        </Lines>
      </Box>
    </Container>
  );
};

export default MapPage;
