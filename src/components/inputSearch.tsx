import { SlEqualizer } from "react-icons/sl";
const SearchInput = () => {
  return (
    <div className="flex items-center rounded-lg p-2 bg-gray-200 mx-4 my-8">
      <svg
        className="w-6 h-6 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35a7.5 7.5 0 10-1.4 1.4L21 21z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search or filter results"
        className="flex-grow outline-none px-2 text-md h-10 w-20"
      />
      <SlEqualizer className="text-customPurpleSecondary w-6 h-6 m-2" />
    </div>
  );
};

export default SearchInput;
