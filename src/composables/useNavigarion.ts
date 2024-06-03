import { useRouter } from 'vue-router';

export const useNavigation = () => {
  const router = useRouter();
  
  const registration = () => {
    if (localStorage.getItem("access_token")) {
      router.push({ name: "dashboard" });
      return;
    }
    return router.push({ name: "register" });
  };

  return {
    registration,
  }
}