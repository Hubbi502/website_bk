import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const Schedule = () => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const counselors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Academic & Career Counseling",
      availability: ["Monday 10:00 AM", "Wednesday 2:00 PM", "Friday 1:00 PM"]
    },
    {
      id: "2", 
      name: "Mr. David Chen",
      specialty: "Mental Health & Personal Development",
      availability: ["Tuesday 9:00 AM", "Thursday 11:00 AM", "Friday 3:00 PM"]
    },
    {
      id: "3",
      name: "Ms. Maria Garcia",
      specialty: "Social & Emotional Support",
      availability: ["Monday 1:00 PM", "Wednesday 10:00 AM", "Thursday 2:00 PM"]
    }
  ];

  const upcomingAppointments = [
    {
      id: "1",
      counselor: "Dr. Sarah Johnson",
      date: "Jan 20, 2025",
      time: "10:00 AM",
      status: "confirmed",
      topic: "Career Planning"
    },
    {
      id: "2",
      counselor: "Mr. David Chen", 
      date: "Jan 22, 2025",
      time: "11:00 AM",
      status: "pending",
      topic: "Stress Management"
    }
  ];

  const handleBooking = (counselorName: string, slot: string) => {
    setSelectedSlot(`${counselorName} - ${slot}`);
    toast.success("Appointment request submitted!", {
      description: `Your request for ${slot} with ${counselorName} has been sent for approval.`
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "pending":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      confirmed: "bg-green-100 text-green-800 hover:bg-green-100",
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      cancelled: "bg-red-100 text-red-800 hover:bg-red-100"
    };
    return variants[status] || "";
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Counseling Schedule</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book a session with our experienced counselors or view your upcoming appointments
          </p>
        </div>

        {/* Upcoming Appointments */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Your Upcoming Appointments</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="shadow-card hover:shadow-elevated transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{appointment.topic}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <User className="h-4 w-4" />
                        {appointment.counselor}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusBadge(appointment.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(appointment.status)}
                        {appointment.status}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {appointment.time}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Available Counselors */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Book a New Session</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {counselors.map((counselor, index) => (
              <Card 
                key={counselor.id} 
                className="shadow-card hover:shadow-elevated transition-all animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-center">{counselor.name}</CardTitle>
                  <CardDescription className="text-center">{counselor.specialty}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-medium">Available Slots:</p>
                    {counselor.availability.map((slot) => (
                      <Button
                        key={slot}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start gap-2"
                        onClick={() => handleBooking(counselor.name, slot)}
                      >
                        <Clock className="h-4 w-4" />
                        {slot}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Information Card */}
        <Card className="mt-12 bg-accent/50">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Select a counselor and available time slot that works for you</li>
              <li>Your appointment request will be sent for approval</li>
              <li>You'll receive a notification once the counselor confirms</li>
              <li>Attend your session at the scheduled time</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
