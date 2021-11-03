import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ImgInputMini from '../ImgInputMini';
import ImgPreView from '../ImgPreView';
import { ImgInfo } from '../../types/Datas';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onImgDelete: (key: string) => void;
  imgURLChange: (key: string, newURL: string) => void;
  imgInfos: ImgInfo[];
}

function ImgPreViewList({ onChange, onImgDelete, imgURLChange, imgInfos }: Props): JSX.Element {
  const imgListRef = useRef<HTMLUListElement | null>(null);
  const imgs = imgInfos.map((info: ImgInfo) => (
    <ImgPreView key={info.key} onDelete={onImgDelete} imgURLChange={imgURLChange} info={info} />
  ));
  useEffect(() => {
    const imgList = imgListRef.current;
    if (!imgList) return;
    imgList.scrollLeft = imgList.scrollWidth - 1075;
  }, [imgInfos]);
  return (
    <Container>
      <ImgInputMini onChange={onChange} />
      <ImgsWrapper ref={imgListRef}>{imgs}</ImgsWrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.black};
  border-radius: 10px;
  width: 1312px;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgsWrapper = styled.ul`
  width: 1075px;
  height: 200px;
  padding-top: 20px;
  overflow-x: scroll;
  overflow-y: visible;
  white-space: nowrap;
  margin-left: 30px;
  li {
    display: inline-block;
    margin: 0 15px;
  }
  li:first-child {
    margin-left: 0;
  }
  li:last-child {
    margin-right: 0;
  }
`;

export default ImgPreViewList;
