import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import mentalHealthImg from "@/assets/article-mental-health.jpg";
import careerImg from "@/assets/article-career.jpg";
import studyImg from "@/assets/article-study.jpg";

const ArticleDetail = () => {
  const { id } = useParams();

  const articlesData: Record<string, any> = {
    "1": {
      title: "Managing Stress and Anxiety in School",
      category: "Mental Health",
      readTime: "5 min read",
      date: "January 15, 2025",
      imageUrl: mentalHealthImg,
      content: `
        <p>Stress and anxiety are common experiences for students, but learning to manage them effectively can significantly improve your academic performance and overall well-being.</p>
        
        <h2>Understanding Stress and Anxiety</h2>
        <p>Stress is your body's natural response to challenges and demands. While some stress can be motivating, chronic stress can negatively impact your health and academic performance.</p>
        
        <h2>Effective Stress Management Techniques</h2>
        <h3>1. Practice Mindfulness and Meditation</h3>
        <p>Taking just 10 minutes daily to practice mindfulness can help calm your mind and reduce anxiety. Try deep breathing exercises or guided meditation apps.</p>
        
        <h3>2. Maintain a Healthy Routine</h3>
        <p>Regular sleep, balanced meals, and physical exercise are fundamental to managing stress. Create a consistent daily schedule that includes time for self-care.</p>
        
        <h3>3. Break Tasks Into Smaller Steps</h3>
        <p>Large assignments can feel overwhelming. Break them down into manageable chunks and tackle them one at a time.</p>
        
        <h3>4. Connect With Others</h3>
        <p>Don't hesitate to reach out to friends, family, or counselors when you're feeling overwhelmed. Talking about your concerns can provide relief and new perspectives.</p>
        
        <h2>When to Seek Professional Help</h2>
        <p>If stress and anxiety are interfering with your daily life, sleep, or relationships, it's important to speak with a school counselor or mental health professional. Remember, seeking help is a sign of strength, not weakness.</p>
      `
    },
    "2": {
      title: "Exploring Career Paths: Finding Your Passion",
      category: "Career Guidance",
      readTime: "8 min read",
      date: "January 12, 2025",
      imageUrl: careerImg,
      content: `
        <p>Choosing a career path is one of the most important decisions you'll make. This guide will help you explore your interests and align them with potential career opportunities.</p>
        
        <h2>Self-Discovery: Understanding Your Interests</h2>
        <p>Start by reflecting on what activities make you lose track of time. What subjects do you enjoy most? What are your natural strengths?</p>
        
        <h2>Research and Exploration</h2>
        <h3>Career Assessments</h3>
        <p>Consider taking career aptitude tests that can help identify fields that match your personality and interests.</p>
        
        <h3>Informational Interviews</h3>
        <p>Reach out to professionals in fields that interest you. Ask about their daily responsibilities, challenges, and what they enjoy about their work.</p>
        
        <h3>Job Shadowing and Internships</h3>
        <p>Gain firsthand experience by shadowing professionals or participating in internships. This practical exposure is invaluable.</p>
        
        <h2>Setting Goals</h2>
        <p>Once you've identified potential paths, create a roadmap with short-term and long-term goals. Include education requirements, skills to develop, and milestones to achieve.</p>
        
        <h2>Staying Flexible</h2>
        <p>Remember that career paths aren't always linear. Be open to opportunities that may lead you in unexpected but fulfilling directions.</p>
      `
    },
    "3": {
      title: "Effective Study Techniques for Success",
      category: "Academic",
      readTime: "6 min read",
      date: "January 10, 2025",
      imageUrl: studyImg,
      content: `
        <p>Developing effective study habits is crucial for academic success. Here are proven techniques that can enhance your learning and retention.</p>
        
        <h2>The Pomodoro Technique</h2>
        <p>Study in focused 25-minute intervals, followed by 5-minute breaks. After four "pomodoros," take a longer 15-30 minute break. This method maintains concentration while preventing burnout.</p>
        
        <h2>Active Recall</h2>
        <p>Instead of passively reading notes, actively test yourself on the material. This strengthens memory and identifies gaps in understanding.</p>
        
        <h2>Spaced Repetition</h2>
        <p>Review material at increasing intervals over time. This technique leverages how our memory works to achieve long-term retention.</p>
        
        <h2>Create a Dedicated Study Space</h2>
        <p>Designate a specific area for studying that is quiet, well-lit, and free from distractions. This helps your brain associate that space with focus and productivity.</p>
        
        <h2>Use Multiple Learning Methods</h2>
        <p>Combine reading, writing, visual aids, and verbal explanation. Different methods engage different parts of your brain, enhancing overall understanding.</p>
        
        <h2>Form Study Groups</h2>
        <p>Collaborative learning can provide new perspectives and help clarify difficult concepts. Teaching others is also one of the best ways to reinforce your own understanding.</p>
      `
    }
  };

  const article = articlesData[id || "1"] || articlesData["1"];

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
          <Badge className="mb-4">{article.category}</Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>
          
          <div className="flex items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
          </div>

          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-[400px] object-cover rounded-xl shadow-elevated mb-8"
          />

          <div 
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

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
