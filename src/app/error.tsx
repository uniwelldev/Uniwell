'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="sub-main">
      <div className="container sub-content">
        <p className="eyebrow">ERROR</p>
        <h1 className="sub-title">Something went wrong</h1>
        <p className="sub-lead">Please try again.</p>
        <button className="sub-cta" type="button" onClick={reset}>
          TRY AGAIN
        </button>
      </div>
    </main>
  );
}
