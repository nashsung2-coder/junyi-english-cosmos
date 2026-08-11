import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Home - Landing Page
 * 轉址至大廳頁面(/hall)
 */
export default function Home() {
  const [, navigate] = useLocation();

  useEffect(() => {
    navigate("/hall");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">✨</div>
        <p className="text-muted-foreground">正在進入均一星辰宇宙...</p>
      </div>
    </div>
  );
}
