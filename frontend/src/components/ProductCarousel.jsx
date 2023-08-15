import { Carousel, CarouselItem, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import { useGetSlidesQuery } from "../slices/settingsApiSlice";

const ProductCarousel = () => {
  // add component to change how many carousel items you want in admin settings
  // const { data: products, isLoading, error } = useGetTopProductsQuery();
  const { data: slides, isLoading, error } = useGetSlidesQuery();
  return isLoading ? (
    // <Loader />
    <></>
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {slides.map(
        (slide) =>
          slide.display && (
            <CarouselItem key={slide._id}>
              <Link to={slide.url}>
                <Image
                  src={slide.image}
                  alt={slide.text}
                  fluid
                  style={{
                    width: "100%",
                    height: "600px",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
                <Carousel.Caption className="carousel-caption">
                  <h2>{slide.text}</h2>
                </Carousel.Caption>
              </Link>
            </CarouselItem>
          )
      )}
    </Carousel>
  );
};

export default ProductCarousel;
