import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'reactstrap'
import './Custom.css'
import '@brainhubeu/react-carousel/lib/style.css'

const Gallery = ({ image }) => {
  return (
    <div className="product-gallery CenterTheImage">
      <Col>
        <img
         className="customGemImage"
          src={image}
          alt="product-img"
          fluid
        />
      </Col>
    </div>
  )
}

Gallery.propTypes = {
  image: PropTypes.string.isRequired,
}

export default Gallery
