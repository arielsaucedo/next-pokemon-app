import { useState } from "react";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";
import confetti from "canvas-confetti";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    typeof window === "undefined" && localFavorites.existInFavorites(pokemon.id)
  );

  const onToggleFavourite = () => {
    localFavorites.toogleFavorites(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (!isInFavorites) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        },
      });
    }
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: 5 }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: 30 }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || "./no-image.png"}
                alt={pokemon.name}
                width='100%'
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: "flex", justifyContent: "space-between" }}>
              <Text h1 transform='capitalize'>
                {pokemon.name}
              </Text>

              <Button color='gradient' ghost={!isInFavorites} onPress={onToggleFavourite}>
                {isInFavorites ? "En favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container display='flex' direction='row' gap={0}>
                <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100} />
                <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100} />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemon151.map((id) => ({
      params: {
        id,
      },
    })),
    // paths: [
    //   {
    //     params: {
    //       id: "1",
    //     },
    //   },
    //   {
    //     params: {
    //       id: "2",
    //     },
    //   },
    //   {
    //     params: {
    //       id: "3",
    //     },
    //   },
    // ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon: pokemon,
    },
    revalidate: 86400,
  };
};

export default PokemonPage;
