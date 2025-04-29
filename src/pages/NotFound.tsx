
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <p className="text-2xl font-medium mt-2">Page not found</p>
        <p className="text-muted-foreground mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button className="mt-6" asChild>
          <Link to="/">
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
