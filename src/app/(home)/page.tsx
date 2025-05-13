import Link from "next/link";
import { Navbar } from "./navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div  className="fixed top-0 left-0 right-0 z-10 h-16 p-4 bg-white">
        <Navbar />
      </div>
      <div className="mt-16">
        Click{" "}
        <Link href="/documents/123">
          <span className="text-blue-500 underline">here</span>
        </Link>{" "}
        to go to document page
      </div>
    </div>
  );
}
