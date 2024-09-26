import { useQuery } from "@apollo/client";
import { GET_TALENT } from "../utils/queries";
import PropTypes from "prop-types";

// import sampleIcon from "../assets/infantry.webp";

function Badge({talentName, talentRank}) {
    // talentName = talentName.toLowerCase();
    const {loading, data} = useQuery(GET_TALENT, {variables: {talentName}});
    if (loading) return <p>Loading...</p>;
    const talentData = data.getTalent;
    return (
        <div className="badge-container">
            <div className={`badge badge--${talentRank}`}>
                <span className="talent-name">{talentData.name}</span>
                <div className="circle circle-up"></div>
                <div className="circle circle-down"></div>
            </div>
            <div className={`talent-icon-container talent--${talentRank}`}>
                <img src={talentData.icon} alt="" className="talent-icon" />
            </div>
        </div>
    )
}

Badge.propTypes = {
    talentName: PropTypes.string.isRequired,
    talentRank: PropTypes.string.isRequired
}

export default Badge;