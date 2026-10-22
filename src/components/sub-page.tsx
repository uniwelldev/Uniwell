import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export function SubPage({
  children,
  wide,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <>
      <div className="dark-stage">
        <Navigation />
      </div>
      <main id="top" className="sub-main">
        <div
          className={
            wide ? 'container sub-content wide' : 'container sub-content'
          }
        >
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
