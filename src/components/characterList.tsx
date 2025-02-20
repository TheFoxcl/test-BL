import React, { useState } from "react";
import { SimpleAvatar } from "./avatar";
import SearchInput from "./inputSearch";

interface CharacterListProps {
  charactersById: any;
  handleHeartClick: (id: string) => void;
  handleFocusCharacter: (id: string) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  charactersById,
  handleHeartClick,
  handleFocusCharacter,
}) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortCharacters = (characters: any[], order: "asc" | "desc") => {
    return characters.sort((a, b) => {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  };

  const starredCharacters = sortCharacters(
    Object.values(charactersById).filter(
      (character: any) => character.isStarred
    ),
    sortOrder
  );

  const otherCharacters = sortCharacters(
    Object.values(charactersById).filter(
      (character: any) => !character.isStarred
    ),
    sortOrder
  );

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div
      id="characterListContainer"
      className=" lg:w-[26%] bg-gray-100 overflow-y-auto md:w-[40%] sm:w-[100%]"
    >
      <h1 className="text-2xl pt-8 mx-4">Rick and Morty list</h1>
      <SearchInput />
      <button
        onClick={toggleSortOrder}
        className="mx-4 my-2 p-2 bg-customPurpleSecondary text-white text-xs rounded-lg"
      >
        Sort {sortOrder === "asc" ? "Z to A" : "A to Z"}
      </button>
      <div id="characterListSection">
        <div id="starredCharacters" className="mb-4">
          <h5 className="text-xs m-4 text-gray-600 font-semibold">
            STARRED CHARACTERS ({starredCharacters.length})
          </h5>
          {starredCharacters.map((character: any) => (
            <div key={character.id}>
              <SimpleAvatar
                id={character.id}
                image={character.image}
                name={character.name}
                species={character.species}
                isStarred={character.isStarred}
                onHeartClick={handleHeartClick}
                onFocusCharacter={handleFocusCharacter}
              />
            </div>
          ))}
        </div>
        <div id="otherCharacters">
          <h5 className="text-xs m-4 text-gray-600 font-semibold">
            CHARACTERS ({otherCharacters.length})
          </h5>
          {otherCharacters.map((character: any) => (
            <div key={character.id}>
              <SimpleAvatar
                id={character.id}
                image={character.image}
                name={character.name}
                species={character.species}
                isStarred={character.isStarred}
                onHeartClick={handleHeartClick}
                onFocusCharacter={handleFocusCharacter}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterList;
