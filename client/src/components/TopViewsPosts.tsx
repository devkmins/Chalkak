import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 25px;
`;

const Line = styled.div`
  display: flex;
  justify-content: center;
  width: 45%;
  margin-top: 15px;
  border-top: 0.5px solid black;
`;

const Text = styled.span`
  margin-top: 75px;
  font-family: "NanumGothicBold";
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 15px;
`;

const StyledSlider = styled(Slider)`
  display: grid;
  align-items: center;
  height: max-content;
  margin-bottom: 40px;
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
      <Line />
      <Text>Top 20</Text>
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
      <Line />
    </Container>
  );
}

export default TopViewsPosts;
