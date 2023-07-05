import Link from "next/link";

export default function Navigation({  }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-4 px-lg-5">
            <Link href={`/`} className="navbar-brand">ChatGPT 効果的なprompt集</Link>
            <p className="text-white me-auto mb-2 mb-lg-0 ms-lg-4"><small>効果的なpromptを作成するのに役立つ「awesome-chatgpt-prompts」を日本語化して使いやすくしました！</small></p>
        </div>
    </nav>
  );
}