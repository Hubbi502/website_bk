import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getArticleById } from "@/lib/articleStorage";

const ArticleDetail = () => {
  const { id } = useParams();
  const article = getArticleById(Number(id));

  if (!article) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/articles">
            <Button>Back to Articles</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/articles">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Button>
        </Link>

        <div className="animate-fade-in">
          <Badge className="mb-4">{article.category || "General"}</Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>
          
          <div className="flex items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{article.readTime || "5 min read"}</span>
            </div>
          </div>

          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-[400px] object-cover rounded-xl shadow-elevated mb-8"
          />

          <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground">
            <p className="text-lg leading-relaxed whitespace-pre-line">{article.content}</p>
          </div>

          <div className="mt-12 pt-8 border-t">
            <p className="text-muted-foreground mb-4">Need personalized guidance?</p>
            <Link to="/schedule">
              <Button size="lg">Schedule a Counseling Session</Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
