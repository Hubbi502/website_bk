import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Heart, Target, Users } from "lucide-react";
import Navbar from "@/components/Navbar";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach every student with empathy, understanding, and genuine care for their wellbeing."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive to provide the highest quality guidance and support to help students reach their full potential."
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "We believe counseling services should be accessible to all students, anytime they need support."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* About Section */}
        <section className="mb-16 animate-fade-in">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Sahabat BK</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Sahabat BK (Bimbingan dan Konseling) is your trusted digital companion for guidance and counseling services. 
              We are dedicated to supporting students through their academic journey, personal development, and life challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide comprehensive, accessible, and effective guidance and counseling services that empower 
                  students to overcome challenges, discover their potential, and achieve their goals in a supportive 
                  and understanding environment.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be the leading digital platform for school counseling services, creating a community where every 
                  student feels heard, supported, and empowered to thrive academically, emotionally, and socially.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="text-center shadow-card hover:shadow-elevated transition-all animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">What We Offer</h2>
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Academic Counseling:</strong> Guidance on study skills, course selection, and academic planning
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Career Guidance:</strong> Help with career exploration, college planning, and future preparation
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Personal Development:</strong> Support for building self-confidence, social skills, and emotional resilience
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Mental Health Support:</strong> Assistance with stress management, anxiety, and emotional wellbeing
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Resource Library:</strong> Access to articles, guides, and tools for personal and academic growth
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-muted-foreground">support@sahabatbk.edu</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-muted-foreground">+62 (021) 1234-5678</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Office Hours</p>
                          <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 4:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Quick Message</h3>
                    <p className="text-muted-foreground mb-4">
                      Have a question or need immediate assistance? We're here to help!
                    </p>
                    <Button className="w-full" size="lg">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Us a Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
