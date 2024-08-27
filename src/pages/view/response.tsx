import { ResponseShimmer } from "../../components/ResponsePageShimmer";
import { TbZoomQuestion } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useGetAskResponseQuery } from "../../services/apiSlices";
import ResponsePage from "../../components/ResponsePage";
import { useEffect, useRef } from "react";
import { setSearchedWord, setSessionId } from "../../services/inputSlice";
import { ChatBar } from "../../components/InputTextFields";
import { addResponse } from "../../services/responseSlice";
import smoothscroll from "smoothscroll-polyfill";

const Response = () => {
  const dispatch = useDispatch();
  const { chats } = useSelector((state: RootState) => state.responses);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { searchedWord, selectedModel, session_id } = useSelector(
    (state: RootState) => state.input
  );

  const { data, refetch, isLoading, isFetching } = useGetAskResponseQuery(
    {
      ask_session_id: session_id,
      question: searchedWord,
      model: selectedModel,
      message_from: 2,
    },
    { skip: chats[chats.length - 1].question === searchedWord || !searchedWord }
  );

  const handleInput = (input: string) => {
    dispatch(setSearchedWord(input));
  };

  const handleClickRelated = (newQuestion: string) => {
    dispatch(setSearchedWord(newQuestion));
  };

  const lastChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && data.questions !== chats[chats.length - 1]?.question) {
      dispatch(setSessionId(data.ask_session_id));
      dispatch(addResponse(data));
    }
  }, [data?.question]);

  useEffect(() => {
    if (searchedWord && chats[chats.length - 1].question !== searchedWord) {
      refetch();
    }
  }, [searchedWord]);

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  useEffect(() => {
    // scroll into view
    if (lastChatRef.current) {
      lastChatRef.current.style.scrollMargin = "108px";
      lastChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [lastChatRef, chats]);

  return (
    <div className="flex flex-col py-5 h-full bg-secondaryBg gap-3 px-2 pb-16 ">
      {isLoading && chats.length === 0 ? (
        <ResponseShimmer />
      ) : (
        <>
          {chats.length > 0 && (
            <>
              {chats.slice(1).map((chat, idx) => (
                <div
                  className=""
                  ref={idx === chats.slice(1).length - 1 ? lastChatRef : null}
                >
                  <p className="bg-background w-auto rounded-md px-2 font-light font-serif">
                    {chat.question}
                  </p>
                  <ResponsePage key={idx} data={chat} />
                </div>
              ))}
              {isFetching && <ResponseShimmer />}
              {chats.length > 1 && !isFetching && (
                <div className="flex flex-col pb-16">
                  <div className="flex flex-row justify-start gap-2">
                    <TbZoomQuestion size={26} />
                    <p className="font-extrabold text-xl mb-3">
                      Related Questions
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 h-full overflow-y-scroll">
                    {" "}
                    {data
                      ? data.recommendations.map(
                          (item: string, idx: number) => (
                            <div
                              key={idx}
                              className="rounded-md p-2 bg-background text-sm text-hint font-semibold"
                              onClick={() => handleClickRelated(item)}
                            >
                              {item}
                            </div>
                          )
                        )
                      : chats[chats.length - 1].recommendations.map(
                          (item: string, key: number) => (
                            <div
                              key={key}
                              className="rounded-md p-2 bg-background text-sm text-hint font-semibold"
                              onClick={() => handleClickRelated(item)}
                            >
                              {item}
                            </div>
                          )
                        )}
                  </div>
                </div>
              )}
              <div className="fixed top-[80%] bg-secondaryBg w-full h-full">
                <ChatBar onClick={handleInput} />
              </div>
              <div ref={messagesEndRef} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Response;
