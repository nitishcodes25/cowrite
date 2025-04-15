import Link from "next/link";

export default function Home() {
  return (
    <div>
      Click{" "}
      <Link href="/documents/123">
        <span className="text-blue-500 underline">here</span>
      </Link>{" "}
      to go to document page
    </div>
  );
}
