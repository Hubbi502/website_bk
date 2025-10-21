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

  const upcomingAppointments = myVisits.filter(v => 
    v.status === "approved" || v.status === "pending"
  ).slice(0, 5);

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Jadwal Kunjungan BK</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ajukan jadwal kunjungan ke Guru BK untuk konsultasi akademik, karir, atau pribadi
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

        {/* Form Kunjungan Baru */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Buat Jadwal Kunjungan</h2>
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                  <Send className="h-4 w-4" />
                  Ajukan Kunjungan Baru
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Form Pengajuan Kunjungan ke Guru BK</DialogTitle>
                  <DialogDescription>
                    Lengkapi formulir di bawah untuk mengajukan jadwal kunjungan ke Guru BK
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  {/* Informasi Pribadi */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm text-slate-700 border-b pb-2">
                      Informasi Pribadi
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="studentName">
                          Nama Lengkap <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="studentName"
                          placeholder="Contoh: Ahmad Fauzi"
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
                          <SelectTrigger id="class">
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
                          placeholder="email@contoh.com"
                          value={visitForm.email}
                          onChange={(e) => setVisitForm({ ...visitForm, email: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">No. Telepon (opsional)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="081234567890"
                          value={visitForm.phone}
                          onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Jadwal Kunjungan */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm text-slate-700 border-b pb-2">
                      Jadwal Kunjungan
                    </h3>
                    
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
                          <SelectTrigger id="visitTime">
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
                  </div>

                  {/* Keperluan */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm text-slate-700 border-b pb-2">
                      Keperluan Kunjungan
                    </h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reason">
                        Tujuan/Keperluan Kunjungan <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="reason"
                        placeholder="Jelaskan keperluan atau tujuan kunjungan Anda ke Guru BK. Contoh: Konsultasi masalah akademik, bimbingan karir, konseling pribadi, dll."
                        value={visitForm.reason}
                        onChange={(e) => setVisitForm({ ...visitForm, reason: e.target.value })}
                        rows={5}
                      />
                      <p className="text-xs text-slate-500">
                        Jelaskan dengan jelas agar Guru BK dapat mempersiapkan sesi konsultasi dengan baik.
                      </p>
                    </div>
                  </div>

                  {/* Info Box */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="pt-4">
                      <div className="flex gap-3">
                        <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="space-y-1 text-sm text-blue-900">
                          <p className="font-medium">Catatan Penting:</p>
                          <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>Pengajuan akan ditinjau oleh Guru BK</li>
                            <li>Anda akan mendapat notifikasi status pengajuan</li>
                            <li>Harap datang tepat waktu sesuai jadwal yang disetujui</li>
                            <li>Hubungi BK jika ada perubahan jadwal</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
                  <Button onClick={handleSubmitVisit} className="gap-2">
                    <Send className="h-4 w-4" />
                    Kirim Pengajuan
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-card hover:shadow-elevated transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Pilih Jadwal</CardTitle>
                <CardDescription>
                  Tentukan tanggal dan waktu yang sesuai untuk kunjungan Anda
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Tunggu Konfirmasi</CardTitle>
                <CardDescription>
                  Guru BK akan meninjau dan mengkonfirmasi pengajuan Anda
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-card hover:shadow-elevated transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Konsultasi</CardTitle>
                <CardDescription>
                  Hadiri sesi konsultasi sesuai jadwal yang telah disetujui
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Information Card */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              Panduan Kunjungan ke BK
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-slate-900">Langkah-langkah:</h4>
                <ol className="list-decimal list-inside space-y-2 text-slate-700">
                  <li>Klik tombol "Ajukan Kunjungan Baru"</li>
                  <li>Lengkapi formulir dengan data yang akurat</li>
                  <li>Pilih tanggal dan waktu yang sesuai</li>
                  <li>Jelaskan keperluan kunjungan Anda</li>
                  <li>Tunggu konfirmasi dari Guru BK</li>
                  <li>Hadiri sesi sesuai jadwal yang disetujui</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-slate-900">Waktu Layanan BK:</h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span><strong>Senin - Jumat:</strong> 08:00 - 16:00 WIB</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span><strong>Sabtu:</strong> 08:00 - 12:00 WIB</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                  <p className="text-sm text-slate-600">
                    <strong>Catatan:</strong> Untuk keperluan mendesak, silakan hubungi ruang BK secara langsung atau melalui telepon sekolah.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
