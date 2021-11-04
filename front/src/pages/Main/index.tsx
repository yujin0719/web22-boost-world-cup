import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import WorldCupList from '../../components/WorldcupList';
import Header from '../../components/Header';
import Keywords from '../../components/Keywords';

function Main(): JSX.Element {
  const [isLogin, setIsLogin] = useState(true);
  const [searchWord, setSearchWord] = useState('');
  const [clickTag, setClickTag] = useState('');
  const [offset, setOffset] = useState(0);
  const onSubmit = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    setSearchWord('');
  };
  const onSearchWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };
  const onClickTag = (keyword: string) => {
    setOffset(0);
    setClickTag(keyword);
  };

  return (
    <Wrapper>
      <Header
        type="searchHeader"
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        onSubmit={onSubmit}
        onSearchWordChange={onSearchWordChange}
        searchWord={searchWord}
      />
      <Keywords onClickTag={onClickTag} />
      <WorldCupList offset={offset} setOffset={setOffset} clickTag={clickTag} searchWord={searchWord} />
    </Wrapper>
  );
}
const Wrapper = styled.body`
  background-color: #fdf8f7;
`;
export default Main;
