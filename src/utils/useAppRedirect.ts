import { useEffect, useState } from "react";

const useAppRedirect = () => {
  const [link, setLink] = useState<string>();

  useEffect(() => {
    const userAgentString = navigator.userAgent;
    
    if (/iPhone|iPad|iPod/.test(userAgentString)) {
      setLink("https://apps.apple.com/ph/app/afro-chat/id6499267442?uo=2"); // Universal Link
    } else if (/Android/.test(userAgentString)) {
      setLink("https://play.google.com/store/apps/details?id=org.a2sv.afro_chat");
    } else {
      setLink("https://afrochat.app/application/chat/home"); // Fallback web link for desktop
    }
  }, []);

  // useEffect(() => {
  //   const userAgentString = navigator.userAgent;
  //   if (
  //     /iPhone|iPad|iPod/.test(userAgentString) ||
  //     /Android/.test(userAgentString)
  //   ) {
  //     setLink("https://Afrochat.app"); // Universal Link
  //   } else {
  //     setLink("https://afrochat.app/application/chat/home"); // Fallback web link for desktop
  //   }
  // }, []);

  const handleRedirect = () => {
    // const userAgentString = navigator.userAgent;
    window.open(link);
    // if (/iPhone|iPad|iPod/.test(userAgentString)) {
    //   // Open the app or redirect to the App Store if not installed
    //   window.open(link, "_blank"); // Attempt to open the app
    //   setTimeout(() => {
    //     window.open(
    //       "https://apps.apple.com/ph/app/afro-chat/id6499267442?uo=2",
    //       "_blank"
    //     );
    //   }, 1500); // Redirect to App Store
    // } else if (/Android/.test(userAgentString)) {
    //   // Open the app or redirect to the Play Store if not installed
    //   window.open(link, "_blank"); // Attempt to open the app
    //   setTimeout(() => {
    //     window.open(
    //       "https://play.google.com/store/apps/details?id=org.a2sv.afro_chat",
    //       "_blank"
    //     );
    //   }, 1500); // Redirect to Play Store
    // } else {
    //   window.open(link, "_blank"); // Open web fallback on desktop
    // }
  };
  return handleRedirect;
};

export default useAppRedirect;
