import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import NewChat from "../../components/NewChat";
import ContinuedChat from "../../components/ContinuedChat";
import { ChatBar } from "../../components/InputTextFields";
import { setChatQuestion } from "../../services/chatsSlice";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { session_id, personaIconUrl, personaName } = useSelector(
    (state: RootState) => state.chats
  );
  const handleInput = (input: string) => {
    if (input !== "") {
      dispatch(setChatQuestion(input));
    }
  };

  return (
    <>
      <div className="fixed flex gap-4 bg-background p-2 w-screen self-center">
        <img
          className="relative h-10 w-10 rounded-full"
          src={personaIconUrl}
          alt=""
        />
        <p className="self-center font-semibold text-text">{personaName}</p>
      </div>
      <div className="h-[500px] flex flex-col gap-8 p-3 pt-16 overflow-y-auto bg-secondaryBg pb-10">
        {!session_id ? <NewChat /> : <ContinuedChat />}
        <div className="fixed top-[77%] bg-secondaryBg w-full h-full">
          <ChatBar onClick={handleInput} />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
