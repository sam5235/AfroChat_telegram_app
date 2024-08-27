import { useCallback, useEffect, useRef, useState } from "react";
import {
  useGetExploreQuery,
  useGetExploreTagsQuery,
} from "../../services/apiSlices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  ExploreCardsShimmer,
  ExploreTagShimmer,
} from "../../components/ExplorePageShimmer";
import {
  setExploreList,
  setOffset,
  resetState,
} from "../../services/exploreSlice";
import DiscoverCard from "../../components/DiscoverCard";
const ExplorePage = () => {
  const dispatch = useDispatch();
  const [tagColor, setTagColor] = useState("background");
  const [selectedTag, setSelectedTag] = useState<any>({
    title: "Recommended",
    description: "Suggestions based on your favorite characters",
  });
  const { limit, offset, exploreList, searchQuery } = useSelector(
    (state: RootState) => state.explore
  );
  const { data: tagsData } = useGetExploreTagsQuery({});

  const { data, isLoading, isFetching } = useGetExploreQuery({
    offset: offset,
    limit: limit,
    searchWord: searchQuery,
    selectedTag: selectedTag.title,
  });

  useEffect(() => {
    if (data) {
      if (offset === 0) {
        dispatch(resetState());
      }
      dispatch(setExploreList(data.data));
    }
  }, [data]);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetching) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data?.data.length > 0) {
          const nextPageOffset = offset + limit;
          dispatch(setOffset(nextPageOffset));
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching, data, offset, limit, dispatch]
  );
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    const userAgentString = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(userAgentString)) {
      setLink("https://apps.apple.com/ph/app/afro-chat/id6499267442?uo=2");
    } else if (/Android/.test(userAgentString)) {
      setLink(
        "https://play.google.com/store/apps/details?id=org.a2sv.afro_chat"
      );
    } else {
      setLink("https://afrochat.app/application/chat/home");
    }
  }, []);

  const handleRedirect = () => {
    window.open(link);
  };

  return (
    <div className="bg-secondaryBg pb-28 h-full overflow-y-auto">
      {tagsData ? (
        <>
          <div className="relative flex overflow-x-auto gap-2 w-full px-2 top-4">
            {tagsData?.categories?.map((tag: any, index: number) => (
              <button
                key={index}
                className={`rounded-full flex align-middle ${
                  selectedTag.title === tag.title
                    ? `bg-${tagColor}`
                    : "bg-background"
                }   text-text text-sm h-6 font-semibold px-3 whitespace-nowrap`}
                onClick={() => {
                  if (tag.title === "Tool") {
                    setTagColor("button");
                    handleRedirect();
                  } else {
                    setSelectedTag(tag);
                    dispatch(resetState());
                    setTagColor("button");
                  }
                }}
              >
                <p>{tag.title}</p>
              </button>
            ))}
          </div>
          <div className="relative mx-2 top-7 rounded-lg bg-background text-hint text-sm font-medium px-3 w-11/12 h-10">
            {selectedTag.title}{" "}
            <p className="text-xs font-normal text-hint">
              {selectedTag.description}
            </p>
          </div>
        </>
      ) : (
        <ExploreTagShimmer />
      )}
      {isLoading || (isFetching && offset === 0) ? (
        <ExploreCardsShimmer />
      ) : (
        <div className="relative top-11 space-y-3 max-h-screen overflow-y-scroll w-full flex flex-col px-2">
          {exploreList.map((persona: any, idx: number) => (
            <div
              key={idx}
              ref={idx === exploreList.length - 1 ? lastBookElementRef : null}
            >
              {persona.id !== "2ee48cad-3495-4496-aa8d-e819b4ec4b1b" &&
                persona.id !== "5886a879-2230-446d-9f65-8299c30a8aca" &&
                persona.id !== "0d834cb1-3069-4811-8c87-d95922ab9f0c" &&
                persona.id !== "a9e8644e-0293-44bd-8310-3edfeec0bd2c" && (
                  <DiscoverCard data={persona} />
                )}
            </div>
          ))}
          {isFetching && (
            <div className="spinner-dot-pulse pb-3 self-center">
              <div className="spinner-pulse-dot"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
