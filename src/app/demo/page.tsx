import RuixenPromptBox from "@/components/ui/ruixen-prompt-box";

export default function DemoRuixenPromptBox () {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-4xl bg-[#111] rounded-2xl border border-white/10 p-8 shadow-2xl">
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Prompt Transform</h1>
            <p className="text-gray-400">Refine, summarize, or compress your instructions</p>
        </div>
        <RuixenPromptBox />
      </div>
    </div>
  );
};
