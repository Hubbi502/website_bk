<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState } from "react";
>>>>>>> 27426c0ea16f5b1e5737c5e8b79a0fd5bcd19b96
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import ArticleCard from "@/components/ArticleCard";
<<<<<<< HEAD
import { getArticles, type Article } from "@/lib/articleStorage";
=======
import mentalHealthImg from "@/assets/article-mental-health.jpg";
import careerImg from "@/assets/article-career.jpg";
import studyImg from "@/assets/article-study.jpg";
>>>>>>> 27426c0ea16f5b1e5737c5e8b79a0fd5bcd19b96

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
<<<<<<< HEAD
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Load articles from storage
    const loadedArticles = getArticles();
    setArticles(loadedArticles);
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
=======

  const articles = [
    {
      id: "1",
      title: "Managing Stress and Anxiety in School",
      description: "Learn practical techniques to manage stress and anxiety during your academic journey.",
      category: "Mental Health",
      readTime: "5 min read",
      imageUrl: mentalHealthImg,
      date: "2025-01-15"
    },
    {
      id: "2",
      title: "Exploring Career Paths: Finding Your Passion",
      description: "Discover how to identify your interests and align them with potential career opportunities.",
      category: "Career Guidance",
      readTime: "8 min read",
      imageUrl: careerImg,
      date: "2025-01-12"
    },
    {
      id: "3",
      title: "Effective Study Techniques for Success",
      description: "Master proven study methods that can enhance your learning and academic performance.",
      category: "Academic",
      readTime: "6 min read",
      imageUrl: studyImg,
      date: "2025-01-10"
    },
    {
      id: "4",
      title: "Building Healthy Relationships",
      description: "Understanding the importance of healthy relationships and communication skills.",
      category: "Personal Growth",
      readTime: "7 min read",
      imageUrl: mentalHealthImg,
      date: "2025-01-08"
    },
    {
      id: "5",
      title: "Time Management Skills for Students",
      description: "Learn how to balance academics, activities, and personal life effectively.",
      category: "Academic",
      readTime: "5 min read",
      imageUrl: studyImg,
      date: "2025-01-05"
    },
    {
      id: "6",
      title: "Preparing for College and University",
      description: "Essential tips and guidance for transitioning to higher education successfully.",
      category: "Career Guidance",
      readTime: "10 min read",
      imageUrl: careerImg,
      date: "2025-01-03"
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
>>>>>>> 27426c0ea16f5b1e5737c5e8b79a0fd5bcd19b96
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

<<<<<<< HEAD
  const categories = ["all", ...new Set(articles.map(a => a.category).filter(Boolean))];
=======
  const categories = ["all", ...new Set(articles.map(a => a.category))];
>>>>>>> 27426c0ea16f5b1e5737c5e8b79a0fd5bcd19b96

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Articles & Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of informative articles on personal growth, mental health, and career guidance
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="md:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {filteredArticles.map((article, index) => (
            <div key={article.id} style={{ animationDelay: `${index * 50}ms` }}>
<<<<<<< HEAD
              <ArticleCard 
                id={String(article.id)}
                title={article.title}
                description={article.excerpt}
                category={article.category || "General"}
                readTime={article.readTime || "5 min read"}
                imageUrl={article.image}
                date={article.date}
              />
=======
              <ArticleCard {...article} />
>>>>>>> 27426c0ea16f5b1e5737c5e8b79a0fd5bcd19b96
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
