import { useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import { IoMdCompass } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function BottomNav({ children }: any) {
  const [isClicked, setIsClicked] = useState<boolean[]>([true, false, false]);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (page: string, index: number) => {
    const newState = [...isClicked];
    newState.fill(false);
    newState[index] = true;
    setIsClicked(newState);
    if (page === "home") {
      navigate("/");
    } else if (page == "explore") {
      navigate("/explore");
    } else {
      navigate("/history");
    }
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/history") {
      setIsClicked([false, false, true]);
    } else if (currentPath === "/explore") {
      setIsClicked([false, true, false]);
    } else setIsClicked([true, false, false]);
  }, []);

  useEffect(() => {
    let initialHeight = window.innerHeight;
    const handleResize = () => {
      const heightDiff = initialHeight - window.innerHeight;
      setIsKeyboardOpen(heightDiff > 100);
      initialHeight = window.innerHeight; // Update initial height every time
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {children}
      {!isKeyboardOpen && (
        <div className="flex w-full text-sm bg-background fixed bottom-0 justify-evenly gap-4 py-1 pt-2 text-text">
          <div
            className="flex flex-col items-center"
            onClick={() => handleNavClick("home", 0)}
          >
            <ImHome
              className={`${isClicked[0] ? "text-button" : "text-text"}`}
              size={18}
            />
            <p>Home</p>
          </div>

          <div
            className="flex flex-col items-center"
            onClick={() => handleNavClick("explore", 1)}
          >
            <IoMdCompass
              className={`${isClicked[1] ? "text-button" : "text-text"}`}
              size={20}
            />
            <p>Explore</p>
          </div>
          <div
            className="flex flex-col items-center"
            onClick={() => handleNavClick("history", 2)}
          >
            <FaHistory
              className={`${isClicked[2] ? "text-button" : "text-text"}`}
              size={18}
            />
            <p>History</p>
          </div>
        </div>
      )}
    </div>
  );
}
