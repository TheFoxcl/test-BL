import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

interface SimpleAvatarProps {
  id: string;
  image: string;
  name: string;
  species: string;
  isStarred: boolean;
  onHeartClick: (id: string) => void;
  onFocusCharacter: (id: string) => void;
}

function SimpleAvatar({
  id,
  image,
  name,
  species,
  isStarred,
  onHeartClick,
  onFocusCharacter,
}: SimpleAvatarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocusCharacter(id);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      className={`px-2 py-4 w-[90%] justify-between items-center border-t border-gray-300 mx-4 cursor-pointer  ${
        isFocused ? "bg-customPurplePrimary border-none rounded-lg" : ""
      }`}
      id={id}
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className="flex items-center">
        <Avatar alt={name || "desconocido"} src={image} />
        <div className="flex flex-col justify-center ml-2">
          <h1 className="text-md font-semibold">{name || "desconocido"}</h1>
          <p className="text-md text-gray-600">{species || "desconocido"}</p>
        </div>
      </div>
      <div className="flex items-center justify-center w-8 h-8 rounded-full">
        {isStarred ? (
          <FaHeart
            className="w-6 h-6 text-customGreen"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click event from bubbling up to the Stack
              onHeartClick(id);
            }}
          />
        ) : (
          <FaRegHeart
            className="w-6 h-6 text-gray-400"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click event from bubbling up to the Stack
              onHeartClick(id);
            }}
          />
        )}
      </div>
    </Stack>
  );
}

interface DetailsAvatarProps {
  id: string;
  image: string;
  name: string;
  species: string;
  isStarred: boolean;
  status: string;
  location: string;
  note: string;
  onSaveNote: (id: string, note: string) => void;
}

function DetailsAvatar({
  id,
  image,
  name,
  species,
  status,
  location,
  note,
  onSaveNote,
  isStarred,
}: // onHeartClick,
DetailsAvatarProps) {
  const [currentNote, setCurrentNote] = useState<string>(note);

  const handleSaveNote = () => {
    onSaveNote(id, currentNote);
    setCurrentNote("");
  };
  return (
    <Stack
      direction="row"
      spacing={2}
      className={`py-10 w-[100%] justify-between items-center border-t border-gray-300 mx-1 sm:w-[100%] sm:mx-4`}
      id={id}
      tabIndex={0}
    >
      <div className="flex flex-col justify-center space-y-5 w-full">
        <div>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Avatar
              alt={name || "desconocido"}
              src={image}
              sx={{ width: 75, height: 75 }}
            />
            {isStarred && (
              <FaHeart className="absolute bottom-0 right-0 text-customGreen w-6 h-6" />
            )}
          </StyledBadge>
          <h1 className="text-xl font-bold py-2">{name || "desconocido"}</h1>
        </div>

        <div className="flex flex-col justify-center border-b border-gray-300 w-full pb-4">
          <h2 className="text-lg font-semibold">Specie</h2>
          <p className="text-lg text-gray-600">{species || "desconocido"}</p>
        </div>
        <div className="flex flex-col justify-center border-b border-gray-300 w-full pb-4">
          <h2 className="text-lg font-semibold">Status</h2>
          <p className="text-lg text-gray-600">{status || "desconocido"}</p>
        </div>
        <div className="flex flex-col justify-center border-b border-gray-300 w-full pb-4">
          <h2 className="text-lg font-semibold">Location</h2>
          <p className="text-lg text-gray-600">{location || "desconocido"}</p>
        </div>
        {note && (
          <div className="flex flex-col justify-center border-b border-gray-300 w-full pb-4">
            <h2 className="text-lg font-semibold">Note</h2>
            <p className="text-lg text-gray-600">{note}</p>
          </div>
        )}
        <div>
          <input
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            placeholder="Note..."
            type="text"
            className="mr-2 w-1/2 h-10 border border-gray-300 rounded-lg shadow-md placeholder-gray-500 focus:outline-none focus:border-customPurpleSecondary focus:ring-1 focus:ring-customPurpleSecondary px-4"
          />
          <button
            onClick={handleSaveNote}
            className="bg-customPurpleSecondary text-white px-4 py-2 rounded-lg mt-2"
          >
            Save Note
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center w-8 h-8 rounded-full"></div>
    </Stack>
  );
}

export { SimpleAvatar, DetailsAvatar };
