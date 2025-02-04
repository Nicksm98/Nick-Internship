import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CountDown from "./CountDown";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        let sortedItems = response.data;

        if (sortOption === "price_low_to_high") {
          sortedItems = sortedItems.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price_high_to_low") {
          sortedItems = sortedItems.sort((a, b) => b.price - a.price);
        } else if (sortOption === "likes_high_to_low") {
          sortedItems = sortedItems.sort((a, b) => b.likes - a.likes);
        }

        setItems(sortedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setVisibleItems(8);
  };

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 8);
  };

  return (
    <>
      <div>
        <select id="filter-items" value={sortOption} onChange={handleSortChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        Array.from({ length: visibleItems }).map((_, index) => (
          <Skeleton key={index} width="300px" height="450px" borderRadius="8px" margin="10px"/>
        ))
      ) : (
        items.slice(0, visibleItems).map((item, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <CountDown time={item.endTime} />
              <div className="nft__item_wrap">
                <Link to={`/item-details/${item.nftId}`}>
                  <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId}`}>
                  <h4>{item.title}</h4>
                </Link>
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {visibleItems < items.length && (
        <div className="col-md-12 text-center">
          <button onClick={handleLoadMore} id="loadmore" className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;