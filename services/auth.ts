import * as SecureStore from "expo-secure-store";

export async function signIn() {
  await SecureStore.setItemAsync("userToken", "1234");
  return {
    token: "1234",
  };
}

export async function signOut() {
  await SecureStore.deleteItemAsync("userToken");
  return {
    token: null,
  };
}

export async function resetTokenAsync() {
  const token = await SecureStore.getItemAsync("userToken");

  return {
    token,
  };
}
