import PropTypes from "prop-types";
import { useState } from "react";

function Vote({ votes }) {
  const [currentVotes, setCurrentVotes] = useState(votes);

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setCurrentVotes(currentVotes + 1)}
        className="border rounded-full border-gray-300 p-2 hover:bg-gray-100"
        aria-label="Upvote"
      >
        <svg
          className="fill-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
        >
          <path d="m280-400 200-201 200 201H280Z" />
        </svg>
      </button>
      <p className="text-xl py-1 font-medium">{currentVotes}</p>
      <button
        onClick={() => setCurrentVotes(currentVotes - 1)}
        className="border rounded-full border-gray-300 p-2 hover:bg-gray-100"
        aria-label="Downvote"
      >
        <svg
          className="fill-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
        >
          <path d="M480-360 280-559h400L480-360Z" />
        </svg>
      </button>
    </div>
  );
}

Vote.propTypes = {
  votes: PropTypes.number.isRequired,
};

export default Vote;
