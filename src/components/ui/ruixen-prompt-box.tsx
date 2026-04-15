"use client";

import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import { BadgeCheck, SendHorizontal, Share2, Download, Copy, Check } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

const TRANSFORM_OPTIONS = [
  {
    label: "Secure Message",
    icon: BadgeCheck,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    label: "Normal Message",
    icon: SendHorizontal,
    color: "text-indigo-500",
    bg: "bg-indigo-100",
  },
];

export default function RuixenPromptBox() {
  const [input, setInput] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLCanvasElement>(null);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });

  const maxLength = 1300;

  const currentOption = TRANSFORM_OPTIONS.find((o) => o.label === selectedOption);

  const handleSend = () => {
    if (!input.trim()) return;
    setSubmittedData(input);
    setInput("");
    setSelectedOption(null);
    adjustHeight(true);
  };

  const handleDownload = () => {
    const canvas = qrRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "secure-message-qr.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyImage = () => {
    const canvas = qrRef.current;
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob })
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      });
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleShare = async () => {
    const canvas = qrRef.current;
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], "qrcode.png", { type: "image/png" });
      const shareData = {
        title: "Secure Message QR Code",
        text: "Scan this QR code to view my secure message!",
        files: [file],
      };
      if (navigator.canShare && navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.error("Share failed:", err);
        }
      } else {
        // Fallback to download if sharing is not supported
        handleDownload();
      }
    });
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-3">
          <div className="relative rounded-xl bg-muted/10 dark:bg-white/5 border border-border p-4 shadow-sm">
            {currentOption && (
              <div
                className={cn(
                  "absolute -top-3 left-4 px-2 py-0.5 text-xs font-medium rounded-md",
                  currentOption.bg,
                  currentOption.color,
                  "shadow-sm"
                )}
              >
                <currentOption.icon className="inline-block w-3.5 h-3.5 mr-1" />
                {currentOption.label}
              </div>
            )}

            <Textarea
              ref={textareaRef}
              placeholder="Let Your Heart Speak..."
              value={input}
              maxLength={maxLength}
              onChange={(e) => {
                setInput(e.target.value);
                adjustHeight();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className={cn(
                "w-full resize-none bg-white border-none text-foreground text-sm sm:text-base",
                "focus:outline-none focus-visible:ring-0 placeholder:text-muted-foreground",
                "min-h-[60px] max-h-[200px]"
              )}
            />

            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground pl-1">
                {input.length} / {maxLength}
              </span>
              <button
                onClick={handleSend}
                className={cn(
                  "p-2 rounded-full transition-all duration-200",
                  input || selectedOption
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
                disabled={!input}
                type="button"
              >
                <SendHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Transform Options */}
          <div className="flex flex-wrap gap-2 justify-start">
            {TRANSFORM_OPTIONS.map(({ label, icon: Icon, color }) => {
              const isSelected = label === selectedOption;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setSelectedOption(isSelected ? null : label)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 text-xs rounded-full border transition-all",
                    isSelected
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-transparent border-border text-muted-foreground hover:bg-muted/10"
                  )}
                >
                  <Icon className={cn("w-4 h-4", color)} />
                  <span className="whitespace-nowrap">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* QR Code section */}
        {submittedData && (
          <div className="mt-8 overflow-hidden rounded-2xl bg-[#111] border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="shrink-0 p-4 bg-white rounded-xl shadow-inner">
                <QRCodeCanvas
                  id="qr-canvas"
                  ref={qrRef}
                  value={submittedData}
                  size={200}
                  level="H"
                  includeMargin={true}
                  className="rounded-md"
                />
              </div>
              
              <div className="flex-1 space-y-6 text-center md:text-left">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Your QR Code is Ready!
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Scan the code to read the secure message. You can share this image with anyone via WhatsApp, Instagram, or any other app.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium text-sm shadow-lg shadow-indigo-500/20"
                  >
                    <Share2 className="w-4 h-4" />
                    Share QR
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Save Image
                  </button>
                  <button
                    onClick={handleCopyImage}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium text-sm"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy Image"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
