import { MdOutlineMessage } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetChatState, setPersonaDetails } from "../services/chatsSlice";
import { useState } from "react";
import { useFavouritePersonaMutation } from "../services/apiSlices";
import { setFavourite } from "../services/exploreSlice";

interface DiscoverCardProp {
  data: any;
}

const DiscoverCard = ({ data }: DiscoverCardProp) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fav, setFav] = useState(data.is_preferable_entity);
  const [favouritePersona] = useFavouritePersonaMutation();

  const handleChat = () => {
    dispatch(resetChatState());
    dispatch(
      setPersonaDetails({
        personaId: data.id,
        personaName: data.name,
        personaIconUrl: data.image,
        type: data.type || "",
        description: data.description,
      })
    );
    navigate("/chat");
  };

  const handleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    try {
      const response = await favouritePersona(
        data.type === "Persona" ? { persona_id: data.id } : { tool_id: data.id }
      ).unwrap();
      if (!response.error) {
        setFav(!fav);
        dispatch(setFavourite(data.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const icon = fav ? (
    <>
      <FaStar className="text-yellow-500" size={30} />
    </>
  ) : (
    <>
      <CiStar className="text-text" size={30} />
    </>
  );

  return (
    <div
      className="flex w-full px-2 py-4 bg-background gap-2 rounded-lg"
      onClick={handleChat}
    >
      <div className="flex flex-col gap-2 mr-1">
        <div className="rounded-full w-[50px] h-[50px] object-cover">
          <img
            className="relative rounded-full w-[50px] h-[50px] object-cover"
            src={data?.image}
            alt=""
          />
        </div>

        <div className="flex justify-center gap-1 items-center text-text">
          <MdOutlineMessage size={20} />
          <p className="font-light text-xs text-start">{data.total_messages}</p>
        </div>
      </div>

      <div className="text-text w-11/12">
        <p className="text-sm font-bold">{data.name}</p>
        <p className="font-normal text-[10px] line-clamp-4">
          {data.description}
        </p>
      </div>
      <div className="flex items-center" onClick={handleFavorite}>
        {icon}
      </div>
    </div>
  );
};

export default DiscoverCard;
