import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorItems from "../components/author/AuthorItems";
import AuthorBanner from "../images/author_banner.jpg";
import Skeleton from "../components/UI/Skeleton"; // Ensure Skeleton is imported

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);


  useEffect(() => {
    fetch(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
      .then((response) => response.json())
      .then((data) => {
        setAuthor(data);
        setFollowersCount(data.followers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching author data:", error);
        setLoading(false);
      });
  }, [authorId]);
  
  const handleFollowButtonClick = () => {
    if (isFollowing) {
      setFollowersCount(followersCount - 1);
    } else {
      setFollowersCount(followersCount + 1);
    }
    setIsFollowing(!isFollowing);
  };

  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 8; i++) {
      skeletons.push(
        <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12' key={i}>
          <Skeleton width="306px" height="441px" borderRadius="25px" />
        </div>
      );
    }
    return skeletons;
  };

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            data-bgimage="url(images/author_banner.jpg) top"
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="profile_avatar">
                  <Skeleton width="150px" height="150px" borderRadius="50%" />
                  <div className="profile_name">
                    <Skeleton width="200px" height="30px" borderRadius="5px" />
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <Skeleton width="100px" height="20px" borderRadius="5px" />
                      <Skeleton width="100px" height="40px" borderRadius="5px" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <div className="row">
                    {renderSkeletons()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div data-aos="slide-right" className="profile_avatar">
                      <img src={author.authorImage} alt={author.authorName} />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">@{author.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div data-aos="slide-left" className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followersCount} followers</div>
                      <button className="btn-main" onClick={handleFollowButtonClick}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                <AuthorItems  authorImage={author.authorImage} authorItems={author.nftCollection} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;