import React from "react";
import { useParams } from "react-router-dom";
import { SimpleAvatar } from "./avatar";

interface CharacterDetailsProps {
  charactersById: any;
  handleHeartClick: (id: string) => void;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  charactersById,
  handleHeartClick,
}) => {
  const { id } = useParams<{ id: string }>();
  const character = id ? charactersById[id] : undefined;

  if (!character) {
    return <p>Character not found</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <SimpleAvatar
        id={character.id}
        image={character.image}
        name={character.name}
        species={character.species}
        isStarred={character.isStarred}
        onHeartClick={handleHeartClick}
        onFocusCharacter={() => {}}
      />
      <div className="mt-4">
        <h2 className="text-2xl font-bold">{character.name}</h2>
        <p className="text-lg">Status: {character.status}</p>
        <p className="text-lg">Species: {character.species}</p>
        <p className="text-lg">Location: {character.location.name}</p>
      </div>
    </div>
  );
};

export default CharacterDetails;
