'use client';
import { cn } from '@/lib/utils';

interface MarkdownProps {
  html: string;
  className?: string;
}

export function Markdown({ html, className }: MarkdownProps) {
  return (
    <div
      className={cn(
        // Base typography
        'prose max-w-none dark:prose-invert',
        // Headings
        'prose-headings:font-bold prose-headings:font-mono',
        'prose-h2:mt-8 prose-h3:mt-6 prose-h2:mb-4 prose-h3:mb-3',
        'prose-h2:text-xl prose-h3:text-lg',
        // Paragraphs & lists
        'prose-p:mb-6 prose-p:leading-relaxed',
        'prose-p:mb-6 prose-p:leading-relaxed',
        'prose-li:mb-2 prose-ol:mb-6 prose-ul:mb-6',
        'prose-ol:list-decimal prose-ul:list-disc prose-ol:pl-6 prose-ul:pl-6',
        // Code & blockquotes
        'prose-code:rounded prose-code:bg-card prose-pre:bg-card',
        'prose-pre:border prose-pre:border-border',
        'prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground',
        // Links & strong
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        'prose-strong:font-bold prose-strong:text-foreground',
        // Remove backticks added by some renderers
        "prose-code:before:content-[''] prose-code:after:content-['']",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default Markdown;
