import { Link } from "react-router-dom";
import "./Carousel.css";

const slides = [
  {
    src: "https://www.countryflags.com/wp-content/uploads/denmark-flag-png-large.png",
    alt: "Denmark",
    path: "/country/Denmark",
  },
  {
    src: "https://www.countryflags.com/wp-content/uploads/poland-flag-png-large.png",
    alt: "Poland",
    path: "/country/Poland",
  },
  {
    src: "https://www.countryflags.com/wp-content/uploads/greece-flag-png-large.png",
    alt: "Greece",
    path: "/country/Greece",
  },
  {
    src: "https://www.countryflags.com/wp-content/uploads/serbia-flag-png-large.png",
    alt: "Serbia",
    path: "/country/Serbia",
  },
];

const Carousel = () => {
  return (
    <div id="demo" className="carousel slide shadow" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to={i}
            className={i === 0 ? "active" : ""}
            aria-current={i === 0 ? "true" : undefined}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="carousel-inner">
        {slides.map((slide, i) => (
          <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
            <Link to={slide.path}>
              <img
                src={slide.src}
                className="d-block mx-auto"
                alt={slide.alt}
              />
            </Link>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#demo"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#demo"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
