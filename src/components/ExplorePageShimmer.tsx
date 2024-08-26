export const ExploreCardsShimmer = () => {
  return (
    <div className="bg-secondaryBg pb-28 h-full overflow-y-auto">
      <div className="relative top-11 space-y-3 max-h-screen overflow-y-scroll w-full flex flex-col items-center">
        <div className="h-28 w-[90%] shimmer rounded-lg"></div>
        <div className="h-28 w-[90%] shimmer rounded-lg"></div>
        <div className="h-28 w-[90%] shimmer rounded-lg"></div>
        <div className="h-28 w-[90%] shimmer rounded-lg"></div>
      </div>
    </div>
  );
};

export const ExploreTagShimmer = () => {
  return (
    <>
      <div className="relative flex overflow-x-auto gap-2 w-full px-2 top-4">
        <button className="rounded-full flex align-middle  bg-background text-text text-sm h-6 font-semibold px-3 whitespace-nowrap shimmer w-20"></button>
        <button className="rounded-full flex align-middle  bg-background text-text text-sm h-6 font-semibold px-3 whitespace-nowrap shimmer w-20"></button>
        <button className="rounded-full flex align-middle  bg-background text-text text-sm h-6 font-semibold px-3 whitespace-nowrap shimmer w-20"></button>
        <button className="rounded-full flex align-middle  bg-background text-text text-sm h-6 font-semibold px-3 whitespace-nowrap shimmer w-20"></button>
      </div>
      <div className="relative ml-6 top-7 rounded-lg bg-background text-hint text-sm font-medium px-3 w-4/5 h-10 shimmer"></div>
    </>
  );
};
