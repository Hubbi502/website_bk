import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, Heart, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Informative Articles",
      description: "Access a wide range of articles on personal growth, mental health, and career guidance."
    },
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description: "Book counseling sessions with your preferred counselor at your convenience."
    },
    {
      icon: Heart,
      title: "Mental Health Support",
      description: "Get professional guidance and support for your mental and emotional wellbeing."
    },
    {
      icon: Users,
      title: "Expert Counselors",
      description: "Connect with experienced counselors dedicated to helping you succeed."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Welcome to <span className="block">Sahabat BK</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
                Your trusted companion in guidance and counseling. We're here to support your personal growth, 
                mental health, and career development journey through accessible and effective counseling services.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/articles">
                  <Button size="lg" variant="secondary" className="gap-2">
                    <BookOpen className="h-5 w-5" />
                    Explore Articles
                  </Button>
                </Link>
                <Link to="/schedule">
                  <Button size="lg" variant="outline" className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/30">
                    <Calendar className="h-5 w-5" />
                    Schedule Session
                  </Button>
                </Link>
              </div>
            </div>
            <div className="animate-slide-up hidden md:block">
              <img 
                src={heroBanner} 
                alt="Guidance and Counseling" 
                className="rounded-2xl shadow-elevated"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              Sahabat BK is dedicated to providing comprehensive guidance and counseling services 
              that empower students to overcome challenges, discover their potential, and achieve 
              their goals in a supportive and understanding environment.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="text-center transition-all duration-300 hover:shadow-elevated animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 gradient-subtle">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you need guidance on personal matters, academic challenges, or career planning, 
            we're here to help you every step of the way.
          </p>
          <Link to="/about">
            <Button size="lg" className="gap-2">
              Learn More About Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
