import PropTypes from "prop-types";
import Vote from "../Vote/index";

function Answer({ votes, userName, createData, answer }) {
  return (
    <div className="flex flex-row border-t border-gray-200 px-6 py-8 mb-8 bg-gray-50 rounded-lg">
      <Vote votes={votes} />
      <div className="px-4 flex flex-col flex-grow gap-y-2">
        <div className="flex flex-row justify-between text-sm text-gray-600 mb-2">
          <p>
            Respondida por: <span className="font-semibold">{userName}</span>
          </p>
          <p>Criada em: {createData}</p>
        </div>
        <p className="text-base">{answer}</p>
      </div>
    </div>
  );
}

Answer.propTypes = {
  votes: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  createData: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

export default Answer;
