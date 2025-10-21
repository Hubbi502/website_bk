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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "pending":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      approved: "bg-green-100 text-green-800 hover:bg-green-100",
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
      completed: "bg-blue-100 text-blue-800 hover:bg-blue-100"
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Buat Jadwal Kunjungan Baru</h2>
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                  <Send className="h-5 w-5" />
                  Ajukan Kunjungan
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Form Pengajuan Kunjungan ke Guru BK</DialogTitle>
                  <DialogDescription>
                    Isi form di bawah ini untuk mengajukan jadwal kunjungan ke Guru BK
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentName">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="studentName"
                        placeholder="Masukkan nama lengkap"
                        value={visitForm.studentName}
                        onChange={(e) => setVisitForm({ ...visitForm, studentName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="class">
                        Kelas <span className="text-red-500">*</span>
                      </Label>
                      <Select 
                        value={visitForm.class} 
                        onValueChange={(value) => setVisitForm({ ...visitForm, class: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kelas" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map((cls) => (
                            <SelectItem key={cls} value={cls}>
                              {cls}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (opsional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        value={visitForm.email}
                        onChange={(e) => setVisitForm({ ...visitForm, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">No. Telepon (opsional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="08xx xxxx xxxx"
                        value={visitForm.phone}
                        onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="visitDate">
                        Tanggal Kunjungan <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="visitDate"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={visitForm.visitDate}
                        onChange={(e) => setVisitForm({ ...visitForm, visitDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="visitTime">
                        Waktu Kunjungan <span className="text-red-500">*</span>
                      </Label>
                      <Select 
                        value={visitForm.visitTime} 
                        onValueChange={(value) => setVisitForm({ ...visitForm, visitTime: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih waktu" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time} WIB
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">
                      Keperluan/Tujuan Kunjungan <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="reason"
                      placeholder="Jelaskan keperluan atau tujuan kunjungan Anda..."
                      value={visitForm.reason}
                      onChange={(e) => setVisitForm({ ...visitForm, reason: e.target.value })}
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      Informasi ini akan membantu Guru BK untuk mempersiapkan sesi konseling
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsBookingOpen(false);
                      setVisitForm({
                        studentName: "",
                        class: "",
                        email: "",
                        phone: "",
                        visitDate: "",
                        visitTime: "",
                        reason: "",
                      });
                    }}
                  >
                    Batal
                  </Button>
                  <Button onClick={handleSubmitVisit}>
                    <Send className="h-4 w-4 mr-2" />
                    Kirim Pengajuan
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Info Cards */}
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
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-center">Tersedia:</p>
                    <div className="space-y-1">
                      {counselor.availability.map((slot) => (
                        <div
                          key={slot}
                          className="text-sm text-center p-2 rounded bg-accent/50 flex items-center justify-center gap-2"
                        >
                          <Clock className="h-4 w-4" />
                          {slot}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Information Card */}
        <Card className="mt-12 bg-accent/50">
          <CardHeader>
            <CardTitle>Panduan Pengajuan Kunjungan</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Klik tombol "Ajukan Kunjungan" dan isi form dengan lengkap</li>
              <li>Pilih tanggal dan waktu yang sesuai dengan jadwal Anda</li>
              <li>Jelaskan keperluan kunjungan dengan jelas</li>
              <li>Tunggu konfirmasi persetujuan dari Guru BK</li>
              <li>Cek status kunjungan Anda di bagian "Jadwal Kunjungan Anda"</li>
              <li>Datang tepat waktu sesuai jadwal yang telah disetujui</li>
            </ol>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                💡 Tips Penting:
              </p>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Ajukan kunjungan minimal H-1 sebelum tanggal yang diinginkan</li>
                <li>• Pastikan nomor telepon/email aktif untuk menerima konfirmasi</li>
                <li>• Jika berhalangan hadir, segera hubungi Guru BK</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
