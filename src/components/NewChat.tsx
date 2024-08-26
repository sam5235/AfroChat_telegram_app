import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useGetCreateNewChatQuery } from "../services/apiSlices";
import { useEffect, useRef } from "react";
import { addChatResponse, setChatQuestion, setChatSessionId } from "../services/chatsSlice";

const NewChat = () => {
  
  const dispatch = useDispatch();
  const {
    personaId,
    session_id,
    chatQuestion,
    type,
    chatResponses,
  } = useSelector((state: RootState) => state.chats);
  const { data, isLoading, isFetching } = useGetCreateNewChatQuery(
    {
      persona_id: personaId,
      sub_tool_id: personaId,
      question: chatQuestion,
      model: "GPT 3.5",
      type: type,
      message_from: 2,
      image_url: "",
      image_mask_url: "",
      image_model: "Stable Diffusion",
      audio_model: "tts-1",
      voice_option: "alloy",
    },
    { skip: !chatQuestion || session_id !== "" }
  );
  const lastChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      dispatch(addChatResponse(data.chat_messages));
      dispatch(setChatSessionId(data.id));
      dispatch(setChatQuestion(""));
    }
  }, [data]);
  useEffect(() => {
    // scroll into view
    if (lastChatRef.current) {
      lastChatRef.current.scrollIntoView();
    }
  }, [lastChatRef, chatResponses]);

  const gethours = (time: string) => {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {chatResponses?.map((chat, idx) => {
        <div key={idx}>
          <div className="flex max-w-[90%] bg-button p-2 rounded-2xl self-end gap-1">
            {chat[0].message}
            <p className="text-gray-400 text-xs self-end w-16">
              {gethours(chat[0].timestamp)}
            </p>
          </div>

          <div className="flex gap-1 max-w-[95%] bg-sectionBg rounded-2xl p-2">
            {chat[1].message}
            <p className="text-gray-400 text-xs self-end w-16">
              {gethours(chat[1].timestamp)}
            </p>
          </div>
        </div>;
      })}
      {(isLoading || isFetching) && (
        <div className="flex flex-col gap-2">
        <div
          ref={lastChatRef}
          className="max-w-[85%] bg-button p-2 rounded-2xl self-end gap-1"
        >
          {chatQuestion}
        </div>
        <div className="shimmer h-24 w-[85%] rounded-2xl"></div>
      </div>
      )}
    </>
  );
};

export default NewChat;
