import { Authenticated, Unauthenticated } from "convex/react";
import { Logout } from "./Logout";
import Login from "./Login";
import { ResetButton } from "./ResetButton";

export function Header() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-4xl font-bold">🏠 Swaghaus</h1>
        <div className="flex gap-2 mt-6 sm:mt-0">
          <a href="https://github.com/JamesCowling/swaghaus">
            <button className="btn gap-2 flex flex-row">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <div>Source code</div>
            </button>
          </a>
          <Authenticated>
            <ResetButton />
            <Logout />
          </Authenticated>
          <Unauthenticated>
            <Login />
          </Unauthenticated>
        </div>
      </div>

      <div className="flex flex-col gap-2 max-w-prose text-sm">
        <p>
          Swaghaus is a tiny demo app used to demonstrate{" "}
          <a href="https://convex.dev">Convex</a>. Sign in to access cart.
        </p>
        <p>
          Each React component is fully dynamic and consistent with no manual
          synchronization logic. All queries in Convex are transactional,
          cached, and real-time.
        </p>
        <p>
          Take a look at how simple the{" "}
          <a href="https://github.com/JamesCowling/swaghaus/blob/26e9a14fc1adb4afd46c792686d5bfeab4866d67/convex/items.ts#L9">
            <span className="font-mono">items.list()</span> query
          </a>{" "}
          and{" "}
          <a href="https://github.com/JamesCowling/swaghaus/blob/26e9a14fc1adb4afd46c792686d5bfeab4866d67/src/Items.tsx#L5">
            <span className="font-mono">Items</span> component
          </a>{" "}
          are when built on Convex, or check out{" "}
          <a href="https://www.youtube.com/watch?v=AdrO6IvHjRQ">
            this 2-minute video
          </a>
          .
        </p>
      </div>
    </div>
  );
}
