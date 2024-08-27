import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegImages } from "react-icons/fa";
import { ImageFeatures, TypesOfChats } from "./MainFeatures";
import { IoSend } from "react-icons/io5";
import { RiSearch2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedWord, setSessionId } from "../services/inputSlice";
import {
  resetChatState,
  setChatQuestion,
  setPersonaDetails,
} from "../services/chatsSlice";
import { resetResponse } from "../services/responseSlice";

interface TextBarProps {
  setCurrentFeature: React.Dispatch<React.SetStateAction<string>>;
}
export const TextBar = ({ setCurrentFeature }: TextBarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [feature, setFeature] = useState<string>("Ask");
  const [featureVisible, setFeatureVisible] = useState(false);
  const [imageVisibility, setImageVisibility] = useState(false);
  const [question, setQuestion] = useState<string>("");

  const divRef = useRef<HTMLDivElement>(null);

  const handleSelectFeature = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFeature(event.target.value);
  };
  const handleSearch = () => {
    if (feature === "Chat") {
      dispatch(setChatQuestion(question));
      dispatch(
        setPersonaDetails({
          personaId: "48122ec5-5f65-4588-a012-0c7bfe15802f",
          personaName: "AfroChat",
          personaIconUrl:
            "https://res.cloudinary.com/afrochat/image/upload/v1701867563/wwld5uwkhakuf4lufrxx.png",
          type: "Persona",
          description: "Developed by A2SV to be your personal assistant.",
        })
      );
      navigate("/chat");
    } else {
      dispatch(setSessionId(""));
      dispatch(setSearchedWord(question));
      navigate("/response");
    }
  };

  useEffect(() => {
    if (feature === "Chat" || feature === "Ask") {
      setCurrentFeature("llm_models");
    }
  }, [feature, setCurrentFeature]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  useEffect(() => {
    dispatch(resetResponse());
    dispatch(resetChatState());
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setFeatureVisible(false);
      setImageVisibility(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={divRef} className="relative">
      {featureVisible && (
        <div>
          <TypesOfChats
            feature={feature}
            handleSelectFeature={handleSelectFeature}
          />
        </div>
      )}
      {imageVisibility && <ImageFeatures />}
      <div className="flex items-center rounded-full h-12 w-full justify-center bg-background shadow-lg px-5 gap-3 mt-3">
        <IoMdArrowDropdown
          onClick={() => {
            setFeatureVisible((prev) => !prev);
            setImageVisibility(false);
          }}
          className="text-button"
          size={25}
        />
        <input
          className="bg-transparent outline-none w-60 focus:ring-0"
          type="text"
          placeholder={feature}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyPress}
          onClick={() => {
            setFeatureVisible(false);
            setImageVisibility(false);
          }}
        />
        {question ? (
          <IoSend className="text-button" onClick={handleSearch} />
        ) : (
          <FaRegImages
            onClick={() => {
              setImageVisibility(!imageVisibility);
              setFeatureVisible(false);
            }}
            className="text-button"
            size={24}
          />
        )}
      </div>
    </div>
  );
};

interface ChatInputProps {
  onClick: (item: string) => void;
}
export const ChatBar = ({ onClick }: ChatInputProps) => {
  const [question, setQuestion] = useState<string>("");

  const handleInput = () => {
    onClick(question);
    setQuestion("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleInput();
    }
  };

  const handleSend = () => {
    handleInput();
  };

  return (
    <div className="fixed top-[80%] w-[93%] flex items-center rounded-full h-14 bg-background justify-between shadow-lg px-5 gap-3">
      <input
        className="bg-transparent outline-none w-60 focus:ring-0"
        type="text"
        placeholder="Ask anything"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <IoSend onClick={handleSend} />
    </div>
  );
};

export const SearchBar = () => {
  return (
    <div className="flex h-10 gap-3">
      <div className="flex items-center justify-center bg-background w-10 h-10 rounded-lg">
        <RiSearch2Line className="text-button font-bold" size={25} />
      </div>
      <input
        className="bg-background rounded-lg outline-none w-5/6 focus:ring-0 text-sm pl-2"
        type="text"
        placeholder="Search your chat history here..."
      />
    </div>
  );
};
