/* eslint-disable react/prop-types */
import { useState } from "react"
// import {GET_HERO_SKILLS} from "../utils/queries";
// import { useQuery } from "@apollo/client";

function HeroSkill({heroSkills, race}) {
    console.log(heroSkills);
    
    const [selectedSkill, setSelectedSkill] = useState(0);

    const skillSeclectedHandler = (idx) => {
        setSelectedSkill(idx);
    }
    return (
        <section className="hero-skill">
            <ul className="list hero-skill-list">
                {heroSkills.map((skill, index) => {
                    return (
                        <li className={selectedSkill === index ? `list-item hero-skill-group hero-skill-selected` : `list-item hero-skill-group`} key={index} onClick={() => skillSeclectedHandler(index)}>
                            <div className="hero-skill-image-container">
                                <img className="hero-skill-image" src={skill.image} alt="" />
                            </div>
                            <div className="hero-skill-name">{skill.name}</div>
                        </li>
                    )
                })}
            </ul>
            <div className="hero-skill-description-container">
                <h3 className="hero-skill-name">{heroSkills[selectedSkill].name}</h3>
                <div className="hero-skill-description">
                    {heroSkills[selectedSkill].description.split("\n").map((line, index) => {
                        return (
                            <span key={index}>
                                {line}<br />
                            </span>
                        )
                    })}
                </div>
                <div className="hero-skill-effect-container">
                    {heroSkills[selectedSkill].effects.map((effect, index) => {
                        return (
                            <div className="hero-skill-effect" key={index}>
                                <span className="herro-skill-effect-name">{effect.name}: </span>
                                <span className="hero-skill-effect-value">{effect.value}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="hero-skill-background-logo">
                <img src={race.logo} alt="" />
            </div>
            <div className="hero-race-logo">
                <img src={race.icon} alt="" />
            </div>
        </section>
    )
}

export default HeroSkill;