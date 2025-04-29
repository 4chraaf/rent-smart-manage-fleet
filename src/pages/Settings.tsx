import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import DataManagement from '@/components/settings/DataManagement';

export default function Settings() {
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleLanguageChange = (value: string) => {
    // Make sure we only pass valid Language values
    if (value === 'en' || value === 'fr' || value === 'ar') {
      setLanguage(value as any);
      toast({
        title: t('languageChanged'),
        description: t('languageChangedDescription'),
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold">{t('settings')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('manageYourSettings')}
        </p>
      </header>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">{t('general')}</TabsTrigger>
          <TabsTrigger value="account">{t('account')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('notifications')}</TabsTrigger>
          <TabsTrigger value="data">{t('dataManagement')}</TabsTrigger>
        </TabsList>
        
        {/* General Tab */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('languagePreferences')}</CardTitle>
              <CardDescription>
                {t('selectYourPreferredLanguage')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <Label htmlFor="language">{t('language')}</Label>
                <select
                  id="language"
                  className="px-4 py-2 border rounded-md bg-background"
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  <option value="en">{t('english')}</option>
                  <option value="fr">{t('french')}</option>
                  <option value="ar">{t('arabic')}</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('themePreferences')}</CardTitle>
              <CardDescription>
                {t('customizeYourTheme')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <Label htmlFor="darkMode">{t('darkMode')}</Label>
                <Switch
                  id="darkMode"
                  checked={darkMode}
                  onCheckedChange={(checked) => setDarkMode(checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('profileInformation')}</CardTitle>
              <CardDescription>
                {t('updateYourProfileInfo')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">{t('name')}</Label>
                  <Input
                    type="text"
                    id="name"
                    defaultValue={user?.name || ''}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input
                    type="email"
                    id="email"
                    defaultValue={user?.email || ''}
                    className="mt-1"
                    disabled
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">{t('bio')}</Label>
                <Input
                  id="bio"
                  className="mt-1"
                  placeholder={t('shortBio')}
                />
              </div>
              <Button>{t('updateProfile')}</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('passwordSettings')}</CardTitle>
              <CardDescription>
                {t('changeYourPassword')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">{t('currentPassword')}</Label>
                <Input
                  type="password"
                  id="currentPassword"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="newPassword">{t('newPassword')}</Label>
                <Input
                  type="password"
                  id="newPassword"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  className="mt-1"
                />
              </div>
              <Button>{t('updatePassword')}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('emailNotifications')}</CardTitle>
              <CardDescription>
                {t('manageEmailNotifications')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <Label htmlFor="emailNotifications">
                  {t('receiveEmailNotifications')}
                </Label>
                <Switch
                  id="emailNotifications"
                  checked={emailNotifications}
                  onCheckedChange={(checked) => setEmailNotifications(checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('pushNotifications')}</CardTitle>
              <CardDescription>
                {t('managePushNotifications')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{t('pushNotificationsAreComingSoon')}</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Data Management Tab */}
        <TabsContent value="data" className="space-y-4">
          <DataManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
