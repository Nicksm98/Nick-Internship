
import { Link } from 'react-router-dom';
import Skeleton from '../UI/Skeleton';

const AuthorItems = ({ authorImage, authorItems }) => {
  if (!authorItems) {
    return <Skeleton width="306px" height="441px" borderRadius="25px" />;
  }
  return (
    <div data-aos="slide-up" className='de_tab_content'>
      <div className='tab-1'>
        <div className='row'>
          {authorItems.map(item => (
            <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12' key={item.id}>
              <div className='nft__item'>
                <div className='author_list_pp'>
                  <Link to={`/item-details/${item.nftId}`}>
                    <img className='lazy' src={authorImage} alt='' />
                    <i className='fa fa-check'></i>
                  </Link>
                </div>
                <div className='nft__item_wrap'>
                  <div className='nft__item_extra'>
                    <div className='nft__item_buttons'>
                      <button>Buy Now</button>
                      <div className='nft__item_share'>
                        <h4>Share</h4>
                        <a href='/' target='_blank' rel='noreferrer'>
                          <i className='fa fa-facebook fa-lg'></i>
                        </a>
                        <a href='/' target='_blank' rel='noreferrer'>
                          <i className='fa fa-twitter fa-lg'></i>
                        </a>
                        <a href='/'>
                          <i className='fa fa-envelope fa-lg'></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className='lazy nft__item_preview'
                      alt={item.title}
                    />
                  </Link>
                </div>
                <div className='nft__item_info'>
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className='nft__item_price'>{item.price} ETH</div>
                  <div className='nft__item_like'>
                    <i className='fa fa-heart'></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;