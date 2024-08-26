import {MdOutlineImageSearch} from "react-icons/md"
import {FaRegEdit} from "react-icons/fa"
import { useEffect, useState } from "react";

interface TypesOfChatsProps {
  feature: string;
  handleSelectFeature: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TypesOfChats = ({
  feature,
  handleSelectFeature,
}: TypesOfChatsProps) => {
  return (
    <div className="fixed bottom-36 bg-background text-nowrap text-text flex flex-col rounded-lg p-3 w-52 px-2 gap-3">
      <label className="flex justify-between text-nowrap" htmlFor="html">
        Ask
        <input
          type="radio"
          value="Ask"
          checked={feature === "Ask"}
          onChange={handleSelectFeature}
        />
      </label>
      <label className="flex justify-between text-nowrap" htmlFor="html">
        Chat
        <input
          className="bg-transparent"
          type="radio"
          value="Chat"
          checked={feature === "Chat"}
          onChange={handleSelectFeature}
        />
      </label>
    </div>
  );
};


export const ImageFeatures = () => {

  const [link, setLink] = useState<string>('');

  useEffect(() => {
    const userAgentString = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(userAgentString)) {
      setLink("https://apps.apple.com/ph/app/afro-chat/id6499267442?uo=2");
    } else if (/Android/.test(userAgentString)) {
      setLink("https://play.google.com/store/apps/details?id=org.a2sv.afro_chat");
    } else {
      setLink("https://afrochat.app/application/chat/home");
    }
  }, []);

  const handleRedirect = () => {    
    window.open(link);
  };
  
  return (
    <div className="fixed bottom-36 bg-background text-nowrap text-text flex flex-col gap-3 rounded-lg p-3 w-52 px-2 left-[38%]">
      <div className="flex justify-between text-nowrap items-center" onClick={handleRedirect}>
        <p>Describe Image</p>
        <MdOutlineImageSearch className="text-accent" size={18} />
      </div>
      <div className="flex justify-between text-nowrap items-center" onClick={handleRedirect}>
        <p>Edit Image</p>
        <FaRegEdit className="text-accent" size={18} />
      </div>
    </div>
  );
};
