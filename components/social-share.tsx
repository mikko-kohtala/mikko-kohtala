"use client";

import { Check, Link, Linkedin } from "lucide-react";
import { useState } from "react";

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

export function SocialShare({ title, url, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const buttonClass =
    "flex items-center gap-1 border border-border px-3 py-1 text-xs transition-colors hover:border-primary hover:text-primary cursor-pointer";
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedDescription = encodeURIComponent(description || "");

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    const shareUrl = shareLinks[platform];
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-accent text-sm">[share]</span>
      <div className="flex gap-2">
        <button
          aria-label={`Share "${title}" on X (Twitter)`}
          className={buttonClass}
          onClick={() => handleShare("twitter")}
          title="Share on X (Twitter)"
        >
          <svg
            aria-hidden="true"
            className="h-3 w-3 opacity-60"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          / Twitter
        </button>
        <button
          aria-label={`Share "${title}" on LinkedIn`}
          className={buttonClass}
          onClick={() => handleShare("linkedin")}
          title="Share on LinkedIn"
        >
          <Linkedin className="h-3 w-3 opacity-60" />
          LinkedIn
        </button>
        <button
          aria-label={
            copied
              ? "Link copied to clipboard"
              : `Copy link for "${title}" to clipboard`
          }
          className={buttonClass}
          onClick={handleCopyLink}
          title={copied ? "Link copied!" : "Copy link to clipboard"}
        >
          {copied ? (
            <Check className="h-3 w-3 opacity-60" />
          ) : (
            <Link className="h-3 w-3 opacity-60" />
          )}
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
