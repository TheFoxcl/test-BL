import React from "react";
import CharacterList from "./characterList";

interface LayoutProps {
  charactersById: any;
  handleHeartClick: (id: string) => void;
  handleFocusCharacter: (id: string) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  charactersById,
  handleHeartClick,
  handleFocusCharacter,
  children,
}) => {
  return (
    <div className="flex h-screen sm:w-full">
      <CharacterList
        charactersById={charactersById}
        handleHeartClick={handleHeartClick}
        handleFocusCharacter={handleFocusCharacter}
      />
      {children}
    </div>
  );
};

export default Layout;
