"use client";

import { Twitter, Linkedin, Link } from "lucide-react";

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

export function SocialShare({ title, url, description }: SocialShareProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedDescription = encodeURIComponent(description || "");

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    const shareUrl = shareLinks[platform];
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here if desired
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-accent text-sm">[share]</span>
      <div className="flex gap-2">
        <button
          onClick={() => handleShare("twitter")}
          className="flex items-center gap-1 border border-border px-3 py-1 text-xs transition-colors hover:border-primary hover:text-primary cursor-pointer"
          title="Share on X (Twitter)"
        >
          <Twitter className="h-3 w-3 opacity-60" />
          X/Twitter
        </button>
        <button
          onClick={() => handleShare("linkedin")}
          className="flex items-center gap-1 border border-border px-3 py-1 text-xs transition-colors hover:border-primary hover:text-primary cursor-pointer"
          title="Share on LinkedIn"
        >
          <Linkedin className="h-3 w-3 opacity-60" />
          LinkedIn
        </button>
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1 border border-border px-3 py-1 text-xs transition-colors hover:border-primary hover:text-primary cursor-pointer"
          title="Copy link to clipboard"
        >
          <Link className="h-3 w-3 opacity-60" />
          Copy link
        </button>
      </div>
    </div>
  );
}