import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import WorldCupList from '../../components/WorldcupList';
import { getMyWorldcupList } from '../../utils/api/worldcups';
import { useInfiniteScroll, useSearchBar } from '../../hooks';
import { Worldcup } from '../../types/Datas';

const MyWorldcup = (): JSX.Element => {
  const setOffsetRef = useRef<React.Dispatch<React.SetStateAction<number>> | null>(null);
  const [searchWord, inputWord, onSubmit, onSearchWordChange] = useSearchBar(setOffsetRef.current);
  const {
    items: worldcups,
    target,
    isLoading,
    isClickMore,
    onClickMoreBtn,
    setOffset,
  } = useInfiniteScroll<Worldcup>(8, getMyWorldcupList, []);

  useEffect(() => {
    setOffsetRef.current = setOffset;
  }, []);

  return (
    <Container>
      <Header type="searchHeader" onSubmit={onSubmit} onSearchWordChange={onSearchWordChange} searchWord={inputWord} />
      <WorldCupList
        type="worldcup"
        worldcups={worldcups}
        observeTarget={target}
        isLoading={isLoading}
        isClickMore={isClickMore}
        onClickMoreBtn={onClickMoreBtn}
      />
    </Container>
  );
};

const Container = styled.div``;

export default MyWorldcup;
