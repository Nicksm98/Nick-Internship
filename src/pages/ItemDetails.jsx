import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import AOS from 'aos';
import 'aos/dist/aos.css';

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
      AOS.init();
      window.scrollTo(0, 0);
    }, []);
  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
        setLoading(false);
      });
  }, [nftId]);

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton width="400px" height="400px" borderRadius="8px" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2><Skeleton width="300px" height="40px" borderRadius="4px" /></h2>
                    <div className="item_info_counts">
                      <Skeleton width="100px" height="20px" borderRadius="4px" />
                    </div>
                    <div><Skeleton width="100%" height="60px" borderRadius="4px" /></div>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6><Skeleton width="100px" height="20px" borderRadius="4px" /></h6>
                        <div className="item_author">
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                          <div className="author_list_info">
                            <Skeleton width="100px" height="20px" borderRadius="4px" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h6><Skeleton width="100px" height="20px" borderRadius="4px" /></h6>
                    <div className="nft-item-price">
                      <Skeleton width="100px" height="20px" borderRadius="4px" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!item) {
    return <div>Error loading item details.</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  data-aos="zoom-in"
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2 data-aos="flip-up">{item.title}</h2>

                  <div className="item_info_counts">
                    <div data-aos="flip-up" className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views}
                    </div>
                    <div data-aos="flip-up" className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes}
                    </div>
                  </div>
                  <div data-aos="slide-right">{item.description}</div>
                  <div data-aos="flip-up" className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId}`}>
                            <img className="lazy" src={item.ownerImage} alt={item.ownerName} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.ownerId}`}>{item.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div data-aos="flip-down" className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.creatorId}`}>
                            <img className="lazy" src={item.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.creatorId}`}>{item.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6 data-aos="flip-down">Price</h6>
                    <div data-aos="flip-down" className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;