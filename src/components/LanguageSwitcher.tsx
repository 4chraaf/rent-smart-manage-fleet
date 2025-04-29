
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Check, Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Globe className="h-5 w-5" />
          <span className="sr-only">{t('language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <LanguageOption language="en" currentLanguage={language} onSelect={setLanguage} label="English" />
        <LanguageOption language="fr" currentLanguage={language} onSelect={setLanguage} label="Français" />
        <LanguageOption language="ar" currentLanguage={language} onSelect={setLanguage} label="العربية" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface LanguageOptionProps {
  language: 'en' | 'fr' | 'ar';
  currentLanguage: string;
  onSelect: (lang: 'en' | 'fr' | 'ar') => void;
  label: string;
}

function LanguageOption({ language, currentLanguage, onSelect, label }: LanguageOptionProps) {
  const isSelected = currentLanguage === language;
  
  return (
    <DropdownMenuItem 
      onClick={() => onSelect(language)}
      className={`flex items-center gap-2 ${isSelected ? 'bg-muted' : ''}`}
    >
      {isSelected && <Check className="h-4 w-4" />}
      <span className={isSelected ? 'font-medium' : ''}>{label}</span>
    </DropdownMenuItem>
  );
}
