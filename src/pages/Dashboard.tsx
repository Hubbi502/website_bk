import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Pencil, 
  Trash2, 
  Plus, 
  Calendar, 
  User, 
  Clock, 
  CheckCircle, 
  XCircle,
  LayoutDashboard,
  FileText,
  Users,
  LogOut,
  Menu,
  X,
  Home,
  TrendingUp,
  FileEdit,
  BookOpen
} from "lucide-react";
import { 
  getArticles, 
  addArticle, 
  updateArticle, 
  deleteArticle,
  type Article 
} from "@/lib/articleStorage";
import { 
  getVisits, 
  updateVisitStatus as updateVisitStatusInStorage,
  type Visit 
} from "@/lib/visitStorage";

// Interface untuk data kunjungan murid (sudah tidak perlu karena ada di visitStorage)
// interface StudentVisit sudah diganti dengan type Visit dari visitStorage

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [adminData, setAdminData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "articles" | "visits">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // State untuk artikel
  const [articles, setArticles] = useState<Article[]>([]);

  // State untuk kunjungan murid
  const [visits, setVisits] = useState<Visit[]>([]);
  const [filteredVisits, setFilteredVisits] = useState<Visit[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // State untuk dialog detail kunjungan
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [visitNotes, setVisitNotes] = useState("");

  // State untuk form artikel
  const [isAddArticleOpen, setIsAddArticleOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [articleForm, setArticleForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    category: "Mental Health",
    readTime: "5 min read"
  });

  useEffect(() => {
    // Check if user is logged in
    const storedAdmin = localStorage.getItem("adminData");
    if (!storedAdmin) {
      toast({
        title: "Akses Ditolak",
        description: "Silakan login terlebih dahulu",
        variant: "destructive",
      });
      navigate("/login");
    } else {
      setAdminData(JSON.parse(storedAdmin));
      // Load articles and visits from storage
      loadArticles();
      loadVisits();
    }
  }, [navigate, toast]);

  const loadArticles = () => {
    const loadedArticles = getArticles();
    setArticles(loadedArticles);
  };

  const loadVisits = () => {
    const loadedVisits = getVisits();
    setVisits(loadedVisits);
    setFilteredVisits(loadedVisits);
  };

  // Effect untuk filter dan search
  useEffect(() => {
    let result = [...visits];

    // Filter berdasarkan status
    if (filterStatus !== "all") {
      result = result.filter(v => v.status === filterStatus);
    }

    // Search berdasarkan nama atau kelas
    if (searchQuery) {
      result = result.filter(v => 
        v.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.class.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort berdasarkan tanggal terbaru
    result.sort((a, b) => {
      const dateA = new Date(a.visitDate + ' ' + a.visitTime);
      const dateB = new Date(b.visitDate + ' ' + b.visitTime);
      return dateB.getTime() - dateA.getTime();
    });

    setFilteredVisits(result);
  }, [visits, filterStatus, searchQuery]);

  // Fungsi untuk artikel
  const handleAddArticle = () => {
    if (!articleForm.title || !articleForm.excerpt || !articleForm.content) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field",
        variant: "destructive",
      });
      return;
    }

    const newArticle = addArticle({
      title: articleForm.title,
      excerpt: articleForm.excerpt,
      content: articleForm.content,
      image: articleForm.image || "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
      date: new Date().toISOString().split('T')[0],
      author: adminData?.name || "Guru BK",
      category: articleForm.category,
      readTime: articleForm.readTime
    });

    loadArticles(); // Reload articles
    setArticleForm({ title: "", excerpt: "", content: "", image: "", category: "Mental Health", readTime: "5 min read" });
    setIsAddArticleOpen(false);
    
    toast({
      title: "Berhasil",
      description: "Artikel berhasil ditambahkan",
    });
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setArticleForm({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      image: article.image,
      category: article.category || "Mental Health",
      readTime: article.readTime || "5 min read"
    });
    setIsAddArticleOpen(true);
  };

  const handleUpdateArticle = () => {
    if (!editingArticle) return;

    updateArticle(editingArticle.id, {
      ...articleForm
    });

    loadArticles(); // Reload articles
    setEditingArticle(null);
    setArticleForm({ title: "", excerpt: "", content: "", image: "", category: "Mental Health", readTime: "5 min read" });
    setIsAddArticleOpen(false);

    toast({
      title: "Berhasil",
      description: "Artikel berhasil diperbarui",
    });
  };

  const handleDeleteArticle = (id: number) => {
    deleteArticle(id);
    loadArticles(); // Reload articles
    toast({
      title: "Berhasil",
      description: "Artikel berhasil dihapus",
    });
  };

  // Fungsi untuk status kunjungan
  const handleUpdateVisitStatus = (id: number, status: Visit["status"]) => {
    updateVisitStatusInStorage(id, status);
    loadVisits(); // Reload visits setelah update

    const statusText = {
      pending: "Pending",
      approved: "Disetujui",
      completed: "Selesai",
      cancelled: "Dibatalkan"
    };

    toast({
      title: "Status Diperbarui",
      description: `Status kunjungan berhasil diubah menjadi ${statusText[status]}`,
    });
  };

  const handleViewDetail = (visit: Visit) => {
    setSelectedVisit(visit);
    setVisitNotes(visit.notes || "");
    setIsDetailOpen(true);
  };

  const handleSaveNotes = () => {
    if (selectedVisit) {
      updateVisitStatusInStorage(selectedVisit.id, selectedVisit.status, visitNotes);
      loadVisits();
      setIsDetailOpen(false);
      toast({
        title: "Berhasil",
        description: "Catatan berhasil disimpan",
      });
    }
  };

  const getStatusBadge = (status: Visit["status"]) => {
    const variants: Record<string, any> = {
      pending: { variant: "secondary", icon: Clock, text: "Pending" },
      approved: { variant: "default", icon: CheckCircle, text: "Disetujui" },
      completed: { variant: "default", icon: CheckCircle, text: "Selesai" },
      cancelled: { variant: "destructive", icon: XCircle, text: "Dibatalkan" }
    };

    const config = variants[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("adminData");
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari sistem",
    });
    navigate("/login");
  };

  if (!adminData) {
    return null;
  }

  const menuItems = [
    { id: "overview", icon: LayoutDashboard, label: "Overview", badge: null },
    { id: "articles", icon: FileText, label: "Kelola Artikel", badge: articles.length },
    { id: "visits", icon: Users, label: "Kunjungan Murid", badge: visits.filter(v => v.status === "pending").length },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-slate-900 text-white transition-all duration-300 overflow-hidden flex flex-col`}
      >
        {/* Logo & Brand */}
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-lg">
              BK
            </div>
            <div>
              <h2 className="font-bold text-lg">Admin Panel</h2>
              <p className="text-xs text-slate-400">Sahabat BK</p>
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-blue-500">
              <AvatarFallback className="bg-blue-600 text-white font-semibold">
                {adminData.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{adminData.name}</p>
              <p className="text-xs text-slate-400 truncate">{adminData.role}</p>
            </div>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="flex-1 text-left font-medium">{item.label}</span>
                {item.badge !== null && item.badge > 0 && (
                  <Badge variant={isActive ? "secondary" : "outline"} className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
              <Home className="h-5 w-5 mr-3" />
              Kembali ke Home
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-600"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {menuItems.find(item => item.id === activeTab)?.label}
              </h1>
              <p className="text-sm text-slate-500">
                Kelola sistem bimbingan dan konseling
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Badge>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fade-in">
              {/* Welcome Card */}
              <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Selamat Datang, {adminData.name}! 👋</CardTitle>
                  <CardDescription className="text-blue-100">
                    Ini adalah dashboard untuk mengelola artikel dan kunjungan murid
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-slate-600">
                        Total Artikel
                      </CardTitle>
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{articles.length}</div>
                    <p className="text-xs text-slate-500 mt-1">Artikel dipublikasikan</p>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-yellow-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-slate-600">
                        Pending
                      </CardTitle>
                      <Clock className="h-5 w-5 text-yellow-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-600">
                      {visits.filter(v => v.status === "pending").length}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Menunggu persetujuan</p>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-slate-600">
                        Kunjungan Hari Ini
                      </CardTitle>
                      <Calendar className="h-5 w-5 text-green-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">
                      {visits.filter(v => {
                        const today = new Date().toISOString().split('T')[0];
                        return v.visitDate === today && (v.status === "approved" || v.status === "pending");
                      }).length}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Jadwal hari ini</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-slate-600">
                        Total Murid
                      </CardTitle>
                      <Users className="h-5 w-5 text-purple-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">{visits.length}</div>
                    <p className="text-xs text-slate-500 mt-1">Murid terdaftar</p>
                  </CardContent>
                </Card>
              </div>

              {/* Kunjungan Hari Ini Section */}
              {visits.filter(v => {
                const today = new Date().toISOString().split('T')[0];
                return v.visitDate === today && (v.status === "approved" || v.status === "pending");
              }).length > 0 && (
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <Calendar className="h-5 w-5" />
                      Kunjungan Hari Ini
                    </CardTitle>
                    <CardDescription className="text-green-700">
                      {new Date().toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {visits.filter(v => {
                        const today = new Date().toISOString().split('T')[0];
                        return v.visitDate === today && (v.status === "approved" || v.status === "pending");
                      }).map((visit) => (
                        <div key={visit.id} className="bg-white p-4 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-12 w-12">
                                <AvatarFallback className="bg-green-100 text-green-700 font-semibold">
                                  {visit.studentName.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="font-semibold text-slate-900">{visit.studentName}</p>
                                <p className="text-sm text-slate-600">{visit.class}</p>
                                <div className="flex items-center gap-2 mt-2 text-sm text-slate-600">
                                  <Clock className="h-4 w-4 text-green-600" />
                                  <span className="font-medium text-green-700">{visit.visitTime} WIB</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-1 line-clamp-1">{visit.reason}</p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              {getStatusBadge(visit.status)}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setActiveTab("visits");
                                  setTimeout(() => handleViewDetail(visit), 100);
                                }}
                                className="text-xs"
                              >
                                Lihat Detail
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Articles */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Artikel Terbaru
                    </CardTitle>
                    <CardDescription>5 artikel terakhir yang dipublikasikan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {articles.slice(0, 5).map((article) => (
                        <div key={article.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                          <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-16 h-16 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{article.title}</p>
                            <p className="text-xs text-slate-500">{article.date}</p>
                            <Badge variant="outline" className="text-xs mt-1">
                              {article.category}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Visits */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Kunjungan Terbaru
                    </CardTitle>
                    <CardDescription>Aktivitas kunjungan terkini</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {visits.slice(0, 5).map((visit) => (
                        <div key={visit.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {visit.studentName.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{visit.studentName}</p>
                            <p className="text-xs text-slate-500">{visit.class} • {visit.visitDate}</p>
                            <div className="mt-1">
                              {getStatusBadge(visit.status)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Articles Tab */}
          {activeTab === "articles" && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Daftar Artikel</CardTitle>
                      <CardDescription>
                        Kelola artikel bimbingan dan konseling
                      </CardDescription>
                    </div>
                    <Dialog open={isAddArticleOpen} onOpenChange={setIsAddArticleOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={() => {
                          setEditingArticle(null);
                          setArticleForm({ title: "", excerpt: "", content: "", image: "", category: "Mental Health", readTime: "5 min read" });
                        }}>
                          <Plus className="h-4 w-4 mr-2" />
                          Tambah Artikel
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            {editingArticle ? "Edit Artikel" : "Tambah Artikel Baru"}
                          </DialogTitle>
                          <DialogDescription>
                            {editingArticle ? "Perbarui informasi artikel" : "Isi form untuk menambah artikel baru"}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Judul Artikel</Label>
                            <Input
                              id="title"
                              placeholder="Masukkan judul artikel"
                              value={articleForm.title}
                              onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category">Kategori</Label>
                            <Select 
                              value={articleForm.category} 
                              onValueChange={(value) => setArticleForm({ ...articleForm, category: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih kategori" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Mental Health">Mental Health</SelectItem>
                                <SelectItem value="Career Guidance">Career Guidance</SelectItem>
                                <SelectItem value="Academic">Academic</SelectItem>
                                <SelectItem value="Personal Growth">Personal Growth</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="readTime">Waktu Baca</Label>
                            <Select 
                              value={articleForm.readTime} 
                              onValueChange={(value) => setArticleForm({ ...articleForm, readTime: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih waktu baca" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="3 min read">3 min read</SelectItem>
                                <SelectItem value="5 min read">5 min read</SelectItem>
                                <SelectItem value="7 min read">7 min read</SelectItem>
                                <SelectItem value="10 min read">10 min read</SelectItem>
                                <SelectItem value="15 min read">15 min read</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="excerpt">Ringkasan</Label>
                            <Textarea
                              id="excerpt"
                              placeholder="Ringkasan singkat artikel"
                              value={articleForm.excerpt}
                              onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                              rows={2}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="content">Konten Artikel</Label>
                            <Textarea
                              id="content"
                              placeholder="Isi lengkap artikel"
                              value={articleForm.content}
                              onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                              rows={8}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="image">URL Gambar (opsional)</Label>
                            <Input
                              id="image"
                              placeholder="https://example.com/image.jpg"
                              value={articleForm.image}
                              onChange={(e) => setArticleForm({ ...articleForm, image: e.target.value })}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsAddArticleOpen(false);
                              setEditingArticle(null);
                              setArticleForm({ title: "", excerpt: "", content: "", image: "", category: "Mental Health", readTime: "5 min read" });
                            }}
                          >
                            Batal
                          </Button>
                          <Button onClick={editingArticle ? handleUpdateArticle : handleAddArticle}>
                            {editingArticle ? "Perbarui" : "Tambah"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {articles.length === 0 ? (
                      <p className="text-center text-slate-500 py-8">Belum ada artikel</p>
                    ) : (
                      articles.map((article) => (
                        <div key={article.id} className="border rounded-lg p-4 flex gap-4 hover:shadow-md transition-shadow">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-24 h-24 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{article.title}</h3>
                            <p className="text-slate-600 text-sm mt-1 line-clamp-2">{article.excerpt}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                              <span>{article.date}</span>
                              <span>•</span>
                              <span>{article.author}</span>
                              <span>•</span>
                              <Badge variant="outline" className="text-xs">{article.category}</Badge>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditArticle(article)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteArticle(article.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Visits Tab */}
          {activeTab === "visits" && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <CardTitle>Data Kunjungan Murid</CardTitle>
                      <CardDescription>
                        Daftar murid yang akan atau sudah berkunjung ke BK
                      </CardDescription>
                    </div>
                    
                    {/* Filter dan Search */}
                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                      <Input
                        placeholder="Cari nama atau kelas..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-64"
                      />
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue placeholder="Filter Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Semua Status</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Disetujui</SelectItem>
                          <SelectItem value="completed">Selesai</SelectItem>
                          <SelectItem value="cancelled">Dibatalkan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Statistics Summary */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm text-yellow-700">Pending</span>
                      </div>
                      <p className="text-2xl font-bold text-yellow-600 mt-2">
                        {visits.filter(v => v.status === "pending").length}
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-700">Disetujui</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600 mt-2">
                        {visits.filter(v => v.status === "approved").length}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-700">Selesai</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600 mt-2">
                        {visits.filter(v => v.status === "completed").length}
                      </p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span className="text-sm text-red-700">Dibatalkan</span>
                      </div>
                      <p className="text-2xl font-bold text-red-600 mt-2">
                        {visits.filter(v => v.status === "cancelled").length}
                      </p>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50">
                          <TableHead className="font-semibold">Nama Murid</TableHead>
                          <TableHead className="font-semibold">Kelas</TableHead>
                          <TableHead className="font-semibold">Tanggal</TableHead>
                          <TableHead className="font-semibold">Waktu</TableHead>
                          <TableHead className="font-semibold">Keperluan</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="font-semibold">Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredVisits.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-slate-500 py-8">
                              {searchQuery || filterStatus !== "all" 
                                ? "Tidak ada data yang sesuai dengan filter"
                                : "Belum ada data kunjungan"}
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredVisits.map((visit) => (
                            <TableRow key={visit.id} className="hover:bg-slate-50">
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                      {visit.studentName.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  {visit.studentName}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{visit.class}</Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="h-4 w-4 text-slate-400" />
                                  {new Date(visit.visitDate).toLocaleDateString('id-ID', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2 text-sm">
                                  <Clock className="h-4 w-4 text-slate-400" />
                                  {visit.visitTime}
                                </div>
                              </TableCell>
                              <TableCell className="max-w-xs">
                                <p className="truncate text-sm">{visit.reason}</p>
                              </TableCell>
                              <TableCell>{getStatusBadge(visit.status)}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleViewDetail(visit)}
                                    title="Lihat Detail"
                                  >
                                    <FileEdit className="h-4 w-4" />
                                  </Button>
                                  {visit.status === "pending" && (
                                    <>
                                      <Button
                                        size="sm"
                                        onClick={() => handleUpdateVisitStatus(visit.id, "approved")}
                                        className="bg-green-600 hover:bg-green-700"
                                        title="Setujui"
                                      >
                                        <CheckCircle className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleUpdateVisitStatus(visit.id, "cancelled")}
                                        title="Tolak"
                                      >
                                        <XCircle className="h-4 w-4" />
                                      </Button>
                                    </>
                                  )}
                                  {visit.status === "approved" && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleUpdateVisitStatus(visit.id, "completed")}
                                      className="border-green-600 text-green-600 hover:bg-green-50"
                                      title="Tandai Selesai"
                                    >
                                      Selesai
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Result Count */}
                  {filteredVisits.length > 0 && (
                    <div className="mt-4 text-sm text-slate-600">
                      Menampilkan {filteredVisits.length} dari {visits.length} data kunjungan
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Dialog untuk detail kunjungan */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Kunjungan</DialogTitle>
            <DialogDescription>
              Informasi lengkap tentang kunjungan murid
            </DialogDescription>
          </DialogHeader>
          {selectedVisit && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-600">Nama Murid</Label>
                  <p className="text-base font-semibold">{selectedVisit.studentName}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-600">Kelas</Label>
                  <p className="text-base font-semibold">{selectedVisit.class}</p>
                </div>
              </div>

              {(selectedVisit.email || selectedVisit.phone) && (
                <div className="grid grid-cols-2 gap-4">
                  {selectedVisit.email && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-600">Email</Label>
                      <p className="text-sm">{selectedVisit.email}</p>
                    </div>
                  )}
                  {selectedVisit.phone && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-600">No. Telepon</Label>
                      <p className="text-sm">{selectedVisit.phone}</p>
                    </div>
                  )}
                </div>
              )}

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-600">Tanggal Kunjungan</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <p className="text-base">
                      {new Date(selectedVisit.visitDate).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-600">Waktu</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <p className="text-base">{selectedVisit.visitTime} WIB</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-600">Status</Label>
                <div>{getStatusBadge(selectedVisit.status)}</div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-600">Keperluan/Tujuan Kunjungan</Label>
                <p className="text-base p-3 bg-slate-50 rounded-lg">{selectedVisit.reason}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Catatan Guru BK</Label>
                <Textarea
                  id="notes"
                  placeholder="Tambahkan catatan tentang kunjungan ini..."
                  value={visitNotes}
                  onChange={(e) => setVisitNotes(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-600">Dibuat pada</Label>
                <p className="text-sm text-slate-500">
                  {new Date(selectedVisit.createdAt).toLocaleString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDetailOpen(false)}
            >
              Tutup
            </Button>
            <Button onClick={handleSaveNotes}>
              Simpan Catatan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
