import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 25px;
`;

const TopLine = styled.div`
  display: flex;
  justify-content: center;
  width: 20%;
  margin-top: 15px;
  border-top: 0.5px solid black;
`;

const Text = styled.span`
  margin-top: 50px;
  font-family: "NanumGothicBold";
  font-weight: 600;
  font-size: 28px;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-weight: 300;
  font-size: 18px;
  margin-bottom: 25px;
`;

const BottomLine = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  border-top: 0.5px solid black;
`;

const StyledSlider = styled(Slider)`
  display: grid;
  align-items: center;
  margin-bottom: 25px;
`;

const StyledLink = styled(Link)``;

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
  padding: 0px 10px;

  &:hover {
    opacity: 0.875;
  }
`;

const sliderSettings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  touchMove: true,
  adaptiveHeight: true,
  autoplay: true,
  centerMode: true,
  speed: 1500,
  autoplaySpeed: 1500,
  cssEase: "linear",
};

function TopViewsPosts() {
  const { data } = useQuery("getData", () =>
    axios
      .get("http://localhost:4000/topViewsPosts")
      .then((response) => response.data)
  );

  return (
    <Container>
      <TopLine />
      <Text>Top 20</Text>
      <Paragraph>
        사용자들이 가장 많이 조회한 20개의 사진 목록이에요. 구경해 보는 건
        어떨까요?
      </Paragraph>
      <StyledSlider {...sliderSettings}>
        {Array.isArray(data) &&
          data?.map((post: any, index: any) => (
            <StyledLink
              to={`/post/${post?.title}`}
              state={post?._id}
              key={index}>
              <Image
                src={`http://localhost:4000/${post?.fileUrl[0]?.path}`}
                alt=""
              />
            </StyledLink>
          ))}
      </StyledSlider>
      <BottomLine />
    </Container>
  );
}

export default TopViewsPosts;
