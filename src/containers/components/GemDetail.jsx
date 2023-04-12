import React from 'react'
import { Link } from 'react-router-dom'
import { CardBody } from 'reactstrap'

const GemDetail = ({items}) => {

  return (
    <div className="catalog-items__wrap">
      <div className="catalog-items">
        {items.map((item) => (
          <CardBody className="catalog-item box-shadow " key={item.id}>
            <Link className="catalog-item__link" to={item.displayUrl}>
              <div className="catalog-item__img-wrap">
                <img
                  className="catalog-item__img"
                  src={item.imageUrl}
                  alt="catalog-item-img"
                />
              </div>
              <div className="catalog-item__info">
                <h4 className="catalog-item__title">{item.name}</h4>
                <br></br>
                <p className="catalog-item__description">Get {item.gameAssetDesc}</p>
                <br></br>
                {item.isAvailable ? <h4 className="catalog-item__title">{item.tokenIds.length} Available</h4> : <h4 className="catalog-item__title">Coming Soon!</h4>}
                <h3 className="catalog-item__price">{item.salePrice} ETH</h3>
                <p className="catalog-item__description">USD {parseInt(item.ethUsdPrice)}</p>
              </div>
            </Link>
          </CardBody>
        ))}
      </div>
    </div>
  )
}

export default GemDetail
