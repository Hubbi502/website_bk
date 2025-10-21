import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, CheckCircle2, XCircle, AlertCircle, Send } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { addVisit, getVisits, type Visit } from "@/lib/visitStorage";

const Schedule = () => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [myVisits, setMyVisits] = useState<Visit[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Form state untuk kunjungan baru
  const [visitForm, setVisitForm] = useState({
    studentName: "",
    class: "",
    email: "",
    phone: "",
    visitDate: "",
    visitTime: "",
    reason: "",
  });

  // Load visits saat komponen dimount
  useEffect(() => {
    loadVisits();
  }, []);

  const loadVisits = () => {
    const allVisits = getVisits();
    setMyVisits(allVisits);
  };

  // Available time slots
  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", 
    "13:00", "14:00", "15:00", "16:00"
  ];

  const classes = [
    "X IPA 1", "X IPA 2", "X IPS 1", "X IPS 2",
    "XI IPA 1", "XI IPA 2", "XI IPS 1", "XI IPS 2",
    "XII IPA 1", "XII IPA 2", "XII IPS 1", "XII IPS 2"
  ];

  const handleSubmitVisit = () => {
    // Validasi form
    if (!visitForm.studentName || !visitForm.class || !visitForm.visitDate || 
        !visitForm.visitTime || !visitForm.reason) {
      toast.error("Gagal!", {
        description: "Mohon lengkapi semua field yang wajib diisi",
      });
      return;
    }

    // Tambah visit baru
    const newVisit = addVisit({
      studentName: visitForm.studentName,
      class: visitForm.class,
      email: visitForm.email,
      phone: visitForm.phone,
      visitDate: visitForm.visitDate,
      visitTime: visitForm.visitTime,
      reason: visitForm.reason,
      status: "pending",
      notes: ""
    });

    // Reset form
    setVisitForm({
      studentName: "",
      class: "",
      email: "",
      phone: "",
      visitDate: "",
      visitTime: "",
      reason: "",
    });

    // Reload visits dan tutup dialog
    loadVisits();
    setIsBookingOpen(false);

    toast.success("Berhasil!", {
      description: "Permintaan kunjungan Anda telah dikirim. Tunggu konfirmasi dari Guru BK.",
    });
  };

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

  const upcomingAppointments = myVisits.filter(v => 
    v.status === "approved" || v.status === "pending"
  ).slice(0, 5);

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
          <h2 className="text-2xl font-semibold mb-6">Jadwal Kunjungan Anda</h2>
          {upcomingAppointments.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Belum ada jadwal kunjungan</p>
                <p className="text-sm text-muted-foreground mt-2">Buat jadwal kunjungan baru dengan mengklik tombol di bawah</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="shadow-card hover:shadow-elevated transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{appointment.studentName}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2">
                          <User className="h-4 w-4" />
                          {appointment.class}
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
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Keperluan:</p>
                      <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(appointment.visitDate).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {appointment.visitTime}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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
