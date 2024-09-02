import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setSessionId,
  setSearchedWord,
} from "../services/inputSlice";
import {
  addHistoryChat,
  resetChatState,
  setChatSessionId,
  setPersonaDetails,
} from "../services/chatsSlice";
import { useGetChatDetailsQuery } from "../services/apiSlices";
import { useEffect, useState } from "react";
import { resetResponse, setResponse } from "../services/responseSlice";
import { historyHourFormatter } from "../utils/timeFormatter";

interface HistoryCardProp {
  history: any;
}
const HistoryCard = ({ history }: HistoryCardProp) => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data} = useGetChatDetailsQuery(
    { chat_session_id: history.id, type: history.type },
    { skip: !clicked }
  );

  useEffect(() => {
    if (data) {
      if (history.type === "Chat") {
        dispatch(resetChatState());
        const historyChat: any[][] = [];
        data.data.forEach((item: any, index: number) => {
          if (index % 2 === 0 && index + 1 < data.data.length) {
            historyChat.push([item, data.data[index + 1]]);
          }
        });
        dispatch(setPersonaDetails({
          personaId: history.persona_id,
          personaName: history.name,
          personaIconUrl: history.image,
          type: history.type,
          description: history.description,
        }));
        dispatch(setChatSessionId(history.id));
        dispatch(addHistoryChat(historyChat));
        setClicked(false);
        navigate("/chat");
      } else {
        dispatch(resetResponse());
        dispatch(setSessionId(history.id));
        dispatch(setResponse(data.data));
        dispatch(setSearchedWord(""));
        navigate("/response");
      }
    }
  }, [data]);

  return (
    <div
      className="relative flex bg-background rounded-lg w-[90%] h-20 p-1"
      onClick={()=>setClicked(true)}
    >
      <div className="relative flex gap-2 w-full">
        <div className="rounded-full w-12 h-12 object-cover self-center">
          <img
            className="relative rounded-full w-full h-full"
            src={history.image}
            alt=""
          />
        </div>
        <div className="relative w-3/5 mr-5 self-center text-text">
          <p className="text-sm font-semibold line-clamp-1 break-words">
            {history.name}
          </p>
          <p className="text-xs line-clamp-2 break-words">
            {history.first_message}
          </p>
        </div>
        <div className="self-end">
          <p className="text-[10px]">{historyHourFormatter(history.updated_at)}</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
