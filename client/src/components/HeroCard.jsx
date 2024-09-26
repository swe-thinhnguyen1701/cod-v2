import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function HeroCard({ hero }) {

    return (
        <Link className="link" to={`/heroes/${hero.name}`}>
            <div className={`hero-card ${hero.rank}`}>
                <div className="hero-image-container">
                    <img src={hero.fullImage} alt="hero image" className="hero-image" />
                </div>
                <div className="hero-name">
                    <h3>{hero.name}</h3>
                </div>
            </div>
        </Link>

    )
}

HeroCard.propTypes = {
    hero: PropTypes.shape({
        fullImage: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        rank: PropTypes.string.isRequired,
    })
}

export default HeroCard;