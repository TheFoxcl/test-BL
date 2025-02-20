import { useState, useEffect } from "react";
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import "./App.css";
import { GET_CHARACTERS } from "./modulos/charactersQuery";
import { useQuery, useApolloClient } from "@apollo/client";
import { DetailsAvatar } from "./components/avatar";
import Layout from "./components/layout";
import { useMediaQuery } from "react-responsive";

const App: React.FC = () => {
  const client = useApolloClient();
  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page: 1 },
    fetchPolicy: "cache-first",
  });

  const [charactersById, setCharactersById] = useState<any>({});
  const navigate = useNavigate();

  // Detectar si la pantalla es pequeña (sm)
  const isSmallScreen = useMediaQuery({ query: "(max-width: 700px)" });

  const DetailsContainer: React.FC<{ charactersById: any }> = ({
    charactersById,
  }) => {
    const { id } = useParams<{ id: string }>();
    const character = id ? charactersById[id] : undefined;

    const handleSaveNote = (id: string, note: string) => {
      setCharactersById((prevCharacters: any) => ({
        ...prevCharacters,
        [id]: { ...prevCharacters[id], note },
      }));
    };

    return character ? (
      <div
        id="detailsContainer"
        className="sm:w-[100%] sm:mx-4 lg:w-[74%] lg:mx-20 md:w-[60%]"
      >
        <DetailsAvatar
          id={character.id}
          image={character.image}
          name={character.name}
          species={character.species}
          isStarred={character.isStarred}
          status={character.status}
          location={character.location.name}
          note={character.note}
          onSaveNote={(note) => handleSaveNote(character.id, note)}
        />
      </div>
    ) : null;
  };

  useEffect(() => {
    if (data) {
      const characters = data.characters.results.reduce(
        (acc: any, character: any) => {
          acc[character.id] = { ...character, isStarred: false };
          return acc;
        },
        {}
      );
      setCharactersById((prevCharacters: any) => ({
        ...prevCharacters,
        ...characters,
      }));

      if (data.characters.info.next) {
        fetchMore({
          variables: { page: data.characters.info.next },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prevResult;
            return {
              characters: {
                ...fetchMoreResult.characters,
                results: [
                  ...prevResult.characters.results,
                  ...fetchMoreResult.characters.results,
                ],
              },
            };
          },
        });
      }
    }
  }, [data, fetchMore]);

  const handleHeartClick = (id: string) => {
    setCharactersById((prevCharacters: any) => {
      const newStatus = !prevCharacters[id].isStarred;

      client.cache.modify({
        id: client.cache.identify({ __typename: "Character", id }),
        fields: {
          isStarred() {
            return newStatus;
          },
        },
      });

      return {
        ...prevCharacters,
        [id]: { ...prevCharacters[id], isStarred: newStatus },
      };
    });
  };

  const handleFocusCharacter = (id: string) => {
    navigate(`/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {!isSmallScreen ? (
        <Layout
          charactersById={charactersById}
          handleHeartClick={handleHeartClick}
          handleFocusCharacter={handleFocusCharacter}
        >
          <Routes>
            <Route
              path="/:id"
              element={<DetailsContainer charactersById={charactersById} />}
            />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                charactersById={charactersById}
                handleHeartClick={handleHeartClick}
                handleFocusCharacter={handleFocusCharacter}
              >
                <></>
              </Layout>
            }
          />
          {/* En pantallas pequeñas, mostrar solo detalles en "/:id" */}
          <Route
            path="/:id"
            element={<DetailsContainer charactersById={charactersById} />}
          />
        </Routes>
      )}
    </>
  );
};

export default App;
