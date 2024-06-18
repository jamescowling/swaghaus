import { SVGProps } from "react";

export function Footer() {
  const navigation = [
    {
      name: "GitHub",
      href: "https://github.com/JamesCowling/swaghaus",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com/jamesacowling",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "Convex",
      href: "https://convex.dev",
      icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 611.25 615.51" {...props}>
          <g id="b">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="m386.29,485.14c91.01-9.93,176.83-57.6,224.12-137.18-22.36,196.77-241.35,321.17-420.03,244.77-16.49-7.05-30.63-18.66-40.38-33.71-40.17-61.96-53.38-140.83-34.43-212.39,54.23,91.95,164.42,148.34,270.72,138.52"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="m112.26,288.92c-36.91,83.77-38.53,181.93,6.75,262.68-159.23-117.74-157.47-369.59-1.96-486.14,14.35-10.75,31.48-17.19,49.39-18.11,73.74-3.81,148.64,24.19,201.15,76.38-106.75.99-210.67,68.22-255.33,165.19"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="m419.05,149.45c-53.84-73.8-138.16-123.99-230.49-125.52,178.51-79.64,398.03,49.48,421.97,240.31,2.22,17.75-.69,35.76-8.7,51.74-33.37,66.54-95.21,118.17-167.47,137.28,53.05-96.49,46.46-214.39-15.31-303.82"
            />
          </g>
        </svg>
      ),
    },
  ];

  return (
    <footer>
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-stone-500 hover:text-stone-400"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-stone-500">
            MIT Licensed. Do whatevs.
          </p>
        </div>
      </div>
    </footer>
  );
}