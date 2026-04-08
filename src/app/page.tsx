"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Scissors,
  Star,
  Clock,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Droplets,
  Instagram,
  Facebook,
  ArrowUp,
  Zap,
  Award,
  Quote,
  ZoomIn,
  Flame,
  Crown,
  Brush,
  Gem,
  Calendar,
  User,
  MessageSquare,
  Send,
  Hash,
} from "lucide-react";

/* ─────────────────── HELPERS ─────────────────── */

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function MarqueeBanner({ text, speed = 30 }: { text: string; speed?: number }) {
  const repeated = Array(6).fill(text);
  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-[rgba(255,255,255,0.06)] py-3 bg-[#0d0d0d]">
      <motion.div
        className="flex gap-12 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((t, i) => (
          <span
            key={i}
            className="text-[#a0a0a0]/30 uppercase tracking-[0.3em] text-sm flex items-center gap-4"
          >
            <span>{t}</span>
            <Scissors className="w-3 h-3 text-[#e87d2f]/30" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function RevealText({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────── NAVBAR ─────────────────── */

const navLinks = [
  { label: "Anasayfa", href: "#anasayfa" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Ürünler", href: "#urunler" },
  { label: "Galeri", href: "#galeri" },
  { label: "Blog", href: "#blog" },
  { label: "İletişim", href: "#iletisim" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <a href="#anasayfa" className="flex items-center gap-2 group">
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                <Scissors className="w-6 h-6 text-[#e87d2f]" />
              </motion.div>
              <span className="text-xl lg:text-2xl font-bold uppercase tracking-wider">
                Slick <span className="text-gradient-orange">Style</span>
              </span>
            </a>
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm uppercase tracking-widest text-[#a0a0a0] hover:text-[#e87d2f] transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#e87d2f] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Button
                asChild
                className="hidden sm:inline-flex bg-[#e87d2f] hover:bg-[#f5a623] text-white font-semibold uppercase tracking-wider text-sm px-6 py-2 rounded-none transition-all duration-300 hover:shadow-[0_0_20px_rgba(232,125,47,0.4)]"
              >
                <a href="#randevu">Randevu Al</a>
              </Button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-white p-2"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-2xl uppercase tracking-widest text-white hover:text-[#e87d2f] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────── HERO SECTION ─────────────────── */

function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      id="anasayfa"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="absolute top-20 right-10 w-[400px] h-[400px] rounded-full bg-[#e87d2f]/5 blur-[120px]" />
      <div className="absolute bottom-20 left-10 w-[300px] h-[300px] rounded-full bg-[#f5a623]/5 blur-[100px]" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-32 right-[15%] opacity-5 hidden lg:block"
      >
        <Scissors className="w-32 h-32 text-[#e87d2f]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div style={{ y: y1, opacity }} className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 mb-6"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="h-[2px] bg-[#e87d2f]"
              />
              <span className="text-[#e87d2f] uppercase tracking-[0.3em] text-sm font-medium">
                Hoş Geldiniz
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-tight mb-6">
              {"Profesyonel Berber Hizmeti"
                .split(" ")
                .map((word, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                    className="inline-block mr-3"
                  >
                    {idx === 1 ? (
                      <span className="text-gradient-orange">{word}</span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-[#a0a0a0] text-lg lg:text-xl mb-8 max-w-lg leading-relaxed"
            >
              Erkekler için premium bakım deneyimi. Uzman ellerde, modern tarzda.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-[#e87d2f] hover:bg-[#f5a623] text-white font-semibold uppercase tracking-wider px-8 py-3 rounded-none transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,125,47,0.4)]"
              >
                <a href="#randevu">
                  Randevu Al <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#e87d2f] text-[#e87d2f] hover:bg-[#e87d2f]/10 font-semibold uppercase tracking-wider px-8 py-3 rounded-none"
              >
                <a href="#hizmetler">Hizmetlerimiz</a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: y2, opacity }} className="relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-4 border-2 border-[#e87d2f]/20 rounded-sm" />
              <div className="absolute -inset-8 border border-[#e87d2f]/10 rounded-sm" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[300px] h-[400px] sm:w-[380px] sm:h-[500px] lg:w-[450px] lg:h-[580px]"
              >
                <Image
                  src="/barber-hero.png"
                  alt="Profesyonel berber"
                  fill
                  className="object-cover rounded-sm"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/30 to-transparent rounded-sm" />
              </motion.div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -bottom-4 -left-4 bg-[#e87d2f] text-white p-4 rounded-sm"
              >
                <div className="text-2xl font-bold">15+</div>
                <div className="text-xs uppercase tracking-wider">Yıl Deneyim</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-[#e87d2f]/40 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-[#e87d2f] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────── MARQUEE BANNER 1 ─────────────────── */
function MarqueeSection1() {
  return (
    <MarqueeBanner text="SLICK STYLE • PROFESYONEL BERBER • PREMIUM BAKIM • MODERN TARZ • ERKEK GROOMING •" speed={25} />
  );
}

/* ─────────────────── SERVICES — ACCORDION + HORIZONTAL TAB STYLE ─────────────────── */

const services = [
  {
    icon: Scissors,
    name: "Saç Kesimi",
    desc: "Modern fade, klasik kesim ve özel tasarım teknikleri ile yüz hatlarınıza en uygun saç modelini birlikte belirliyoruz. Her kesim öncesi detaylı danışmanlık.",
    price: "$30",
    duration: "45 dk",
    tag: "En Popüler",
  },
  {
    icon: Crown,
    name: "Sakal Tıraşı",
    desc: "Sakalınızın doğal formunu koruyarak, profesyonel araçlar ve tekniklerle düzgün, bakımlı bir görünüm sağlıyoruz. Sıcak havlu uygulaması dahil.",
    price: "$15",
    duration: "30 dk",
    tag: "",
  },
  {
    icon: Sparkles,
    name: "Cilt Bakımı",
    desc: "Derin temizlik, nemlendirme ve canlandırma işlemlerini kapsayan profesyonel cilt bakımı. Cildiniz taze, sağlıklı ve ışıltılı görünecek.",
    price: "$40",
    duration: "60 dk",
    tag: "Premium",
  },
  {
    icon: Flame,
    name: "Saç Şekillendirme",
    desc: "Saç tipinize uygun profesyonel şekillendirme ürünleri ve teknikleriyle gün boyu kalıcı, doğal görünümlü saç stilleri oluşturuyoruz.",
    price: "$25",
    duration: "30 dk",
    tag: "",
  },
  {
    icon: Droplets,
    name: "Saç Tedavisi",
    desc: "Keratin bakımı, protein tedavisi ve saç derisi masajı ile saç sağlığınızı içten dışa destekliyoruz. Dökülme ve kırılma karşıtı etkili çözümler.",
    price: "$35",
    duration: "50 dk",
    tag: "Yeni",
  },
  {
    icon: Gem,
    name: "Klasik Tıraş",
    desc: "Geleneksel ustura ile sıcak havlu uygulaması. Cildinizi tahriş etmeden, rahatlatıcı bir deneyim sunan otantik berber ritüeli.",
    price: "$20",
    duration: "40 dk",
    tag: "",
  },
];

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="hizmetler" className="relative py-24 lg:py-32" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <RevealText className="text-center mb-16">
          <span className="text-[#e87d2f] uppercase tracking-[0.3em] text-sm font-medium">
            Ne Yapıyoruz
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4">
            Hizmetlerimiz
          </h2>
          <div className="w-20 h-1 bg-[#e87d2f] mx-auto mb-4" />
          <p className="text-[#a0a0a0] text-lg max-w-md mx-auto">
            Erkek Bakımının En İyileri
          </p>
        </RevealText>

        {/* Horizontal Tab Bar */}
        <RevealText delay={0.2} className="mb-10">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {services.map((s, idx) => (
              <button
                key={s.name}
                onClick={() => setActiveIdx(idx)}
                className={`relative px-4 sm:px-6 py-3 text-xs sm:text-sm uppercase tracking-wider font-medium transition-all duration-300 rounded-sm overflow-hidden group ${
                  activeIdx === idx
                    ? "bg-[#e87d2f] text-white shadow-[0_0_20px_rgba(232,125,47,0.3)]"
                    : "bg-[#1a1a1a] text-[#a0a0a0] hover:text-white border border-[rgba(255,255,255,0.06)] hover:border-[#e87d2f]/30"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <s.icon className="w-4 h-4" />
                  {s.name}
                </span>
              </button>
            ))}
          </div>
        </RevealText>

        {/* Active Service Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative bg-gradient-to-br from-[#1a1a1a] to-[#151515] border border-[rgba(255,255,255,0.08)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#e87d2f]/5 blur-[100px] rounded-full" />
            <div className="grid lg:grid-cols-2 gap-0 relative z-10">
              {/* Left - Visual */}
              <div className="relative h-[300px] lg:h-auto bg-gradient-to-br from-[#e87d2f]/10 to-[#1a1a1a] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 barber-stripe" />
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: [-10, 10, -10] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  {(() => {
                    const Icon = services[activeIdx].icon;
                    return <Icon className="w-32 h-32 text-[#e87d2f]/20" />;
                  })()}
                </motion.div>
                {/* Price tag */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="absolute top-6 right-6 bg-[#e87d2f] text-white px-5 py-2 rounded-sm"
                >
                  <div className="text-2xl font-bold">{services[activeIdx].price}</div>
                  <div className="text-[10px] uppercase tracking-wider opacity-80">{services[activeIdx].duration}</div>
                </motion.div>
              </div>

              {/* Right - Info */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                {services[activeIdx].tag && (
                  <span className="inline-block w-fit bg-[#e87d2f]/10 text-[#e87d2f] text-xs uppercase tracking-widest px-3 py-1 mb-4 border border-[#e87d2f]/20">
                    {services[activeIdx].tag}
                  </span>
                )}
                <h3 className="text-2xl sm:text-3xl font-bold uppercase mb-4">
                  {services[activeIdx].name}
                </h3>
                <p className="text-[#a0a0a0] leading-relaxed mb-6 text-sm sm:text-base">
                  {services[activeIdx].desc}
                </p>
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2 text-sm text-[#a0a0a0]">
                    <Clock className="w-4 h-4 text-[#e87d2f]" />
                    {services[activeIdx].duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#a0a0a0]">
                    <Star className="w-4 h-4 text-[#e87d2f]" />
                    4.9 Puan
                  </div>
                </div>
                <div>
                  <Button
                    asChild
                    className="bg-[#e87d2f] hover:bg-[#f5a623] text-white font-semibold uppercase tracking-wider px-8 py-3 rounded-none transition-all duration-300 hover:shadow-[0_0_20px_rgba(232,125,47,0.4)]"
                  >
                    <a href="#randevu">
                      Randevu Al <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* All services quick grid below */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-10">
          {services.map((s, idx) => (
            <motion.button
              key={s.name}
              onClick={() => setActiveIdx(idx)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
              whileHover={{ y: -4, borderColor: "rgba(232,125,47,0.3)" }}
              className={`p-4 text-center transition-all duration-300 border cursor-pointer ${
                activeIdx === idx
                  ? "bg-[#e87d2f]/10 border-[#e87d2f]/30"
                  : "bg-[#1a1a1a] border-[rgba(255,255,255,0.06)] hover:border-[#e87d2f]/20"
              }`}
            >
              <s.icon className="w-6 h-6 text-[#e87d2f] mx-auto mb-2" />
              <div className="text-xs uppercase tracking-wider text-white font-medium">{s.name}</div>
              <div className="text-[#e87d2f] font-bold mt-1">{s.price}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── MARQUEE BANNER 2 ─────────────────── */
function MarqueeSection2() {
  return (
    <MarqueeBanner text="SAÇ KESİMİ • SAKAL BAKIMI • CİLT TEDAVİSİ • KLASİK TIRAŞ • ŞEKİLLENDİRME • PREMIUM ÜRÜNLER •" speed={35} />
  );
}

/* ─────────────────── ABOUT / STATS SECTION ─────────────────── */

const stats = [
  { value: 15, suffix: "+", label: "Yıl Deneyim" },
  { value: 10000, suffix: "+", label: "Müşteri" },
  { value: 5, suffix: "", label: "Uzman Berber" },
  { value: 49, suffix: "", label: "Puan (x10)", isDecimal: true },
];

function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 lg:py-32" style={{ backgroundColor: "#111111" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <RevealText>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#e87d2f]/30 rounded-sm" />
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm">
                <Image src="/about.png" alt="Barbershop" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/50 to-transparent" />
              </div>
            </div>
          </RevealText>

          <RevealText delay={0.2}>
            <div className="relative">
              <div className="absolute -left-6 top-0 w-1 h-20 bg-[#e87d2f] hidden lg:block" />
              <span className="text-[#e87d2f] uppercase tracking-[0.3em] text-sm font-medium">
                Hakkımızda
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-6">
                Slick Style <span className="text-gradient-orange">Hakkında</span>
              </h2>
              <p className="text-[#a0a0a0] text-base lg:text-lg leading-relaxed mb-8">
                Slick Style, 15 yılı aşkın deneyimiyle erkekler için premium berber hizmeti
                sunan lider bir kuruluştur. Modern teknikler ve geleneksel ustalığın mükemmel
                birleşimini sağlayan ekibimiz, her müşteriye özel bir deneyim sunmayı
                hedeflemektedir.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                    className="bg-[#0a0a0a] p-4 border border-[rgba(255,255,255,0.06)]"
                  >
                    <div className="text-3xl font-bold text-[#e87d2f] mb-1">
                      {stat.isDecimal ? (
                        <span>{isInView ? "4.9" : "0"}</span>
                      ) : (
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                      )}
                    </div>
                    <div className="text-[#a0a0a0] text-sm uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── PRODUCTS — PINTEREST / MASONRY STYLE —────────────────── */

const products = [
  {
    name: "Sakal Yağı",
    desc: "Doğal argan yağı ile besleyici sakal yağı. Sakal köklerini güçlendirir, yumuşaklık ve parlaklık kazandırır.",
    price: "$25",
    image: "/product-1.png",
    height: "h-[350px] sm:h-[420px]",
    tag: "Çok Satan",
  },
  {
    name: "Saç Şekillendirme Kremi",
    desc: "Profesyonel mat görünüm sağlayan şekillendirme kremi. Gün boyu kalıcı tutuş.",
    price: "$18",
    image: "/product-2.png",
    height: "h-[280px] sm:h-[350px]",
    tag: "",
  },
  {
    name: "Tıraş Sonrası Losyon",
    desc: "Yatıştırıcı ve ferahlatıcı etki. Aloe vera ve mentol içeren formül.",
    price: "$22",
    image: "/product-3.png",
    height: "h-[320px] sm:h-[400px]",
    tag: "Yeni",
  },
  {
    name: "Premium Şampuan",
    desc: "Derin temizlik ve saç derisi bakımı. Doğal aktif maddelerle formüle edilmiş.",
    price: "$20",
    image: "/product-4.png",
    height: "h-[300px] sm:h-[370px]",
    tag: "",
  },
  {
    name: "Saç Wax",
    desc: "Güçlü tutuş, doğal parlaklık. Tüm saç tipleri için uygun profesyonel wax.",
    price: "$24",
    image: "/product-5.png",
    height: "h-[340px] sm:h-[410px]",
    tag: "Premium",
  },
];

function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="urunler" className="relative py-24 lg:py-32" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <RevealText className="text-center mb-16">
          <span className="text-[#e87d2f] uppercase tracking-[0.3em] text-sm font-medium">
            Ürünlerimiz
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4">
            Bakım Ürünleri
          </h2>
          <div className="w-20 h-1 bg-[#e87d2f] mx-auto mb-4" />
          <p className="text-[#a0a0a0] text-lg max-w-md mx-auto">Premium Kalite</p>
        </RevealText>

        {/* Pinterest-style masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {products.map((product, idx) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="break-inside-avoid group cursor-pointer"
            >
              <div className={`relative ${product.height} overflow-hidden rounded-sm bg-[#1a1a1a] border border-[rgba(255,255,255,0.06)] transition-all duration-500 hover:border-[#e87d2f]/30 hover:shadow-[0_0_30px_rgba(232,125,47,0.1)]`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Tag */}
                {product.tag && (
                  <div className="absolute top-4 left-4 bg-[#e87d2f] text-white text-[10px] uppercase tracking-widest px-3 py-1 font-medium">
                    {product.tag}
                  </div>
                )}

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-lg font-bold uppercase mb-1 text-white group-hover:text-[#e87d2f] transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-[#a0a0a0] text-xs leading-relaxed mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-20 overflow-hidden">
                    {product.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#e87d2f] text-xl font-bold">{product.price}</span>
                    <motion.div
                      className="w-8 h-8 bg-[#e87d2f] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                    >
                      <ChevronRight className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── MARQUEE BANNER 3 ─────────────────── */
function MarqueeSection3() {
  return (
    <MarqueeBanner text="★ 4.9 PUAN ★ 10.000+ MUTLU MÜŞTERİ ★ 15+ YIL DENEYİM ★ PREMIUM KALITE ★" speed={20} />
  );
}

/* ─────────────────── GALLERY — VERTICAL SCROLL SNAP WITH STYLE SWITCHER ─────────────────── */

const galleryStyles = ["Kesim", "Sakal", "Styling", "Dönüşüm"];
const galleryItems = [
  { src: "/gallery-1.png", alt: "Modern fade kesim", style: "Kesim" },
  { src: "/gallery-2.png", alt: "Sakal şekillendirme", style: "Sakal" },
  { src: "/gallery-3.png", alt: "Klasik tıraş", style: "Styling" },
  { src: "/gallery-4.png", alt: "Dönüşüm öncesi", style: "Dönüşüm" },
  { src: "/gallery-5.png", alt: "Saç modeli", style: "Kesim" },
  { src: "/products.png", alt: "Styling çalışması", style: "Styling" },
];

function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStyle, setActiveStyle] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveStyle((prev) => (prev + 1) % galleryStyles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const filtered = galleryItems.filter((item) => item.style === galleryStyles[activeStyle]);

  return (
    <section id="galeri" className="relative py-24 lg:py-32" style={{ backgroundColor: "#111111" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <RevealText className="text-center mb-12">
          <span className="text-[#e87d2f] uppercase tracking-[0.3em] text-sm font-medium">
            Çalışmalarımız
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4">
            Dönüşüm Galerisi
          </h2>
          <div className="w-20 h-1 bg-[#e87d2f] mx-auto" />
        </RevealText>

        {/* Vertical style switcher — pills on left side */}
        <RevealText delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Style tabs */}
            <div className="flex sm:flex-col gap-2 justify-center sm:justify-start flex-shrink-0">
              {galleryStyles.map((style, idx) => (
                <button
                  key={style}
                  onClick={() => { setActiveStyle(idx); setIsAutoPlay(false); }}
                  className={`relative px-5 py-2.5 text-sm uppercase tracking-wider transition-all duration-300 rounded-sm whitespace-nowrap ${
                    activeStyle === idx
                      ? "bg-[#e87d2f] text-white shadow-[0_0_20px_rgba(232,125,47,0.3)]"
                      : "text-[#a0a0a0] hover:text-white hover:bg-[#1a1a1a]"
                  }`}
                >
                  {style}
                  {activeStyle === idx && (
                    <motion.div
                      layoutId="galleryIndicator"
                      className="absolute inset-0 bg-[#e87d2f] rounded-sm -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="text-[#a0a0a0] hover:text-[#e87d2f] text-xs uppercase tracking-wider mt-1 transition-colors"
              >
                {isAutoPlay ? "⏸ Durdur" : "▶ Oynat"}
              </button>
            </div>

            {/* Gallery grid */}
            <div className="flex-1" ref={scrollRef}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStyle}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-2 gap-3"
                >
                  {filtered.map((img, idx) => (
                    <motion.div
                      key={img.src}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className={`relative overflow-hidden rounded-sm group cursor-pointer ${
                        idx === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/50 transition-all duration-300 flex items-center justify-center">
                        <ZoomIn className="w-10 h-10 text-[#e87d2f] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xs uppercase tracking-wider">{img.alt}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </RevealText>
      </div>
    </section>
  );
}

/* ─────────────────── BLOG — DETAILED, NO "READ MORE" BUTTON ─────────────────── */

const blogPosts = [
  {
    image: "/blog-1.png",
    title: "Sakal Bakımının Sırları",
    date: "15 Ocak 2024",
    category: "Bakım",
    author: "Ahmet Usta",
    readTime: "5 dk",
    content:
      "Sakal bakımı sadece düzgün bir görünüm için değil, sağlıklı sakal büyümesi için de kritik öneme sahiptir. Doğal yağlar kullanarak sakal köklerini beslemek, düzenli tıraş ile şekil vermek ve nemlendirici kremlerle yumuşaklık sağlamak temel adımlardandır. Argan yağı, jojoba yağı ve hindistan cevizi yağı en etkili doğal bakım ürünleridir. Günde 2 kez uygulanan sakal yağı, 2 hafta içinde belirgin bir iyileşme sağlar. Sıcak havlu uygulaması ile kan dolaşımını hızlandırarak sakal büyümesini teşvik edebilirsiniz.",
  },
  {
    image: "/blog-2.png",
    title: "2024 Erkek Saç Trendleri",
    date: "10 Ocak 2024",
    category: "Trend",
    author: "Mehmet Usta",
    readTime: "4 dk",
    content:
      "Bu yılın en popüler saç modelleri arasında textured crop, modern mullet ve curtain bangs öne çıkıyor. Fade kesimler hâlâ çok popüler ancak daha doğal, geçişli kombinasyonlar tercih ediliyor. Saç sakal uyumu da önemli bir trend — sakal ve saç arasında doğal bir geçiş sağlayan modeller özellikle ilgi görüyor. Mat bitişli şekillendirme ürünleri, parlak görünümlere göre çok daha popüler. Doğal saç dokusunu koruyan, aşırı şekillendirilmemiş stiller bu yılın ana teması.",
  },
  {
    image: "/blog-3.png",
    title: "Doğru Tıraş Teknikleri",
    date: "5 Ocak 2024",
    category: "Rehber",
    author: "Emre Usta",
    readTime: "6 dk",
    content:
      "Cildinize zarar vermeden profesyonel tıraş yapmak için dikkat etmeniz gereken birkaç önemli nokta var. Öncelikle sıcak su veya havlu ile cildinizi yumuşatın — bu adım tıraş bıçağının daha rahat kaymasını sağlar. Tıraş kremi veya köpüğünü 2 dakika bekletin, bu süre zarfında cilt nemlenir. Bıçağı tüy büyüme yönünde kullanın, karşı yöne doğru tıraş etmek batık tüy oluşumuna neden olabilir. Tıraş sonrası alkol içermeyen bir losyon ile cildinizi yatıştırın ve nemlendirin.",
  },
];

function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="relative py-24 lg:py-32" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <RevealText className="text-center mb-16">
          <span className="text-[#e87d2f] uppercase tracking-[0.3em] text-sm font-medium">
            Blog
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4">
            Son Yazılar
          </h2>
          <div className="w-20 h-1 bg-[#e87d2f] mx-auto" />
        </RevealText>

        <div className="space-y-8">
          {blogPosts.map((post, idx) => (
            <RevealText key={post.title} delay={0.1 * idx}>
              <motion.article
                whileHover={{ y: -4 }}
                className="group bg-[#1a1a1a] border border-[rgba(255,255,255,0.06)] overflow-hidden transition-all duration-500 hover:border-[#e87d2f]/20 hover:shadow-[0_0_30px_rgba(232,125,47,0.08)] cursor-pointer"
              >
                <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr]">
                  {/* Image */}
                  <div className="relative h-[200px] md:h-full min-h-[250px] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1a1a]/30 hidden md:block" />
                    <span className="absolute top-4 left-4 bg-[#e87d2f] text-white text-[10px] uppercase tracking-widest px-3 py-1 font-medium">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-[#a0a0a0] text-xs mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" /> {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold uppercase mb-4 group-hover:text-[#e87d2f] transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-[#a0a0a0] text-sm leading-relaxed">
                      {post.content}
                    </p>
                  </div>
                </div>
              </motion.article>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── TESTIMONIALS — SCROLLING CAROUSEL ─────────────────── */

const testimonials = [
  { text: "Slick Style'da aldığım hizmet gerçekten mükemmeldi. Berberler çok uzman ve ilgililer. Kesinlikle tavsiye ederim!", name: "Ahmet Yılmaz", role: "Müşteri" },
  { text: "10 yıldır düzenli müşterisiyim. Hiç bir zaman hayal kırıklığına uğramadım.", name: "Mehmet Kaya", role: "Sadık Müşteri" },
  { text: "Sakal tıraşı için harika bir yer. Hijyen, kalite ve profesyonellik bir arada.", name: "Emre Demir", role: "Müşteri" },
  { text: "Atmosfer çok güzel, personel çok ilgili. Her geldiğimde kendimi özel hissediyorum!", name: "Can Öztürk", role: "Müşteri" },
  { text: "Modern bir ortamda geleneksel berber deneyimi yaşadım. Tek kelimeyle muhteşem.", name: "Burak Şahin", role: "Yeni Müşteri" },
  { text: "Saç tedavisi hizmeti inanılmazdı. Saçlarım eskisinden çok daha sağlıklı.", name: "Ali Çelik", role: "Müşteri" },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#111111" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <RevealText className="text-center mb-16">
          <span className="text-[#e87d2f] uppercase tracking-[0.3em] text-sm font-medium">Yorumlar</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4">Müşteri Yorumları</h2>
          <div className="w-20 h-1 bg-[#e87d2f] mx-auto" />
        </RevealText>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#111111] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#111111] to-transparent z-10" />
        <div className="overflow-hidden">
          <div className="animate-scroll-left flex gap-6 w-max py-4">
            {doubled.map((t, idx) => (
              <div key={`${t.name}-${idx}`} className="w-[340px] sm:w-[400px] flex-shrink-0 bg-[#1a1a1a] border border-[rgba(255,255,255,0.06)] p-6 hover:border-[#e87d2f]/20 transition-colors duration-300">
                <Quote className="w-8 h-8 text-[#e87d2f]/30 mb-4" />
                <p className="text-[#a0a0a0] text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#e87d2f] text-[#e87d2f]" />
                  ))}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-[#a0a0a0] text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── MARQUEE BANNER 4 ─────────────────── */
function MarqueeSection4() {
  return (
    <MarqueeBanner text="WHATSAPP İLE RANDEVU • HEMEN ARAYIN • ONLINE SİPARİŞ • GMAIL İLETİŞİM •" speed={22} />
  );
}

/* ─────────────────── APPOINTMENT — DETAILED FORM + WHATSAPP + GMAIL ─────────────────── */

function AppointmentSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const whatsappMessage = encodeURIComponent(
    `Merhaba, randevu almak istiyorum.\nAd: ${formData.name || "..."}\nTelefon: ${formData.phone || "..."}\nHizmet: ${formData.service || "..."}\nTarih: ${formData.date || "..."}\nSaat: ${formData.time || "..."}`
  );
  const gmailSubject = encodeURIComponent("Randevu Talebi - Slick Style");
  const gmailBody = encodeURIComponent(
    `Merhaba Slick Style Ekibi,\n\nRandevu almak istiyorum:\n\nAd Soyad: ${formData.name || "..."}\nTelefon: ${formData.phone || "..."}\nHizmet: ${formData.service || "..."}\nTarih: ${formData.date || "..."}\nSaat: ${formData.time || "..."}\nNot: ${formData.note || "..."}\n\nTeşekkürler!`
  );

  return (
    <section id="randevu" className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#e87d2f]/5 via-transparent to-[#e87d2f]/5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e87d2f]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e87d2f]/20 to-transparent" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 left-[10%] opacity-[0.03]"
      >
        <Scissors className="w-40 h-40 text-[#e87d2f]" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <RevealText className="text-center mb-12">
          <span className="text-[#e87d2f] uppercase tracking-[0.3em] text-sm font-medium">Randevu</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4">
            Hemen <span className="text-gradient-orange">Randevu</span> Alın
          </h2>
          <p className="text-[#a0a0a0] text-lg max-w-2xl mx-auto">
            Uzman berberlerimizden profesyonel hizmet almak için formu doldurun veya doğrudan bize ulaşın.
          </p>
        </RevealText>

        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Form */}
          <RevealText delay={0.2}>
            <form onSubmit={handleSubmit} className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.06)] p-6 lg:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#a0a0a0] mb-2 block">
                    <User className="w-3 h-3 inline mr-1" /> Ad Soyad
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Adınızı girin"
                    className="w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.08)] text-white px-4 py-3 text-sm focus:border-[#e87d2f] focus:outline-none transition-colors placeholder:text-[#555]"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#a0a0a0] mb-2 block">
                    <Phone className="w-3 h-3 inline mr-1" /> Telefon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05XX XXX XX XX"
                    className="w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.08)] text-white px-4 py-3 text-sm focus:border-[#e87d2f] focus:outline-none transition-colors placeholder:text-[#555]"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-[#a0a0a0] mb-2 block">
                  <Scissors className="w-3 h-3 inline mr-1" /> Hizmet
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.08)] text-white px-4 py-3 text-sm focus:border-[#e87d2f] focus:outline-none transition-colors appearance-none"
                >
                  <option value="">Hizmet seçin...</option>
                  {services.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name} - {s.price}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#a0a0a0] mb-2 block">
                    <Calendar className="w-3 h-3 inline mr-1" /> Tarih
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.08)] text-white px-4 py-3 text-sm focus:border-[#e87d2f] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#a0a0a0] mb-2 block">
                    <Clock className="w-3 h-3 inline mr-1" /> Saat
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.08)] text-white px-4 py-3 text-sm focus:border-[#e87d2f] focus:outline-none transition-colors appearance-none"
                  >
                    <option value="">Saat seçin...</option>
                    {["09:00","09:30","10:00","10:30","11:00","11:30","12:00","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-[#a0a0a0] mb-2 block">
                  <MessageSquare className="w-3 h-3 inline mr-1" /> Not (İsteğe Bağlı)
                </label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Özel isteklerinizi belirtin..."
                  rows={3}
                  className="w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.08)] text-white px-4 py-3 text-sm focus:border-[#e87d2f] focus:outline-none transition-colors resize-none placeholder:text-[#555]"
                />
              </div>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 text-sm text-center"
                  >
                    ✓ Randevu talebiniz alındı! En kısa sürede size ulaşacağız.
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                className="w-full bg-[#e87d2f] hover:bg-[#f5a623] text-white font-semibold uppercase tracking-wider py-4 rounded-none transition-all duration-300 hover:shadow-[0_0_20px_rgba(232,125,47,0.4)]"
              >
                <Send className="w-4 h-4 mr-2" /> Randevu Gönder
              </Button>
            </form>
          </RevealText>

          {/* Sidebar - Quick Contact */}
          <RevealText delay={0.4}>
            <div className="space-y-4">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/905551234567?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#25D366] text-white p-5 cursor-pointer hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] transition-shadow duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    <span className="font-bold uppercase tracking-wider">WhatsApp</span>
                  </div>
                  <p className="text-white/80 text-xs">Anında randevu alın, hızlı iletişim</p>
                </motion.div>
              </a>

              {/* Gmail */}
              <a
                href={`mailto:slickstyle@gmail.com?subject=${gmailSubject}&body=${gmailBody}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-r from-[#e87d2f] to-[#f5a623] text-white p-5 cursor-pointer hover:shadow-[0_0_20px_rgba(232,125,47,0.3)] transition-shadow duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-6 h-6" />
                    <span className="font-bold uppercase tracking-wider">E-Posta</span>
                  </div>
                  <p className="text-white/80 text-xs">slickstyle@gmail.com</p>
                </motion.div>
              </a>

              {/* Phone */}
              <a href="tel:+905551234567">
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] text-white p-5 cursor-pointer hover:border-[#e87d2f]/30 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-6 h-6 text-[#e87d2f]" />
                    <span className="font-bold uppercase tracking-wider">Ara</span>
                  </div>
                  <p className="text-[#a0a0a0] text-xs">0555 123 45 67</p>
                </motion.div>
              </a>

              {/* Hours */}
              <div className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.06)] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-[#e87d2f]" />
                  <span className="font-bold uppercase tracking-wider text-sm">Çalışma Saatleri</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#a0a0a0]">Pazartesi - Cumartesi</span>
                    <span className="text-white font-medium">09:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a0a0a0]">Pazar</span>
                    <span className="text-red-400 font-medium">Kapalı</span>
                  </div>
                </div>
              </div>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── CONTACT — UNIQUE STYLE ─────────────────── */

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="iletisim"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <RevealText className="text-center mb-16">
          <span className="text-[#e87d2f] uppercase tracking-[0.3em] text-sm font-medium">İletişim</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4">
            Bize <span className="text-gradient-orange">Ulaşın</span>
          </h2>
          <div className="w-20 h-1 bg-[#e87d2f] mx-auto" />
        </RevealText>

        {/* Unique card design */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Address card */}
          <RevealText delay={0.1}>
            <motion.div
              whileHover={{ y: -6, borderColor: "rgba(232,125,47,0.3)" }}
              className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] p-8 transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e87d2f] to-[#f5a623] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <MapPin className="w-10 h-10 text-[#e87d2f] mb-4" />
              <h3 className="text-lg font-bold uppercase mb-3">Adres</h3>
              <p className="text-[#a0a0a0] text-sm leading-relaxed">
                Atatürk Cad. No: 42<br />
                Kadıköy, İstanbul
              </p>
              <div className="mt-4 text-[#e87d2f] text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Google Maps'te Aç →
              </div>
            </motion.div>
          </RevealText>

          {/* Phone card */}
          <RevealText delay={0.2}>
            <motion.div
              whileHover={{ y: -6, borderColor: "rgba(232,125,47,0.3)" }}
              className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] p-8 transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e87d2f] to-[#f5a623] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <Phone className="w-10 h-10 text-[#e87d2f] mb-4" />
              <h3 className="text-lg font-bold uppercase mb-3">Telefon</h3>
              <p className="text-[#a0a0a0] text-sm leading-relaxed">
                +90 555 123 45 67<br />
                +90 216 345 67 89
              </p>
              <div className="mt-4 text-[#e87d2f] text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Hemen Ara →
              </div>
            </motion.div>
          </RevealText>

          {/* Email card */}
          <RevealText delay={0.3}>
            <motion.div
              whileHover={{ y: -6, borderColor: "rgba(232,125,47,0.3)" }}
              className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] p-8 transition-all duration-300 group cursor-pointer relative overflow-hidden sm:col-span-2 lg:col-span-1"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e87d2f] to-[#f5a623] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <Mail className="w-10 h-10 text-[#e87d2f] mb-4" />
              <h3 className="text-lg font-bold uppercase mb-3">E-Posta</h3>
              <p className="text-[#a0a0a0] text-sm leading-relaxed">
                slickstyle@gmail.com<br />
                info@slickstyle.com
              </p>
              <div className="mt-4 text-[#e87d2f] text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                E-Posta Gönder →
              </div>
            </motion.div>
          </RevealText>
        </div>

        {/* Social links */}
        <RevealText delay={0.4}>
          <div className="flex justify-center gap-4 mt-12">
            {[
              { icon: Instagram, label: "Instagram", href: "#" },
              { icon: Facebook, label: "Facebook", href: "#" },
              { icon: Mail, label: "Gmail", href: "#" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-[#0a0a0a] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#a0a0a0] hover:text-[#e87d2f] hover:border-[#e87d2f]/30 transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </RevealText>
      </div>
    </section>
  );
}

/* ─────────────────── FOOTER ─────────────────── */

function Footer() {
  return (
    <footer className="relative mt-auto" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e87d2f]/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <a href="#anasayfa" className="flex items-center gap-2 mb-4">
              <Scissors className="w-5 h-5 text-[#e87d2f]" />
              <span className="text-lg font-bold uppercase tracking-wider">
                Slick <span className="text-[#e87d2f]">Style</span>
              </span>
            </a>
            <p className="text-[#a0a0a0] text-sm leading-relaxed">
              Erkekler için premium berber hizmeti. 15 yılı aşkın deneyim ile modern ve profesyonel bakım deneyimi sunuyoruz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Hızlı Bağlantılar</h4>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-[#a0a0a0] text-sm hover:text-[#e87d2f] transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">İletişim</h4>
            <div className="space-y-3 text-[#a0a0a0] text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#e87d2f] mt-0.5 flex-shrink-0" />
                <span>Atatürk Cad. No: 42, Kadıköy, İstanbul</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#e87d2f] flex-shrink-0" />
                <span>0555 123 45 67</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#e87d2f] flex-shrink-0" />
                <span>slickstyle@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Çalışma Saatleri</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#a0a0a0]">Pzt - Cmt</span>
                <span className="text-white">09:00 - 20:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a0a0a0]">Pazar</span>
                <span className="text-red-400">Kapalı</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#a0a0a0] text-xs">
            © 2024 Slick Style. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4">
            {[Instagram, Facebook, Mail].map((Icon, i) => (
              <a key={i} href="#" className="text-[#a0a0a0] hover:text-[#e87d2f] transition-colors duration-300">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────── SCROLL TO TOP ─────────────────── */

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#e87d2f] text-white flex items-center justify-center shadow-[0_0_20px_rgba(232,125,47,0.3)] hover:bg-[#f5a623] transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────── MAIN PAGE ─────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0a0a0a" }}>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <MarqueeSection1 />
        <ServicesSection />
        <MarqueeSection2 />
        <AboutSection />
        <ProductsSection />
        <MarqueeSection3 />
        <GallerySection />
        <BlogSection />
        <MarqueeSection4 />
        <TestimonialsSection />
        <AppointmentSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
