import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Button } from '@/Components/ui/button';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import phone from '@/assets/images/AN-sp-skewed.webp';
import mess from '@/assets/images/AN-pic-mess.webp';
import homePrintshops from '../assets/images/home-printshops.png';
import Header from '@/Components/header/header';
import feature11 from '@/assets/images/feature-1-1.png';
import feature12 from '@/assets/images/feature-1-2.png';
import feature13 from '@/assets/images/feature-1-3.png';
// import feature10 from '@/assets/images/feature-2-1.png';
// import feature4 from '@/assets/images/feature-2-1.png';
// import feature5 from '@/assets/images/feature-2-2.png';
// import feature6 from '@/assets/images/feature-2-3.png';
// import feature7 from '@/assets/images/feature-2-4.png';
// import feature7 from '@/assets/images/feature-3.png';
// import feature10 from '@/assets/images/feature-4.png';


gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Background text animation
    gsap.to(".AN-bg-infinite-logo span", {
      xPercent: -100,
      repeat: -1,
      duration: 20,
      ease: "none",
    });

    // Title animations
    gsap.from(".AN-fv-title-animetion-text", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Description and button animations
    gsap.from(".AN-fv-desc", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power2.out",
    });

    gsap.from(".AN-fv-btn-outer", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.6,
      ease: "power2.out",
    });

    // Images animation
    gsap.from([".AN-fv-img1-outer", ".AN-fv-img2-outer"], {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });

    // Mouse move effect for images
    const container = containerRef.current;
    if (container && window.innerWidth > 1024) {
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = container.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;

        gsap.to(".AN-fv-img1-outer", {
          rotateY: x * 5,
          rotateX: -y * 5,
          duration: 0.5,
        });

        gsap.to(".AN-fv-img2-outer", {
          rotateY: x * 3,
          rotateX: -y * 3,
          duration: 0.5,
        });
      };

      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>メディバンネップリ | 写真をコンビニで販売</title>
        <meta name="description" content="メディバンネップリは、写真を全国のコンビニで販売できるネットプリントサービスです。写真1枚あれば、あなたの｢公式ネップリショップ｣をカンタン無料で開設できます。" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mbneppuri" />
        <meta property="og:url" content="https://mbneppuri.com/" />
        <meta property="og:title" content="メディバンネップリ｜写真をコンビニで販売" />
        <meta property="og:description" content="メディバンネップリは、写真を全国のコンビニで販売できるネットプリントサービスです。写真1枚あれば、あなたの｢公式ネップリショップ｣をカンタン無料で開設できます。" />
        <meta property="og:image" content="https://img.mbneppuri.com/images/neppuri-og-3.png" />
      </Head>
      <Header />
      <main className="AN-mod-main bg-white">
        {/* Background Elements */}
        <div className="AN-bg-infinite-logo">
          <span>MEDIBANG NEPPURI</span>
          <span>MEDIBANG NEPPURI</span>
        </div>
        <div className="AN-bg-rotate-text"></div>
        <div className="AN-bg-rotate-text-2"></div>

        {/* Hero Section */}
        <div className="AN-fv-container" ref={containerRef}>
          <div className="AN-fv-stack-left">
            <div className="AN-fv-convenience-text AN-fv-title-animetion2" style={{
              position: 'relative',
              top: '-8px',
              left: '-15px',
              display: 'inline-block',
              marginBottom: '-11px',
              color: '#fe7878',
              fontSize: '10.19px',
              fontWeight: '900',
              lineHeight: '130%',
              transform: 'rotate(-7deg)',
              letterSpacing: '-0.05em',
              width: '172.011px',
              fontFamily: '"Noto Sans JP", sans-serif',
              zIndex: 10,
            }}>
              コンビニロゴ＋全国55000店に対応
            </div>
            <div className="AN-fv-noti">
              <span className="AN-fv-noti-me">め</span>
              <span className="AN-fv-noti-chi">ち</span>
              <span className="AN-fv-noti-ya">ゃ</span>
              <span className="AN-fv-noti-pu">プ</span>
              <span className="AN-fv-noti-ri">リ</span>
              <span className="AN-fv-noti-de">で</span>
            </div>
            <div className="AN-fv-title">
              <div className="AN-fv-title-line1">
                <div className="AN-fv-title-line1-inner">
                  {/* Japanese text animation */}
                  {'あなたの写真を'.split('').map((char, i) => (
                    <span key={i} className={`AN-fv-title-animetion-text __0${i + 1}`}>{char}</span>
                  ))}
                </div>
              </div>
              <div className="AN-fv-title-line2">
                <div className="AN-fv-title-line2-inner">
                  <span
                    style={{
                      background: 'linear-gradient(102deg, #FF8D4E 0%, #EA2CE2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      display: 'inline-block',
                      fontFamily: '"Noto Sans JP", sans-serif',
                      fontSize: '5rem',
                      fontWeight: 900,
                      lineHeight: '6.5rem',
                      letterSpacing: '-0.25rem',
                      whiteSpace: 'nowrap',
                      zIndex: 3,
                    }}
                  >
                    "公式グッズ"として販売
                  </span>
                </div>
              </div>
            </div>
            <div className="AN-fv-desc">
              写真をアップするだけで、全国のコンビニががあなたのグッズ販売ブースに。
              めちゃプリであなたの写真を"公式グッズ"として販売 しましょう！
            </div>
            <div
              className="AN-fv-shop-img"
              role="img"
              aria-label="ショップサンプル"
              style={{ backgroundImage: `url(${homePrintshops})` }}
            />
            <div className="AN-fv-btn-outer">
              <Button asChild className="AN-fv-btn">
                <a href="/start/?OS=true">
                  <span className="AN-fv-btn-inner">
                    <span className="AN-fv-btn-caption">１分で無料</span>
                    <span className="AN-fv-btn-main">今すぐ出品する</span>
                  </span>
                </a>
              </Button>
            </div>
          </div>
          <div className="AN-fv-stack-right __pc">
            <div className="AN-fv-img1-outer">
              <img className="AN-fv-img1" src={phone} alt="MediBang Neppuri" />
            </div>
            <div className="AN-fv-img2-outer">
              <img className="AN-fv-img2" src={mess} alt="MediBang Neppuri" />
            </div>
          </div>
        </div>

        {/* Feature Sections will be added here */}
        <section className="relative mt-8 flex justify-center items-start min-h-[700px] overflow-x-hidden" style={{ height: '650px', overflow: 'visible' }}>
          {/* Feature Section Title Bar */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              width: '75rem',
              height: '3.75rem',
              top: '0rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
            }}
          >
            <span
              className="font-2 font-extrabold text-[1.125rem] leading-[2.3625rem] mr-4 align-middle"
              style={{
                background: 'linear-gradient(90.28deg, #FF8D4E 0%, #EA2CE2 14.69%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                letterSpacing: '0%',
              }}
            >
              Feature 01.
            </span>
            <span
              className="font-2 font-extrabold text-[1.125rem] leading-[2.3625rem] align-middle"
              style={{
                background: 'linear-gradient(90.28deg, #FF8D4E 0%, #EA2CE2 14.69%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                letterSpacing: '0%',
              }}
            >
              使い方
            </span>
          </div>
          {/* Subtitle below the title bar, visually aligned with the 'F' of Feature 01. */}
          <div
            style={{
              top: '4.1625rem',
              width: '46.6875rem',
              position: 'absolute',
              left: 'calc(50% - 37.5rem + 31.875rem)',
              textAlign: 'left',
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-family-Font-1, \"Noto Sans JP\")',
                fontSize: '3.75rem',
                fontStyle: 'normal',
                fontWeight: 'var(--font-weight-900, 900)',
                lineHeight: '5.25rem',
                letterSpacing: '-0.1875rem',
                background: 'linear-gradient(91deg, #FF8D4E 0%, #EA2CE2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline',
              }}
            >
              スマホだけで<br />
              <span
                style={{
                  color: 'var(--mbneppuri-com-mine-shaft, var(--color-grey-13, #222))',
                  fontFamily: 'var(--font-family-Font-1, \"Noto Sans JP\")',
                  fontSize: '3.75rem',
                  fontStyle: 'normal',
                  fontWeight: 'var(--font-weight-900, 900)',
                  lineHeight: '5.25rem',
                  letterSpacing: '-0.1875rem',
                  background: 'none',
                  WebkitBackgroundClip: 'initial',
                  WebkitTextFillColor: 'initial',
                }}
              >
                "公式グッズ"
              </span>
              が販売できる
            </span>
            {/* Description below the subtitle */}
            <div
              style={{
                marginTop: '2.125rem',
                width: '42.5208rem',
                color: 'var(--mbneppuri-com-mine-shaft, var(--color-grey-13, #222))',
                fontFamily: 'var(--font-family-Font-1, \"Noto Sans JP\")',
                fontSize: '1.125rem',
                fontStyle: 'normal',
                fontWeight: 'var(--font-weight-400, 400)',
                lineHeight: '2.0475rem',
              }}
            >
              スマホ1つで公式グッズを簡単に販売できます。写真をアップするだけで在庫管理や発送作業も一切不要。ファンの手元に写真がすぐに届きます。
            </div>
          </div>
          {/* Feature images container */}
          <div 
            className="AN-feature1-rotate-text"
            style={{
              transform: 'translate(37.5rem, 16.875rem)',
              width: '41.77rem',
              height: '43.08rem',
              borderRadius: '50%',
              overflow: 'hidden'
            }}
          >
            <img className="AN-feature1-rotate-text-img" src="//img.mbneppuri.com/images/shared/AN-rotateText1.svg" alt="photos and illustrations for easy printing upload" style={{ objectPosition: 'center 10px' }} />
          </div>

          <div className="absolute origin-left" style={{ width: '75rem', left: '50%', transform: 'translateX(-50%)' }}>
            {[
              { left: '-308px', top: '0' },
              { left: '-68px', top: '113px' },
              { left: '172px', top: '220px' }
            ].map((position, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  width: '13.75rem',
                  height: '27.8125rem',
                  ...position,
                  borderRadius: '1rem',
                  border: '4px solid #333333',
                  overflow: 'hidden',
                  background: '#fff',
                }}
              >
                <img
                  src={[feature11, feature12, feature13][index]}
                  alt="Feature"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '1rem',
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </MainLayout>
  );
} 