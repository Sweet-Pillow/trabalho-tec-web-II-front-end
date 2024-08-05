// src/components/Vote/index.jsx
import PropTypes from "prop-types";
import { useState } from "react";
import api from "../../lib/api"; // Importa a instância do axios

function Vote({ id, votes, onVote }) {
  const [currentVotes, setCurrentVotes] = useState(votes);

  const updateVoteInBackend = async (newVoteCount) => {
    // Envia a requisição PUT com o formato correto
    await api.put(`/answers/${id}`, {
      votesAmount: newVoteCount, // Atualiza a quantidade de votos
    });
    // Chama a função de callback com o novo número de votos
    onVote(newVoteCount);
  };

  const handleUpvote = async () => {
    const newVoteCount = currentVotes + 1;
    if (newVoteCount === 0) return;
    setCurrentVotes(newVoteCount);
    await updateVoteInBackend(newVoteCount);
  };

  const handleDownvote = async () => {
    const newVoteCount = currentVotes - 1;
    if (newVoteCount === -1) return;
    setCurrentVotes(newVoteCount);
    await updateVoteInBackend(newVoteCount);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleUpvote}
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
        onClick={handleDownvote}
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
  id: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  onVote: PropTypes.func.isRequired,
};

export default Vote;
