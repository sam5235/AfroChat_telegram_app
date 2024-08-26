import { useDispatch, useSelector } from "react-redux";
import smoothscroll from "smoothscroll-polyfill";
import { RootState } from "../store/store";
import { useGetChatResponseQuery } from "../services/apiSlices";
import { useEffect, useRef } from "react";
import { addChatResponse, setChatQuestion } from "../services/chatsSlice";

const ContinuedChat = () => {
  console.log("here2");
  const dispatch = useDispatch();
  const { personaId, chatQuestion, type, session_id, chatResponses } =
    useSelector((state: RootState) => state.chats);

  const { data, isFetching, refetch, isLoading } = useGetChatResponseQuery(
    {
      question: chatQuestion,
      model: "GPT 3.5",
      message_from: 2,
      image_url: "",
      image_mask_url: "",
      chat_session_id: session_id,
      persona_id: personaId,
      sub_tool_id: personaId,
      image_model: "Stable Diffusion",
      audio_model: "tts-1",
      voice_option: "alloy",
      type: type,
    },
    { skip: !chatQuestion || !session_id }
  );

  const gethours = (time: string) => {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const lastChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      dispatch(addChatResponse(data));
      dispatch(setChatQuestion(""));
      console.log("resp", data, chatResponses);
    }
  }, [data]);

  useEffect(() => {
    if (chatQuestion) {
      refetch();
    }
  }, [chatQuestion]);

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  useEffect(() => {
    // scroll into view
    if (lastChatRef.current) {
      lastChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [lastChatRef, chatResponses]);

  return (
    <>
      {chatResponses?.map((chat, idx) => (
          <div key={idx} className="flex flex-col gap-2">
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
          </div>
        )
      )}
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

export default ContinuedChat;
