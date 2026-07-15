import PromptBox from "./components/PromptBox";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Navbar />

      <section className="flex flex-col items-center justify-center pt-24 px-6">

        <Hero />

        <PromptBox />

      </section>
    </main>
  );
}