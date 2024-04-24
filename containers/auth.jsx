import Auth from "@/components/auth";
import { UButton } from "@/components/utils";
import Navigation from "@/components/navigation";
import { useRouter } from "next/router";

function AuthContainer() {
  const router = useRouter();
  return (
    <div className="pt-[80px]">
      <div className="flex flex-col items-center">
        <Auth>
          <Auth.TitleContainer>
            <Auth.Header className="text-[32px]">
              {
                router.pathname == "/signin" ? "Sign in to access your account" : "Sign up to access your account"
              }
            </Auth.Header>
          </Auth.TitleContainer>
          <div className="flex flex-col gap-y-2 py-8 w-full max-w-[18rem] ">
            {router.pathname == "/signup" && (
              <>
                <Auth.Input
                  type="text"
                  placeholder="First Name"
                  className="p-2"
                />
                <Auth.Input
                  type="text"
                  placeholder="Last Name"
                  className="p-2"
                />
              </>
            )}
            <Auth.Input
              type="email"
              placeholder="Email Address"
              className="p-2"
            />
            <Auth.Input
              type="password"
              placeholder="Password"
              className="p-2"
            />
            {router.pathname == "/signin" ? (
              <UButton
                bg="#3bd4e1"
                width="100%"
                className="rounded-[2px] px-5 text-black/60 font-medium border border-primary"
              >
                LOG IN
              </UButton>
            ) : (
              <UButton
                bg="#3bd4e1"
                width="100%"
                className="rounded-[2px] px-5 text-black/60 font-medium border border-primary"
              >
                CREATE ACCOUNT
              </UButton>
            )}
          </div>

          {router.pathname == "/signin" && (
            <div className="flex justify-center w-full border-t border-t-[#e4e4e4] py-8">
              <p className="text-black/50 cursor-pointer">
                Forgot your password?
              </p>
            </div>
          )}
          {router.pathname == "/signup" && (
            <div className="flex justify-center w-full border-t border-t-[#e4e4e4] py-8 px-4">
              <p className="text-black/50 text-center">
                By continuing, you agree to the Platinum terms and acknowledge receipt of our privacy notice.
              </p>
            </div>
          )}
        </Auth>
        {router.pathname == "/signin" && (
          <div className="flex flex-row items-center gap-x-[2px]">
            <p className="text-primary-text">Don&#39;t have an account?</p>
            <Navigation.Link
              href="/signup"
              className="text-primary-text underline underline-offset-2"
            >
              Create account
            </Navigation.Link>
          </div>
        )}
        {router.pathname == "/signup" && (
          <div className="flex flex-row items-center gap-x-[2px]">
            <p className="text-primary-text">Already have an account?</p>
            <Navigation.Link
              href="/signin"
              className="text-primary-text underline underline-offset-2"
            >
              Login
            </Navigation.Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthContainer;
