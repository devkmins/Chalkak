import styled from "styled-components";
import { RiImage2Fill } from "react-icons/ri";
import { TbPhotoOff } from "react-icons/tb";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 100px;
`;

const PostsContainer = styled.div`
  width: 100%;
`;

const ContentsContainer = styled.div`
  display: flex;
  align-items: center;
  color: #000000d5;
  font-weight: 600;
  padding-left: 25px;
  border-bottom: 1px solid #d1d1d1;
  margin-bottom: 30px;
`;

const PhotoBox = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  cursor: pointer;
`;

const StyledRiImage2Fill = styled(RiImage2Fill)`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  margin-bottom: 2.5px;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const StyledTbPhotoOff = styled(TbPhotoOff)`
  width: 150px;
  height: 150px;
  stroke-width: 0.85;
  stroke: #564f4e;
`;

const SearchWord = styled.span`
  font-size: 27px;
  font-weight: 800;
  font-family: "NanumGothicBold";
  margin-left: 25px;
`;

const Text = styled.span`
  margin-top: 15px;
  font-size: 20px;
  font-weight: 600;
  color: #6b6565;
`;

function NoSearchResults({ posts, searchWord }: any) {
  return (
    <Box>
      <PostsContainer>
        <ContentsContainer>
          <PhotoBox>
            <StyledRiImage2Fill />
            <span>사진 {posts?.length}</span>
          </PhotoBox>
        </ContentsContainer>
        <SearchWord>{searchWord}</SearchWord>
        <IconBox>
          <StyledTbPhotoOff />
          <Text>사진을 찾을 수 없습니다.</Text>
        </IconBox>
      </PostsContainer>
    </Box>
  );
}

export default NoSearchResults;
