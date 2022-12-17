import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Gamedetails() {
  let param = useParams();
  const [gameDetails, setGameDetails] = useState({});
  async function getGameDetails() {
    console.log(param.id);
    const options = {
      method: "GET",
      url: `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${param.id}`,
      headers: {
        "X-RapidAPI-Key": "9682ed2c68msh19d7eceae802daep14631ejsnd25102d05675",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    await axios.request(options).then(function (response) {
      setGameDetails(response.data);
      console.log(response.data);
    });
  }
  useEffect(() => {
    getGameDetails();
  }, []);

  return (
    <>
      <div className="container py-5 my-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow mb-3 rounded">
              <img
                src={gameDetails.thumbnail}
                className="w-100 rounded-2"
                alt="game"
              />
            </div>
            <div className="row justify-content-between">
              <div className="col-3 col-lg-2 me-2">
                <Link to="#" className="btn btn-sm dark mb-3 p-2">
                  Free
                </Link>
              </div>
              <div className="col">
                <a
                  href={gameDetails.freetogame_profile_url}
                  className="fw-bolder card-btn btn btn-ftg-blue btn-block w-100"
                >
                  PLAY NOW
                  <i className="fas fa-sign-out-alt ms-2"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <h1>{gameDetails.title}</h1>
            <h5>About {gameDetails.title}</h5>
            <p>{gameDetails.description}</p>
            <h5>Minimum System Requirements</h5>
            <ul className="list-unstyled ms-2">
              <li>
                {/* graphics :{gameDetails.minimum_system_requirements.graphics} */}
              </li>
              <li>
                <span className="fw-bolder"> memory : </span>
                {gameDetails.minimum_system_requirements?.memory}
              </li>
              <li>
                <span className="fw-bolder">os : </span>
                {gameDetails.minimum_system_requirements?.os}
              </li>
              <li>
                <span className="fw-bolder"> processor : </span>
                {gameDetails.minimum_system_requirements?.processor}
              </li>
              <li>
                <span className="fw-bolder"> storage : </span>
                {gameDetails.minimum_system_requirements?.storage}
              </li>
            </ul>
            <h4>{gameDetails.title}screenshots</h4>

            <div
              id="carouselExampleSlidesOnly"
              class="carousel slide py-4"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  {gameDetails.screenshots ? (
                    <img
                      src={gameDetails.screenshots[0].image}
                      className="d-block w-100"
                      alt="..."
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="carousel-item">
                  {gameDetails.screenshots ? (
                    <img
                      src={gameDetails.screenshots[1].image}
                      className="d-block w-100"
                      alt="..."
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="carousel-item">
                  {gameDetails.screenshots ? (
                    <img
                      src={gameDetails.screenshots[2].image}
                      className="d-block w-100"
                      alt="..."
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <h2 className="py-4">Additional Information</h2>

            <div className="row">
              <div className="col-6 col-md-4">
                <span className="text-muted">Title</span>
                <p>{gameDetails.title}</p>
              </div>
              <div className="col-6 col-md-4">
                <span className="text-muted">Developer</span>
                <p>{gameDetails.developer}</p>
              </div>
              <div className="col-6 col-md-4">
                <span className="text-muted">Publisher</span>
                <p>{gameDetails.publisher}</p>
              </div>
              <div className="col-6 col-md-4">
                <span className="text-muted">Release Date</span>
                <p>{gameDetails.release_date}</p>
              </div>
              <div className="col-6 col-md-4">
                <span className="text-muted">Genre</span>
                <p>{gameDetails.genre}</p>
              </div>
              <div className="col-6 col-md-4">
                <span className="text-muted">Platform</span>
                <p>{gameDetails.platform}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
