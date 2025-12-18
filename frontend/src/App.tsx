import React from "react";
import { Button } from "./components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const App = () => {
  return (
    <div>
      <header>
        <SignedOut>
          <SignInButton>
            <Button variant={"outline"}>Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </div>
  );
};

export default App;
