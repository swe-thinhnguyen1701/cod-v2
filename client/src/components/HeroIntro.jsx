/* eslint-disable react/prop-types */
import Badge from "./Badge";
import sampleFly from "../assets/fly.webp"

function HeroIntro({hero, race}) {
    
    const TALENT_RANKS = ["primary", "secondary", "thirdary"];
    return (
        <section className="hero-intro">
            <div className="hero-background">
                <div className="hero-image-container">
                    <img src={hero.fullImage} alt="Hero" className="hero-image" />
                </div>
                <div className="hero-backgroundrop-gradient"></div>
            </div>
            <div className="hero-intro-info">
                <div className="hero-title">
                    <div className="race-icon-container">
                        <img src={race.logo} alt="" className="race-icon" />
                        <span className="race-description-container race-description--springwardens">
                            <div className="race-name">{race.name}</div>
                            <div className="race-description">{race.description}</div>
                            <div className="race-effect-container">
                                <div className="race-effect-title">Effect</div>
                                <div className="race-effect-description">
                                    {race.effects.map((effect, index) => {
                                        return (
                                            <div className="race-effect" key={index}>
                                                <span>{effect.name}</span>
                                                <span className="buff-effect-positive">{effect.value}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </span>
                    </div>
                    <span>{hero.title}</span>
                </div>
                <div className="hero-name">
                    {hero.name}
                    {hero.isFlying &&
                        <div className="wing-icon-container">
                            <img src={sampleFly} alt="" className="wing-icon" />
                            <div className="flying-legion-container">
                                <strong>Flying Hero</strong><br />
                                This is a <strong>Flying Hero</strong>. Flying Heroes can form Flying Legions. A Flying Legion can only contain <strong>Flying units</strong>, <strong>Flying Heroes</strong>, and <strong>Flying War Pet</strong>
                            </div>
                        </div>}
                </div>
                <div className="hero-roles">
                    <ul className="list list--inline">
                        {hero.talents.map((role, index) => {
                            return (
                                <li className="list-item" key={index}>
                                    <Badge talentName={role} talentRank={TALENT_RANKS[index]} />
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="hero-description">{hero.description}</div>

            </div>
        </section>
    )
}

export default HeroIntro;