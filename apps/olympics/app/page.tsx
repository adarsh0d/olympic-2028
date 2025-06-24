import {useTranslations} from 'next-intl';
 
export default function HomePage() {
  const t = useTranslations('medals');
  return <h1>{t('title')}</h1>;
}