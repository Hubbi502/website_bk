import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// Data admin (guru BK) sementara untuk testing
const adminData = [
  {
    id: 1,
    name: "Super admin",
    username: "super.admin",
    password: "guru123",
    role: "Guru BK Senior"
  },
  {
    id: 2,
    name: "admin",
    username: "admin",
    password: "guru123",
    role: "Guru BK"
  }
];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      // Validasi dengan data admin sementara
      const admin = adminData.find(
        (user) => user.username === username && user.password === password
      );

      if (admin) {
        // Login berhasil
        toast({
          title: "Login Berhasil",
          description: `Selamat datang, ${admin.name}! (${admin.role})`,
        });
        
        // Simpan data admin ke localStorage
        localStorage.setItem("adminData", JSON.stringify({
          id: admin.id,
          name: admin.name,
          username: admin.username,
          role: admin.role
        }));
        
        // Redirect to dashboard or home page
        navigate("/dashboard");
      } else {
        // Login gagal
        toast({
          title: "Login Gagal",
          description: "Username atau password tidak valid.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login Guru BK
          </CardTitle>
          <CardDescription className="text-center">
            Masukkan nama dan password untuk melanjutkan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username Anda"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Login"}
            </Button>
            
            {/* Info akun demo */}
            <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm text-gray-600">
              <p className="font-semibold mb-1">Akun Demo:</p>
              <p>Username: <span className="font-mono">{adminData[0].username}</span></p>
              <p>Password: <span className="font-mono">{adminData[0].password}</span></p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
