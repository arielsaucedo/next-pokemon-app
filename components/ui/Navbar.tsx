import { Spacer, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0px 20px",
        backgroundColor: theme?.colors.gray100.value,
      }}
    >
      <Image
        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
        alt='icono de la app'
        width={70}
        height={70}
      />

      <Link legacyBehavior href='/'>
        <a style={{ display: "flex" }}>
          <Text color='white' h2>
            P
          </Text>
          <Text color='white' h3>
            okemon
          </Text>
        </a>
      </Link>

      <Spacer css={{ flex: 1 }} />
      <Link href='/favorites'>
        <Text color='white'>Favoritos</Text>
      </Link>
    </div>
  );
};
