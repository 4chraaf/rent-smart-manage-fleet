
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md w-full px-4">
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <p className="text-2xl font-medium mt-2">{t('pageNotFound') || 'Page not found'}</p>
        <p className="text-muted-foreground mt-2">
          {t('pageNotFoundDescription') || 'The page you\'re looking for doesn\'t exist or has been moved.'}
        </p>
        
        <Alert variant="destructive" className="mt-6 mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{t('errorTitle') || 'Navigation Error'}</AlertTitle>
          <AlertDescription>
            {t('errorDescription') || 'Please check the URL or return to the dashboard.'}
          </AlertDescription>
        </Alert>
        
        <div className="flex justify-center">
          <Button className="mt-2" asChild>
            <Link to="/">
              {t('backToDashboard') || 'Back to Dashboard'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
