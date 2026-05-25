'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [statusText, setStatusText] = useState('Initializing...');

  useEffect(() => {
    const duration = 3000;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const statuses = [
      { at: 0,  text: 'Initializing...' },
      { at: 25, text: 'Loading Assets...' },
      { at: 55, text: 'Preparing Store...' },
      { at: 80, text: 'Almost Ready...' },
      { at: 97, text: 'Launching! 🎮' },
    ];

    const interval = setInterval(() => {
      currentStep++;
      const rawProgress = currentStep / steps;
      // Ease-in-out cubic
      const easedProgress = rawProgress < 0.5
        ? 4 * rawProgress * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;
      const nextProgress = Math.min(Math.round(easedProgress * 100), 100);
      setProgress(nextProgress);

      // Update status text
      const status = [...statuses].reverse().find(s => nextProgress >= s.at);
      if (status) setStatusText(status.text);

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => setIsVisible(false), 800);
        }, 350);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#090514',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        opacity: isDone ? 0 : 1,
        transform: isDone ? 'scale(1.06)' : 'scale(1)',
        pointerEvents: isDone ? 'none' : 'all',
      }}
    >
      {/* ── Grid overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, #1f1345 1px, transparent 1px), linear-gradient(to bottom, #1f1345 1px, transparent 1px)',
          backgroundSize: '3.5rem 3.5rem',
          maskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, #000 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, #000 60%, transparent 100%)',
          opacity: 0.22,
        }}
      />

      {/* ── Central purple/red radial glow ── */}
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(76,29,149,0.38) 0%, rgba(239,59,44,0.10) 45%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Ambient corner glows (logo colors) ── */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(239,59,44,0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,171,0,0.10) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Floating particles (logo red + amber) ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {Array.from({ length: 20 }).map((_, i) => {
          const size = 2 + (i % 4);
          const left = (i * 4.8 + 3) % 100;
          const dur = 5 + (i % 5);
          const delay = (i * 0.4) % 5;
          const isAmber = i % 3 !== 0;
          return (
            <div
              key={i}
              className="absolute bottom-0 rounded-full"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                background: isAmber
                  ? 'linear-gradient(to top, #FFAB00, #EF3B2C)'
                  : 'linear-gradient(to top, #7C3AED, #FFAB00)',
                opacity: 0.65,
                animation: `float-particles ${dur}s infinite linear`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 1rem',
          maxWidth: 480,
          width: '100%',
        }}
      >
        {/* ══ REAL LOGO IMAGE ══ */}
        <div
          className="float-logo logo-glow"
          style={{
            position: 'relative',
            width: 'clamp(220px, 55vw, 340px)',
            height: 'clamp(130px, 33vw, 200px)',
            marginBottom: '2rem',
            /* dark bg needed so mix-blend-mode:screen removes white */
            backgroundColor: '#090514',
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          <Image
            src="/logo.png"
            alt="Boost Video Game"
            fill
            sizes="(max-width: 640px) 220px, 340px"
            className="object-contain"
            priority
          />
          {/* subtle inner border ring */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 16,
              border: '1px solid rgba(255,171,0,0.12)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ══ Arabic tagline ══ */}
        <h1
          className="font-cairo"
          style={{
            fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
            fontWeight: 700,
            marginBottom: '2rem',
            background: 'linear-gradient(to right, #ffffff, #e2e8f0, #ffffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.02em',
          }}
        >
          تجربة لعب بمستوى أعلى ...
        </h1>

        {/* ══ PROGRESS SECTION ══ */}
        <div style={{ width: 'clamp(240px, 70vw, 340px)' }}>
          
          {/* Status + Percent row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
              fontFamily: 'monospace',
            }}
          >
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#EF3B2C',
                textShadow: '0 0 12px rgba(239,59,44,0.7)',
              }}
            >
              {statusText}
            </span>
            <span
              style={{
                fontSize: '1.1rem',
                fontWeight: 900,
                color: '#FFAB00',
                textShadow: '0 0 10px rgba(255,171,0,0.6)',
                letterSpacing: '0.04em',
              }}
            >
              {progress}%
            </span>
          </div>

          {/* Progress track */}
          <div
            style={{
              height: 3,
              width: '100%',
              background: 'rgba(46,16,101,0.8)',
              borderRadius: 999,
              overflow: 'hidden',
              border: '1px solid rgba(124,58,237,0.2)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(to right, #EF3B2C, #FF7A1A, #FFAB00)',
                boxShadow: '0 0 14px rgba(255,171,0,0.8), 0 0 5px rgba(239,59,44,0.6)',
                borderRadius: 999,
                transition: 'width 30ms linear',
              }}
            />
          </div>

          {/* 3 dots indicator */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1rem',
            }}
          >
            {[0, 1, 2].map((dot) => {
              const lit = progress > dot * 33 + 8;
              return (
                <div
                  key={dot}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: lit ? '#FFAB00' : '#2E1065',
                    boxShadow: lit ? '0 0 8px rgba(255,171,0,0.9)' : 'none',
                    transition: 'all 0.4s ease',
                    transform: lit ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* ══ Bottom URL label ══ */}
        <div
          style={{
            marginTop: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            color: 'rgba(148,163,184,0.45)',
            fontSize: '0.6rem',
            fontFamily: 'monospace',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          <div style={{ width: 28, height: 1, background: 'rgba(76,29,149,0.4)' }} />
          <span>boostvideogame.com</span>
          <div style={{ width: 28, height: 1, background: 'rgba(76,29,149,0.4)' }} />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
