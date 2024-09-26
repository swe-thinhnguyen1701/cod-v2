import HeroCard from "../components/HeroCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_HEROES } from "../utils/queries";

function HeroesPage() {
    const { loading, data, error } = useQuery(GET_ALL_HEROES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div className="page hero-page">
            {data.getAllHeroes.map((hero) => (
                <HeroCard key={hero._id} hero={hero} />
            ))}
        </div>
    )
}

export default HeroesPage;