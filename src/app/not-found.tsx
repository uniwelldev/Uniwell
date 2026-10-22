import Link from 'next/link';
import { SubPage } from '@/components/sub-page';

export default function NotFound() {
  return (
    <SubPage>
      <p className="eyebrow">404</p>
      <h1 className="sub-title">Page not found</h1>
      <p className="sub-lead">The page you are looking for does not exist.</p>
      <Link className="sub-cta" href="/">
        BACK TO HOME
      </Link>
    </SubPage>
  );
}
