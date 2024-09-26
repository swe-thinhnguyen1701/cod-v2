import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_HERO_BY_NAME } from "../utils/queries";
import HeroDetail from "../components/HeroDetail";

function HeroDetailPage() {
    const { heroName } = useParams();
    const { loading, data, error } = useQuery(GET_HERO_BY_NAME, {
        variables: { heroName }
    });

   

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const hero = data?.getHeroByName;

    return (
        <div className="page hero-detail-page">
            {hero ? (<HeroDetail hero={hero}/>) : (<p>No found</p>)}
        </div>
    )
}

export default HeroDetailPage;