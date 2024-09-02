import { MdOutlineImageSearch } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import useAppRedirect from "../utils/useAppRedirect";

interface TypesOfChatsProps {
  feature: string;
  handleSelectFeature: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TypesOfChats = ({
  feature,
  handleSelectFeature,
}: TypesOfChatsProps) => {
  const handleRedirect = useAppRedirect();

  return (
    <div className="fixed bottom-36 bg-background text-nowrap text-text flex flex-col rounded-lg p-3 w-52 px-2 gap-3">
      <label className="flex justify-between text-nowrap" htmlFor="ask">
        Ask
        <input
          id="ask"
          name={feature}
          type="radio"
          value="Ask"
          checked={feature === "Ask"}
          onChange={handleSelectFeature}
        />
      </label>
      <label className="flex justify-between text-nowrap" htmlFor="chat">
        Chat
        <input
          id="chat"
          name={feature}
          className="bg-transparent"
          type="radio"
          value="Chat"
          checked={feature === "Chat"}
          onChange={handleSelectFeature}
        />
      </label>
      <label
        className="flex justify-between text-nowrap"
        htmlFor="generateImage"
        onClick={handleRedirect}
      >
        Generate Image
        <input
          id="generateImage"
          name={feature}
          className="bg-transparent"
          type="radio"
          value="Generate Image"
          checked={feature === "Image"}
          onChange={handleSelectFeature}
        />
      </label>
    </div>
  );
};

export const ImageFeatures = () => {
  const handleRedirect = useAppRedirect();

  return (
    <div className="fixed bottom-36 bg-background text-nowrap text-text flex flex-col gap-3 rounded-lg p-3 w-48 px-2 left-[38%]">
      <div
        className="flex justify-between text-nowrap items-center"
        onClick={handleRedirect}
      >
        <p>Describe Image</p>
        <MdOutlineImageSearch className="text-accent" size={18} />
      </div>
      <div
        className="flex justify-between text-nowrap items-center"
        onClick={handleRedirect}
      >
        <p>Edit Image</p>
        <FaRegEdit className="text-accent" size={18} />
      </div>
    </div>
  );
};
