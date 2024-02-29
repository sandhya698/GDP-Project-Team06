import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';
import DonateBlood from '../assets/DonateBlood.png'
import DonorHero from '../assets/DonorHero.png'
import EveryDrop from '../assets/EveryDrop.png'
import SaveLives from '../assets/SaveLives.png'
import BeDonor from '../assets/BeDonor.png'

export const DonorCarousel = () => {
  return (
    <>
    <Carousel indicators={false} controls={false}>
      <Carousel.Item>
          <Image src={DonorHero} />
      </Carousel.Item>
      <Carousel.Item>
          <Image src={DonateBlood} />
      </Carousel.Item>
      <Carousel.Item>
          <Image src={EveryDrop} />
      </Carousel.Item>
      <Carousel.Item>
          <Image src={SaveLives} />
      </Carousel.Item>
      <Carousel.Item>
          <Image src={BeDonor} />
      </Carousel.Item>
    </Carousel>
    </>
  )
}
