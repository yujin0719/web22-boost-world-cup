import React, { useState } from 'react';
import styled from 'styled-components';
import { Header, Keywords, WorldcupList, SearchBar } from '../../components';
import { useInfiniteScroll } from '../../hooks';
import { getWorldcupList } from '../../apis/worldcups';
import { Worldcup } from '../../types/Datas';
import { FETCH_WORLDCUPS_LIMIT } from '../../constants/number';
import WorldCupItem from '../../components/WorldCupItem';

function Main(): JSX.Element {
  const [searchWord, setSearchWord] = useState('');
  const [inputWord, setInputWord] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const {
    items: worldcups,
    target,
    isLoading,
    isClickMore,
    onClickMoreBtn,
    setOffset,
    setIsClickMore,
  } = useInfiniteScroll<Worldcup>(FETCH_WORLDCUPS_LIMIT, getWorldcupList, [searchWord, selectedTag]);

  const onSubmit: React.MouseEventHandler = (event) => {
    event.preventDefault();
    setOffset(0);
    setSearchWord(inputWord);
    setSelectedTag('');
    setInputWord('');
  };
  const onSearchWordChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setInputWord(target.value);
  };
  const onClickTag = (keyword: string) => {
    setOffset(0);
    setSelectedTag(keyword);
    setSearchWord('');
  };
  const onResetData = () => {
    setSearchWord('');
    setSelectedTag('');
    setOffset(0);
    setIsClickMore(false);
  };

  return (
    <Wrapper>
      <Header onResetData={onResetData}>
        <SearchBar onSubmit={onSubmit} onSearchWordChange={onSearchWordChange} searchWord={inputWord} />
      </Header>
      <Keywords onClickTag={onClickTag} selectedTag={selectedTag} />
      <WorldcupList
        observeTarget={target}
        isLoading={isLoading}
        isClickMore={isClickMore}
        onClickMoreBtn={onClickMoreBtn}
      >
        {worldcups.map(({ id, thumbnail1, thumbnail2, title, description }) => (
          <WorldCupItem
            key={id}
            id={id}
            thumbnail1={thumbnail1}
            thumbnail2={thumbnail2}
            title={title}
            desc={description}
          />
        ))}
      </WorldcupList>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background: rgb(245, 220, 216);
  background: linear-gradient(0deg, rgba(245, 220, 216, 1) 0%, rgba(253, 248, 247, 1) 43%);
`;
export default Main;
