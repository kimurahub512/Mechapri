import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Button } from '@/Components/ui/button';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import phone from '@/assets/images/AN-sp-skewed.webp';
import mess from '@/assets/images/AN-pic-mess.webp';
import shop from '@/assets/images/home-printshops.png';
import Header from '@/Components/header/header';
import feature1 from '@/assets/images/feature-1-1.png';
import feature2 from '@/assets/images/feature-1-2.png';
import feature3 from '@/assets/images/feature-1-3.png';
import feature4 from '@/assets/images/feature-2-1.png';
import feature5 from '@/assets/images/feature-2-2.png';
import feature6 from '@/assets/images/feature-2-3.png';
import feature7 from '@/assets/images/feature-2-4.png';
import feature7 from '@/assets/images/feature-3.png';
import feature10 from '@/assets/images/feature-4.png';


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
      <main className="AN-mod-main">
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
                      fontSize: '80px',
                      fontWeight: 900,
                      lineHeight: '104px',
                      letterSpacing: '-4px',
                      whiteSpace: 'nowrap',
                      zIndex: 3,
                    }}
                  >
                    “公式グッズ”として販売
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
              style={{ backgroundImage: `url(${shop})` }}
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
              <img className="AN-fv-img1" src={phone} alt="MediBang Neppuri"/>
            </div>
            <div className="AN-fv-img2-outer">
              <img className="AN-fv-img2" src={mess} alt="MediBang Neppuri" />
            </div>
          </div>
        </div>

        {/* Feature Sections will be added here */}
      </main>
    </MainLayout>
  );
} 