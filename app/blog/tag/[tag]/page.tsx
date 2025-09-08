import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostsByTag, getAllTags, formatDate } from '@/lib/markdown';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag.toLowerCase().replace(/ /g, '-'),
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const decodedTag = decodeURIComponent(resolvedParams.tag).replace(/-/g, ' ');
  
  // Find the original tag with proper casing
  const allTags = getAllTags();
  const originalTag = allTags.find(t => t.toLowerCase() === decodedTag.toLowerCase());
  
  if (!originalTag) {
    return {
      title: 'Tag Not Found',
    };
  }

  return {
    title: `Posts tagged "${originalTag}" | Mikko Kohtala`,
    description: `All blog posts tagged with ${originalTag}`,
    openGraph: {
      title: `Posts tagged "${originalTag}"`,
      description: `All blog posts tagged with ${originalTag}`,
      type: 'website',
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params;
  const decodedTag = decodeURIComponent(resolvedParams.tag).replace(/-/g, ' ');
  
  // Find the original tag with proper casing
  const allTags = getAllTags();
  const originalTag = allTags.find(t => t.toLowerCase() === decodedTag.toLowerCase());
  
  if (!originalTag) {
    notFound();
  }
  
  const posts = getPostsByTag(originalTag);

  if (posts.length === 0) {
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
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground">
            <span className="text-accent">#</span>{originalTag}
          </span>
        </nav>

        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-4">
            <span className="text-primary">#</span> {originalTag}
          </h1>
          <p className="text-muted-foreground">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with "{originalTag}"
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-lg font-bold mb-6">
            <span className="text-accent">[posts]</span>
          </h2>

          <div className="space-y-6">
            {posts.map((post) => (
              <article 
                key={post.slug}
                className="border border-border p-6 hover:border-primary transition-colors group"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <div className="text-sm text-muted-foreground shrink-0">
                      <span className="text-accent">[</span>
                      {formatDate(post.date)}
                      <span className="text-accent">]</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="text-muted-foreground">
                      <span className="text-accent">⏱</span> {post.readingTime}
                    </div>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span 
                            key={tag}
                            className={`text-xs ${tag === originalTag ? 'text-primary font-bold' : 'text-muted-foreground'}`}
                          >
                            <span className="text-accent">#</span>{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-bold mb-4">
            <span className="text-accent">[other tags]</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {allTags.filter(tag => tag !== originalTag).map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag.toLowerCase().replace(/ /g, '-')}`}
                className="border border-border px-3 py-1 text-sm hover:border-primary transition-colors"
              >
                <span className="text-accent">#</span>{tag}
              </Link>
            ))}
          </div>
        </section>

        <footer className="pt-8 border-t border-border">
          <div className="flex gap-4">
            <Link 
              href="/blog"
              className="inline-block border border-border px-4 py-2 hover:border-primary transition-colors"
            >
              <span className="text-accent">←</span> All posts
            </Link>
            <Link 
              href="/"
              className="inline-block border border-border px-4 py-2 hover:border-primary transition-colors"
            >
              <span className="text-accent">←</span> Home
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}