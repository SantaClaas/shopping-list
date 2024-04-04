import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const KEY = "isOnboarded";
export function useIsOnboarded() {
  const query = useQuery({
    queryKey: ["asyncStorage", KEY],
    async queryFn() {
      // We just use the key existing as indicator for the app being used the first time
      const value = await AsyncStorage.getItem(KEY);
      console.debug(
        "isOnboarded",
        value,
        value !== null,
        typeof value,
        JSON.stringify({ value }),
      );
      // Empty string is normally not truthy but empty string is true for us
      return value !== null;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    async mutationFn(isOnboarded: boolean) {
      console.debug(isOnboarded, query.data);
      if (query.data === isOnboarded) return;

      if (isOnboarded) {
        await AsyncStorage.setItem(KEY, "true");
        console.debug("Set onboarding");
        return;
      }

      await AsyncStorage.removeItem(KEY);
    },
    async onMutate(isOnboarded: boolean) {
      // Optimistic update
      if (query.data === isOnboarded) return;

      queryClient.cancelQueries({ queryKey: ["asyncStorage", KEY] });

      const previousValue = queryClient.getQueryData<boolean>([
        "asyncStorage",
        KEY,
      ]);
      queryClient.setQueryData(["asyncStorage", KEY], isOnboarded);

      return { previousValue };
    },
    async onError(err, variables, context) {
      if (context?.previousValue === undefined) return;

      queryClient.setQueryData(["asyncStorage", KEY], context.previousValue);
    },
  });

  return { query, mutation };
}

export function useSetIsOnboarded() {}
