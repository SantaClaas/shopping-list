import { Redirect } from "expo-router";
import { useIsOnboarded } from "../onboarding";
import ListIndex from "./lists";

export default function () {
  const {
    query: { data: isOnboarded, isLoading },
  } = useIsOnboarded();
  //TODO loading UI
  if (isLoading) return <></>;

  if (!isOnboarded) return <Redirect href="/welcome" />;

  //TODO on error, show error and proceed to list overview
  return <ListIndex />;
}
