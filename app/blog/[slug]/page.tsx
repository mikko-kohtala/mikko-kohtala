import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/markdown';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Mikko Kohtala`,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link 
            href="/" 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="mr-2">←</span> Home
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link 
            href="/blog" 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Blog
          </Link>
        </nav>

        <article>
          <header className="mb-8 pb-8 border-b border-border">
            <h1 className="text-3xl font-bold mb-4">
              <span className="text-primary">#</span> {post.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <div>
                <span className="text-accent">[date]</span>
                <span className="ml-2">{formatDate(post.date)}</span>
              </div>
              <div>
                <span className="text-accent">[author]</span>
                <span className="ml-2">{post.author}</span>
              </div>
              <div>
                <span className="text-accent">[reading]</span>
                <span className="ml-2">{post.readingTime}</span>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase().replace(/ /g, '-')}`}
                    className="border border-border px-2 py-1 text-xs hover:border-primary transition-colors"
                  >
                    <span className="text-accent">#</span>{tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          <div 
            className="prose prose-invert prose-pre:bg-card prose-pre:border prose-pre:border-border max-w-none
                       prose-headings:font-mono prose-headings:font-bold
                       prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
                       prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
                       prose-p:leading-relaxed prose-p:mb-4
                       prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                       prose-code:text-accent prose-code:bg-card prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']
                       prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
                       prose-ul:list-none prose-ul:pl-0
                       prose-li:before:content-['→'] prose-li:before:text-muted-foreground prose-li:before:mr-2 prose-li:ml-4
                       prose-strong:text-foreground prose-strong:font-bold"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
          />
        </article>

        <footer className="mt-12 pt-8 border-t border-border">
          <Link 
            href="/blog"
            className="inline-block border border-border px-4 py-2 hover:border-primary transition-colors"
          >
            <span className="text-accent">←</span> Back to all posts
          </Link>
        </footer>
      </div>
    </div>
  );
}