import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
  // lấy signIn API & trạng thái load từ Clerk
  const { signIn, isLoaded } = useSignIn();

  // nếu clerk chưa load thì không render nút
  if (!isLoaded) {
    return null;
  }

  // xử lý login bằng Google OAuth
  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google", // chọn provider
      redirectUrl: "/sso-callback", // nơi clerk xử lý OAUTH flow
      redirectUrlComplete: "/auth-callback", // redirect khi login xong
    });
  };

  return (
    <Button
      onClick={signInWithGoogle}
      variant="secondary"
      className="w-full text-white border-zinc-200 h-11"
    >
      <img src="/google.png" alt="Google" className="size-5" />
      Continue with Google
    </Button>
  );
};

export default SignInOAuthButtons;
