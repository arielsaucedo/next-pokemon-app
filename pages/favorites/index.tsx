import { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { NoFavorites } from "../../components/ui";
import { localFavorites } from "../../utils";
import { FavoritesPokemons, PokemonCard } from "../../components/pokemon";

const FavoritesPage = () => {
  const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesPokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title='Pokemon - Favoritos'>
      {favoritesPokemons.length === 0 ? <NoFavorites /> : <FavoritesPokemons pokemons={favoritesPokemons} />}
    </Layout>
  );
};

export default FavoritesPage;
