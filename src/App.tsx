import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { SUPPORTED_LANGUAGES } from '@/lib/i18n';
import logo from '@/assets/brand/logo.svg';

export default function App() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const dark = theme === 'system' ? matchMedia('(prefers-color-scheme: dark)').matches : theme === 'dark';
  const themeLabel = dark ? t('theme.light') : t('theme.dark');

  const lang = i18n.resolvedLanguage ?? SUPPORTED_LANGUAGES[0];
  const nextLang = SUPPORTED_LANGUAGES[(SUPPORTED_LANGUAGES.indexOf(lang as never) + 1) % SUPPORTED_LANGUAGES.length];

  useEffect(() => {
    document.title = t('app.title');
  }, [t]);

  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center gap-4 border-b bg-card px-3 py-2">
        <a href="https://exi.moe" className="shrink-0">
          <img src={logo} alt="exi.moe" className="h-6 w-auto transition-transform hover:-rotate-6" />
        </a>
        <h1 className="font-medium">{t('app.title')}</h1>
        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            title={t('language.switch', { lang: nextLang.toUpperCase() })}
            onClick={() => void i18n.changeLanguage(nextLang)}
          >
            {lang.toUpperCase()}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title={themeLabel}
            aria-label={themeLabel}
            onClick={() => setTheme(dark ? 'light' : 'dark')}
          >
            {dark ? <Sun /> : <Moon />}
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-6 text-sm">
        <h2 className="w-fit text-brand-gradient text-3xl font-bold">exi.moe</h2>
        <div className="bg-brand-gradient p-6 text-brand-gradient-foreground">bg-brand-gradient</div>
        <p>{t('app.ready')}</p>
        <div className="flex gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </main>
    </div>
  );
}
