'use client';
import { useEffect, useRef } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function TurnstileWidget({ onToken }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;
    let cancelled = false;
    const render = () => {
      if (cancelled || !containerRef.current || !window.turnstile || widgetIdRef.current !== null) return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: 'light',
        callback: token => onToken(token),
        'expired-callback': () => onToken(''),
        'error-callback': () => onToken(''),
      });
    };
    if (window.turnstile) render();
    else {
      let script = document.querySelector('script[data-turnstile-script="true"]');
      if (!script) {
        script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        script.dataset.turnstileScript = 'true';
        script.onload = render;
        document.head.appendChild(script);
      } else script.addEventListener('load', render, { once: true });
    }
    return () => {
      cancelled = true;
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onToken]);

  if (!siteKey) return <div className="captcha-setup-note"><ShieldCheck size={16}/><span>Bot protection setup required before launch. Configure <code>NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> and validate tokens on the server.</span></div>;
  return <div className="turnstile-wrap"><div ref={containerRef}/><small>Security check. Verification must also be validated by the server before production authentication.</small></div>;
}
