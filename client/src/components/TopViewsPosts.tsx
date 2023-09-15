import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 75px;
  margin-bottom: 25px;
`;

const Text = styled.span`
  font-family: "NanumGothicBold";
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 15px;
`;

const StyledSlider = styled(Slider)`
  display: grid;
  align-items: center;
  height: max-content;
`;

const Image = styled.img`
  width: 25%;
  height: 300px;
  object-fit: contain;
  padding: 0px 10px;
`;

const sliderSettings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  touchMove: true,
  adaptiveHeight: true,
  autoplay: true,
  centerMode: true,
  autoplaySpeed: 1250,
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
      <Text>조회수가 가장 높은 게시글 20개를 구경해 보세요!</Text>
      <StyledSlider {...sliderSettings}>
        {Array.isArray(data) &&
          data?.map((img: any, index: any) => (
            <Image
              key={index}
              src={`http://localhost:4000/${img?.fileUrl[0]?.path}`}
              alt=""
            />
          ))}
      </StyledSlider>
    </Container>
  );
}

export default TopViewsPosts;
