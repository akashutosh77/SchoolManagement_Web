import React from "react"
import Slider from "react-slick"
import { Box, Typography, Button } from "@mui/material"
import { styled } from "@mui/system"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const carouselItems = [
  {
    title: "Welcome to Our School",
    description: "Providing quality education since 1990.",
    imageUrl: "https://via.placeholder.com/800x400?text=School+1"
  },
  {
    title: "Excellence in Education",
    description: "Empowering students to succeed.",
    imageUrl: "https://via.placeholder.com/800x400?text=School+2"
  },
  {
    title: "Innovative Learning",
    description: "Preparing students for the future.",
    imageUrl: "https://via.placeholder.com/800x400?text=School+3"
  }
]

const CarouselContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  "& .slick-prev, & .slick-next": {
    zIndex: 1,
    top: "calc(50% - 20px)",
    color: theme.palette.primary.main
  }
}))

const CarouselItem = styled(Box)(({ theme }) => ({
  position: "relative",
  textAlign: "center",
  color: theme.palette.common.white,
  "& img": {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    opacity: 0.7
  },
  "& .content": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textShadow: "1px 1px 4px rgba(0,0,0,0.8)"
  }
}))

export const HomeCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  }

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {carouselItems.map((item, index) => (
          <CarouselItem key={index}>
            <img src={item.imageUrl} alt={item.title} />
            <Box className="content">
              <Typography variant="h3" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {item.description}
              </Typography>
              <Button variant="contained" color="primary">
                Learn More
              </Button>
            </Box>
          </CarouselItem>
        ))}
      </Slider>
    </CarouselContainer>
  )
}
