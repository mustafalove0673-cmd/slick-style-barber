"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  Play,
  Pause,
} from "lucide-react";

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
    <div className="overflow-hidden whitespace-nowrap border-y border-[rgba(255,255,255,0.06)] py-3" style={{ backgroundColor: "#0e0e0e" }}>
      <motion.div
        className="flex gap-12 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((t, i) => (
          <span
            key={i}
            className="uppercase tracking-[0.3em] text-sm flex items-center gap-4"
            style={{ color: "rgba(119,119,119,0.3)" }}
          >
            <span>{t}</span>
            <Scissors className="w-3 h-3" style={{ color: "rgba(201,169,110,0.3)" }} />
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

function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 6 + 6,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: "rgba(201,169,110,0.4)",
          }}
          animate={{
            y: [-20, -60, -30],
            x: [-10, 15, -5],
            opacity: [0.2, 0.7, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

const navLinks = [
  { label: "Anasayfa", href: "#anasayfa", icon: Award, desc: "Ana sayfaya dön" },
  { label: "Hizmetler", href: "#hizmetler", icon: Scissors, desc: "Hizmetlerimizi keşfedin" },
  { label: "Ürünler", href: "#urunler", icon: Gem, desc: "Premium bakım ürünleri" },
  { label: "Galeri", href: "#galeri", icon: ZoomIn, desc: "Çalışmalarımız" },
  { label: "Blog", href: "#blog", icon: Hash, desc: "Son yazılarımız" },
  { label: "İletişim", href: "#iletisim", icon: Mail, desc: "Bize ulaşın" },
];

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-7 h-5 relative flex flex-col justify-between">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 8, width: 28 } : { rotate: 0, y: 0, width: 28 }}
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
        className="block h-[2px] origin-left rounded-full"
        style={{ backgroundColor: "#c9a96e" }}
      />
      <motion.span
        animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        className="block h-[2px] rounded-full"
        style={{ width: 20, backgroundColor: "#c9a96e" }}
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8, width: 28 } : { rotate: 0, y: 0, width: 14 }}
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
        className="block h-[2px] origin-left rounded-full ml-auto"
        style={{ backgroundColor: "#c9a96e" }}
      />
    </div>
  );
}

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
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          scrolled ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100"
        }`}
      >
        <div style={{ backgroundColor: "#c9a96e" }} className="text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-1.5">
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="tel:+901234567890" className="flex items-center gap-1.5 text-[11px] sm:text-xs tracking-wide hover:opacity-80 transition-opacity">
                <Phone className="w-3 h-3" />
                <span>+90 123 456 78 90</span>
              </a>
              <a href="mailto:info@slickstyle.com" className="hidden sm:flex items-center gap-1.5 text-[11px] sm:text-xs tracking-wide hover:opacity-80 transition-opacity">
                <Mail className="w-3 h-3" />
                <span>info@slickstyle.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:flex items-center gap-1.5 text-[11px] sm:text-xs tracking-wide">
                <Clock className="w-3 h-3" />
                Pzt - Cmt: 09:00 - 21:00
              </span>
              <div className="flex items-center gap-2 ml-2">
                <a href="#" className="hover:opacity-80 transition-opacity"><Instagram className="w-3.5 h-3.5" /></a>
                <a href="#" className="hover:opacity-80 transition-opacity"><Facebook className="w-3.5 h-3.5" /></a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "top-0 bg-[#090909]/85 backdrop-blur-2xl border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "top-[32px] bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-22">
            <a href="#anasayfa" className="flex items-center gap-3 group relative">
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="relative w-11 h-11 flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed rounded-full"
                  style={{ borderColor: "rgba(201,169,110,0.4)" }}
                />
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(to bottom right, #c9a96e, #a88942)", boxShadow: "0 0 20px rgba(201,169,110,0.3)" }}>
                  <Scissors className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
                </div>
              </motion.div>
              <div className="flex flex-col leading-none">
                <span className="text-lg lg:text-xl font-extrabold uppercase tracking-[0.15em] text-white group-hover:text-[#c9a96e] transition-colors duration-300">
                  Slick
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-medium -mt-0.5" style={{ color: "#c9a96e" }}>
                  S t y l e
                </span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: scrolled ? 0 : 30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden sm:block h-[2px] ml-2"
                style={{ background: "linear-gradient(to right, #c9a96e, transparent)" }}
              />
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-[13px] uppercase tracking-[0.15em] font-medium hover:text-white transition-colors duration-300 group"
                  style={{ color: "#777" }}
                >
                  <span className="relative z-10">{link.label}</span>
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: "rgba(201,169,110,0.1)" }}
                  />
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full group-hover:w-5 transition-all duration-300" style={{ backgroundColor: "#c9a96e" }} />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <motion.a
                href="#randevu"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden sm:flex items-center gap-2 text-white font-bold uppercase tracking-[0.12em] text-[12px] px-5 py-2.5 relative overflow-hidden group"
                style={{ background: "linear-gradient(to right, #c9a96e, #a88942)" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                />
                <Calendar className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">Randevu</span>
              </motion.a>

              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm"
                aria-label="Toggle menu"
              >
                <HamburgerIcon isOpen={mobileOpen} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-md lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[56] w-full max-w-md lg:hidden"
              style={{ backgroundColor: "#090909" }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(to bottom right, #c9a96e, #a88942)" }}>
                      <Scissors className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-[0.15em] text-white">Menü</span>
                  </div>
                  <motion.button
                    onClick={() => setMobileOpen(false)}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 flex items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(201,169,110,0.1)" }}
                  >
                    <X className="w-4 h-4" style={{ color: "#c9a96e" }} />
                  </motion.button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <div className="p-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="rounded-xl p-6 mb-6 border"
                      style={{ backgroundColor: "rgba(201,169,110,0.08)", borderColor: "rgba(201,169,110,0.2)" }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #c9a96e, #a88942)" }}>
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm uppercase tracking-wider">Randevu Al</div>
                          <div className="text-xs" style={{ color: "#777" }}>Hemen online randevu</div>
                        </div>
                      </div>
                      <a
                        href="#randevu"
                        onClick={() => setMobileOpen(false)}
                        className="block w-full text-center py-3 rounded-lg font-bold uppercase tracking-wider text-sm text-white"
                        style={{ background: "linear-gradient(to right, #c9a96e, #a88942)" }}
                      >
                        Hemen Rezerve Et
                      </a>
                    </motion.div>
                  </div>

                  <div className="px-6 space-y-1">
                    {navLinks.map((link, i) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.07, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.02)" }}>
                          <link.icon className="w-5 h-5" style={{ color: "#c9a96e" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold uppercase tracking-[0.08em] text-white group-hover:text-[#c9a96e] transition-colors text-sm">
                            {link.label}
                          </div>
                          <div className="text-xs truncate" style={{ color: "#777" }}>
                            {link.desc}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#c9a96e" }} />
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="p-6 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center justify-center gap-4">
                    <a href="#" className="w-10 h-10 rounded-full border flex items-center justify-center hover:border-[#c9a96e]/50 hover:bg-[#c9a96e]/10 transition-all duration-300" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                      <Instagram className="w-4 h-4" style={{ color: "#777" }} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full border flex items-center justify-center hover:border-[#c9a96e]/50 hover:bg-[#c9a96e]/10 transition-all duration-300" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                      <Facebook className="w-4 h-4" style={{ color: "#777" }} />
                    </a>
                    <a href="tel:+901234567890" className="w-10 h-10 rounded-full border flex items-center justify-center hover:border-[#c9a96e]/50 hover:bg-[#c9a96e]/10 transition-all duration-300" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                      <Phone className="w-4 h-4" style={{ color: "#777" }} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

const heroStats = [
  { value: 15, suffix: "+", label: "Yıl Deneyim" },
  { value: 10000, suffix: "+", label: "Mutlu Müşteri" },
  { value: 5, suffix: "", label: "Uzman Berber" },
  { value: 49, suffix: "", label: "Puan (x10)", isDecimal: true },
];

function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      id="anasayfa"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#090909" }}
    >
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(201,169,110,0.03) 0%, transparent 70%)" }} />
      <FloatingParticles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">
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
                className="h-[2px]"
                style={{ backgroundColor: "#c9a96e" }}
              />
              <span className="uppercase tracking-[0.3em] text-sm font-medium" style={{ color: "#c9a96e" }}>
                Hoş Geldiniz
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-tight mb-6" style={{ color: "#f0f0f0" }}>
              {"Profesyonel Berber Hizmeti"
                .split("")
                .map((char, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.03, delay: 0.5 + idx * 0.015 }}
                    className="inline-block"
                    style={char === " " ? { width: "0.3em" } : {}}
                  >
                    {char === "B" || char === "H" || char === "i" || char === "m" || char === "e" ? (
                      <span className="text-gradient-gold">{char}</span>
                    ) : (
                      char
                    )}
                  </motion.span>
                ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-lg lg:text-xl mb-8 max-w-lg leading-relaxed"
              style={{ color: "#777" }}
            >
              Erkekler için premium bakım deneyimi. Uzman ellerde, modern tarzda.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="flex flex-wrap items-center gap-6"
            >
              <a href="#randevu" className="group flex items-center gap-2 text-sm uppercase tracking-wider font-semibold transition-colors duration-300" style={{ color: "#c9a96e" }}>
                Randevu Al
                <motion.div
                  className="inline-block"
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </a>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
              <a href="#hizmetler" className="group flex items-center gap-2 text-sm uppercase tracking-wider font-semibold transition-colors duration-300 hover:text-white" style={{ color: "#777" }}>
                Hizmetlerimiz
                <motion.div
                  className="inline-block"
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </a>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: y2, opacity }} className="relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div className="relative w-[300px] h-[400px] sm:w-[380px] sm:h-[500px] lg:w-[500px] lg:h-[600px] overflow-hidden" style={{ clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)" }}>
                <Image
                  src="/barber-hero.png"
                  alt="Profesyonel berber"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #090909, transparent 50%)" }} />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -bottom-4 -left-4 text-white p-4 rounded-sm"
                style={{ backgroundColor: "#c9a96e" }}
              >
                <div className="text-2xl font-bold">15+</div>
                <div className="text-xs uppercase tracking-wider">Yıl Deneyim</div>
              </motion.div>
              <div className="absolute top-4 left-4 w-20 h-20 border-t-2 border-l-2 rounded-tl-sm" style={{ borderColor: "rgba(201,169,110,0.4)" }} />
              <div className="absolute bottom-4 right-4 w-20 h-20 border-b-2 border-r-2 rounded-br-sm" style={{ borderColor: "rgba(201,169,110,0.4)" }} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="grid grid-cols-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(9,9,9,0.8)", backdropFilter: "blur(20px)" }}>
          {heroStats.map((stat, idx) => (
            <div key={stat.label} className={`text-center py-5 border-r ${idx === 3 ? "border-r-0" : ""}`} style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="text-xl sm:text-2xl font-bold" style={{ color: "#c9a96e" }}>
                {stat.isDecimal ? "4.9" : <AnimatedCounter target={stat.value} suffix={stat.suffix} />}
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-wider mt-1" style={{ color: "#777" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function MarqueeSection1() {
  return (
    <MarqueeBanner text="SLICK STYLE • PROFESYONEL BERBER • PREMIUM BAKIM • MODERN TARZ • ERKEK GROOMING •" speed={25} />
  );
}

const services = [
  {
    icon: Scissors,
    name: "Saç Kesimi",
    desc: "Modern fade, klasik kesim ve özel tasarım teknikleri ile yüz hatlarınıza en uygun saç modelini birlikte belirliyoruz.",
    price: "$30",
    duration: "45 dk",
    tag: "En Popüler",
  },
  {
    icon: Crown,
    name: "Sakal Tıraşı",
    desc: "Sakalınızın doğal formunu koruyarak, profesyonel araçlar ve tekniklerle düzgün, bakımlı bir görünüm sağlıyoruz.",
    price: "$15",
    duration: "30 dk",
    tag: "",
  },
  {
    icon: Sparkles,
    name: "Cilt Bakımı",
    desc: "Derin temizlik, nemlendirme ve canlandırma işlemlerini kapsayan profesyonel cilt bakımı.",
    price: "$40",
    duration: "60 dk",
    tag: "Premium",
  },
  {
    icon: Flame,
    name: "Saç Şekillendirme",
    desc: "Saç tipinize uygun profesyonel şekillendirme ürünleri ve teknikleriyle gün boyu kalıcı stiller oluşturuyoruz.",
    price: "$25",
    duration: "30 dk",
    tag: "",
  },
  {
    icon: Droplets,
    name: "Saç Tedavisi",
    desc: "Keratin bakımı, protein tedavisi ve saç derisi masajı ile saç sağlığınızı içten dışa destekliyoruz.",
    price: "$35",
    duration: "50 dk",
    tag: "Yeni",
  },
  {
    icon: Gem,
    name: "Klasik Tıraş",
    desc: "Geleneksel ustura ile sıcak havlu uygulaması. Otantik berber ritüeli yaşayın.",
    price: "$20",
    duration: "40 dk",
    tag: "",
  },
];

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="hizmetler" className="relative py-24 lg:py-32" style={{ backgroundColor: "#090909" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <RevealText>
          <div className="flex items-start gap-6 mb-16">
            <div className="hidden lg:flex flex-col items-center">
              <div className="w-[2px] h-20" style={{ backgroundColor: "#c9a96e" }} />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase mt-3" style={{ color: "#c9a96e", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                SERVICES
              </span>
              <div className="w-[2px] flex-1 mt-3" style={{ backgroundColor: "rgba(201,169,110,0.2)" }} />
            </div>
            <div>
              <span className="uppercase tracking-[0.3em] text-sm font-medium" style={{ color: "#c9a96e" }}>
                Ne Yapıyoruz
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4" style={{ color: "#f0f0f0" }}>
                Hizmetlerimiz
              </h2>
              <p className="text-lg max-w-md" style={{ color: "#777" }}>
                Erkek Bakımının En İyileri
              </p>
            </div>
          </div>
        </RevealText>

        <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
          {services.map((s, idx) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative p-6 lg:p-8 border overflow-hidden transition-all duration-500 cursor-pointer"
              style={{
                backgroundColor: "#121212",
                borderColor: "rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(201,169,110,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="absolute top-0 left-0 w-full h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: "linear-gradient(to right, #c9a96e, #e0c68b)" }} />
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center border" style={{ borderColor: "rgba(201,169,110,0.2)", backgroundColor: "rgba(201,169,110,0.05)" }}>
                  <s.icon className="w-6 h-6" style={{ color: "#c9a96e" }} />
                </div>
                <div className="flex items-center gap-2">
                  {s.tag && (
                    <span className="text-[10px] uppercase tracking-widest px-2 py-1 border" style={{ color: "#c9a96e", borderColor: "rgba(201,169,110,0.3)", backgroundColor: "rgba(201,169,110,0.08)" }}>
                      {s.tag}
                    </span>
                  )}
                  <span className="text-lg font-bold" style={{ color: "#c9a96e" }}>{s.price}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold uppercase mb-2 group-hover:text-[#c9a96e] transition-colors duration-300" style={{ color: "#f0f0f0" }}>
                {s.name}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#777" }}>
                {s.desc}
              </p>
              <div className="flex items-center gap-2 text-xs" style={{ color: "#777" }}>
                <Clock className="w-3.5 h-3.5" style={{ color: "#c9a96e" }} />
                <span>{s.duration}</span>
                <Star className="w-3.5 h-3.5 ml-2" style={{ color: "#c9a96e" }} />
                <span>4.9</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarqueeSection2() {
  return (
    <MarqueeBanner text="SAÇ KESİMİ • SAKAL BAKIMI • CİLT TEDAVİSİ • KLASİK TIRAŞ • ŞEKİLLENDİRME • PREMIUM ÜRÜNLER •" speed={35} />
  );
}

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
    <section className="relative py-24 lg:py-32" style={{ backgroundColor: "#0e0e0e" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <RevealText>
            <div className="relative">
              <motion.div
                initial={{ width: 0, height: 0 }}
                animate={isInView ? { width: "40px", height: "40px" } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute top-0 left-0 border-t-2 border-l-2 rounded-tl-sm z-20"
                style={{ borderColor: "#c9a96e" }}
              />
              <motion.div
                initial={{ width: 0, height: 0 }}
                animate={isInView ? { width: "40px", height: "40px" } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-0 right-0 border-b-2 border-r-2 rounded-br-sm z-20"
                style={{ borderColor: "#c9a96e" }}
              />
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                <Image src="/about.png" alt="Barbershop" fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0e0e0e, transparent 60%)" }} />
              </div>
            </div>
          </RevealText>

          <RevealText delay={0.2}>
            <div className="relative">
              <div className="absolute -left-6 top-0 w-1 h-20 hidden lg:block" style={{ backgroundColor: "#c9a96e" }} />
              <span className="uppercase tracking-[0.3em] text-sm font-medium" style={{ color: "#c9a96e" }}>
                Hakkımızda
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-6" style={{ color: "#f0f0f0" }}>
                Slick Style <span className="text-gradient-gold">Hakkında</span>
              </h2>
              <p className="text-base lg:text-lg leading-relaxed mb-8" style={{ color: "#777" }}>
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
                    className="p-4 border"
                    style={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    <div className="text-3xl font-bold mb-1" style={{ color: "#c9a96e" }}>
                      {stat.isDecimal ? (
                        <span>{isInView ? "4.9" : "0"}</span>
                      ) : (
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                      )}
                    </div>
                    <div className="text-sm uppercase tracking-wider" style={{ color: "#777" }}>
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

const products = [
  {
    name: "Sakal Yağı",
    desc: "Doğal argan yağı ile besleyici sakal yağı. Sakal köklerini güçlendirir, yumuşaklık ve parlaklık kazandırır.",
    price: "$25",
    image: "/product-1.png",
    tag: "Çok Satan",
  },
  {
    name: "Saç Şekillendirme Kremi",
    desc: "Profesyonel mat görünüm sağlayan şekillendirme kremi. Gün boyu kalıcı tutuş.",
    price: "$18",
    image: "/product-2.png",
    tag: "",
  },
  {
    name: "Tıraş Sonrası Losyon",
    desc: "Yatıştırıcı ve ferahlatıcı etki. Aloe vera ve mentol içeren formül.",
    price: "$22",
    image: "/product-3.png",
    tag: "Yeni",
  },
  {
    name: "Premium Şampuan",
    desc: "Derin temizlik ve saç derisi bakımı. Doğal aktif maddelerle formüle edilmiş.",
    price: "$20",
    image: "/product-4.png",
    tag: "",
  },
];

function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="urunler" className="relative py-24 lg:py-32" style={{ backgroundColor: "#090909" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <RevealText className="text-center mb-16">
          <span className="uppercase tracking-[0.3em] text-sm font-medium" style={{ color: "#c9a96e" }}>
            Ürünlerimiz
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4" style={{ color: "#f0f0f0" }}>
            Bakım Ürünleri
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12" style={{ backgroundColor: "rgba(201,169,110,0.3)" }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#c9a96e" }} />
            <div className="h-[1px] w-12" style={{ backgroundColor: "rgba(201,169,110,0.3)" }} />
          </div>
          <p className="text-lg max-w-md mx-auto" style={{ color: "#777" }}>Premium Kalite</p>
        </RevealText>

        <div className="grid sm:grid-cols-2 gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group flex gap-5 border p-4 transition-all duration-500 cursor-pointer overflow-hidden"
              style={{
                backgroundColor: "#121212",
                borderColor: "rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-sm">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {product.tag && (
                  <div className="absolute top-2 left-2 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-medium" style={{ backgroundColor: "#c9a96e" }}>
                    {product.tag}
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <h3 className="text-base font-bold uppercase mb-1 group-hover:text-[#c9a96e] transition-colors duration-300 truncate" style={{ color: "#f0f0f0" }}>
                  {product.name}
                </h3>
                <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: "#777" }}>
                  {product.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold" style={{ color: "#c9a96e" }}>{product.price}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#c9a96e" }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarqueeSection3() {
  return (
    <MarqueeBanner text="★ 4.9 PUAN ★ 10.000+ MUTLU MÜŞTERİ ★ 15+ YIL DENEYİM ★ PREMIUM KALITE ★" speed={20} />
  );
}

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

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveStyle((prev) => (prev + 1) % galleryStyles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const filtered = galleryItems.filter((item) => item.style === galleryStyles[activeStyle]);

  return (
    <section id="galeri" className="relative py-24 lg:py-32" style={{ backgroundColor: "#0e0e0e" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <RevealText className="text-center mb-12">
          <span className="uppercase tracking-[0.3em] text-sm font-medium" style={{ color: "#c9a96e" }}>
            Çalışmalarımız
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4" style={{ color: "#f0f0f0" }}>
            Dönüşüm Galerisi
          </h2>
          <div className="w-20 h-1 mx-auto" style={{ backgroundColor: "#c9a96e" }} />
        </RevealText>

        <RevealText delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="flex sm:flex-col gap-2 justify-center sm:justify-start flex-shrink-0">
              {galleryStyles.map((style, idx) => (
                <button
                  key={style}
                  onClick={() => { setActiveStyle(idx); setIsAutoPlay(false); }}
                  className={`relative px-5 py-2.5 text-sm uppercase tracking-wider transition-all duration-300 rounded-sm whitespace-nowrap ${
                    activeStyle === idx
                      ? "text-white shadow-[0_0_20px_rgba(201,169,110,0.3)]"
                      : ""
                  }`}
                  style={
                    activeStyle === idx
                      ? { backgroundColor: "#c9a96e", color: "#fff" }
                      : { color: "#777" }
                  }
                >
                  {style}
                </button>
              ))}
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="text-xs uppercase tracking-wider mt-1 transition-colors"
                style={{ color: isAutoPlay ? "#c9a96e" : "#777" }}
              >
                {isAutoPlay ? "⏸ Durdur" : "▶ Oynat"}
              </button>
            </div>

            <div className="flex-1">
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
                      <div className="absolute inset-0 bg-[#090909]/0 group-hover:bg-[#090909]/50 transition-all duration-300 flex items-center justify-center">
                        <ZoomIn className="w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "#c9a96e" }} />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(to top, rgba(9,9,9,0.8), transparent)" }}>
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

const blogPosts = [
  {
    image: "/blog-1.png",
    title: "Sakal Bakımının Sırları",
    date: "15 Ocak 2024",
    category: "Bakım",
    author: "Ahmet Usta",
    readTime: "5 dk",
    content: "Sakal bakımı sadece düzgün bir görünüm için değil, sağlıklı sakal büyümesi için de kritik öneme sahiptir. Doğal yağlar kullanarak sakal köklerini beslemek, düzenli tıraş ile şekil vermek ve nemlendirici kremlerle yumuşaklık sağlamak temel adımlardandır.",
  },
  {
    image: "/blog-2.png",
    title: "2024 Erkek Saç Trendleri",
    date: "10 Ocak 2024",
    category: "Trend",
    author: "Mehmet Usta",
    readTime: "4 dk",
    content: "Bu yılın en popüler saç modelleri arasında textured crop, modern mullet ve curtain bangs öne çıkıyor. Fade kesimler hâlâ çok popüler ancak daha doğal geçişli kombinasyonlar tercih ediliyor.",
  },
  {
    image: "/blog-3.png",
    title: "Doğru Tıraş Teknikleri",
    date: "5 Ocak 2024",
    category: "Rehber",
    author: "Emre Usta",
    readTime: "6 dk",
    content: "Cildinize zarar vermeden profesyonel tıraş yapmak için dikkat etmeniz gereken birkaç önemli nokta var. Öncelikle sıcak su veya havlu ile cildinizi yumuşatın.",
  },
];

function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="relative py-24 lg:py-32" style={{ backgroundColor: "#090909" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <RevealText className="text-center mb-16">
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="h-[1px] w-16 sm:w-24" style={{ backgroundColor: "rgba(201,169,110,0.3)" }} />
            <span className="uppercase tracking-[0.3em] text-sm font-medium" style={{ color: "#c9a96e" }}>Blog</span>
            <div className="h-[1px] w-16 sm:w-24" style={{ backgroundColor: "rgba(201,169,110,0.3)" }} />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase" style={{ color: "#f0f0f0" }}>
            Son Yazılar
          </h2>
        </RevealText>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -4 }}
              className="group border overflow-hidden transition-all duration-500 cursor-pointer"
              style={{
                backgroundColor: "#121212",
                borderColor: "rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              <div className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] flex-shrink-0 overflow-hidden rounded-sm">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 border font-medium" style={{ color: "#c9a96e", borderColor: "rgba(201,169,110,0.3)" }}>
                      {post.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold uppercase mt-2 mb-1 group-hover:text-[#c9a96e] transition-colors duration-300 leading-tight" style={{ color: "#f0f0f0" }}>
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[10px]" style={{ color: "#777" }}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#777" }}>
                  {post.content}
                </p>
                <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                  <span className="text-xs" style={{ color: "#777" }}>{post.author}</span>
                  <span className="text-xs uppercase tracking-wider group-hover:text-[#c9a96e] transition-colors" style={{ color: "#555" }}>
                    Devamı →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

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
  const [isPaused, setIsPaused] = useState(false);
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#0e0e0e" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <RevealText className="text-center mb-16">
          <span className="uppercase tracking-[0.3em] text-sm font-medium" style={{ color: "#c9a96e" }}>Yorumlar</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4" style={{ color: "#f0f0f0" }}>Müşteri Yorumları</h2>
          <div className="w-20 h-1 mx-auto" style={{ backgroundColor: "#c9a96e" }} />
          <p className="mt-4 text-sm flex items-center justify-center gap-2" style={{ color: "#777" }}>
            <Pause className="w-3.5 h-3.5" />
            Durdurmak için bir karta tıklayın
          </p>
        </RevealText>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10" style={{ background: "linear-gradient(to right, #0e0e0e, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10" style={{ background: "linear-gradient(to left, #0e0e0e, transparent)" }} />
        <div className="overflow-hidden">
          <div className={`flex gap-6 w-max py-4 ${isPaused ? "animate-scroll-left paused" : "animate-scroll-left"}`} onClick={() => setIsPaused(!isPaused)} style={{ cursor: "pointer" }}>
            {doubled.map((t, idx) => (
              <div key={`${t.name}-${idx}`} className="w-[340px] sm:w-[400px] flex-shrink-0 border p-6 rounded-xl transition-colors duration-300" style={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.06)" }}>
                <Quote className="w-8 h-8 mb-4" style={{ color: "rgba(201,169,110,0.3)" }} />
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#777" }}>&ldquo;{t.text}&rdquo;</p>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4" style={{ fill: "#c9a96e", color: "#c9a96e" }} />
                  ))}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#f0f0f0" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "#777" }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeSection4() {
  return (
    <MarqueeBanner text="WHATSAPP İLE RANDEVU • HEMEN ARAYIN • ONLINE SİPARİŞ • GMAIL İLETİŞİM •" speed={22} />
  );
}

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
    <section id="randevu" className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#090909" }}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(201,169,110,0.03), transparent, rgba(201,169,110,0.03))" }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent)" }} />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 left-[10%] opacity-[0.03]"
      >
        <Scissors className="w-40 h-40" style={{ color: "#c9a96e" }} />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <RevealText className="text-center mb-12">
          <span className="uppercase tracking-[0.3em] text-sm font-medium" style={{ color: "#c9a96e" }}>Randevu</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4" style={{ color: "#f0f0f0" }}>
            Hemen <span className="text-gradient-gold">Randevu</span> Alın
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#777" }}>
            Uzman berberlerimizden profesyonel hizmet almak için formu doldurun veya doğrudan bize ulaşın.
          </p>
        </RevealText>

        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          <RevealText delay={0.2}>
            <form onSubmit={handleSubmit} className="border p-6 lg:p-8 space-y-5" style={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs uppercase tracking-wider mb-2 block" style={{ color: "#777" }}>
                    <User className="w-3 h-3 inline mr-1" /> Ad Soyad
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Adınızı girin"
                    className="w-full border text-white px-4 py-3 text-sm transition-colors placeholder:text-[#555]"
                    style={{ backgroundColor: "#090909", borderColor: "rgba(255,255,255,0.08)" }}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider mb-2 block" style={{ color: "#777" }}>
                    <Phone className="w-3 h-3 inline mr-1" /> Telefon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05XX XXX XX XX"
                    className="w-full border text-white px-4 py-3 text-sm transition-colors placeholder:text-[#555]"
                    style={{ backgroundColor: "#090909", borderColor: "rgba(255,255,255,0.08)" }}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider mb-2 block" style={{ color: "#777" }}>
                  <Scissors className="w-3 h-3 inline mr-1" /> Hizmet
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full border text-white px-4 py-3 text-sm transition-colors appearance-none"
                  style={{ backgroundColor: "#090909", borderColor: "rgba(255,255,255,0.08)" }}
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
                  <label className="text-xs uppercase tracking-wider mb-2 block" style={{ color: "#777" }}>
                    <Calendar className="w-3 h-3 inline mr-1" /> Tarih
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full border text-white px-4 py-3 text-sm transition-colors"
                    style={{ backgroundColor: "#090909", borderColor: "rgba(255,255,255,0.08)" }}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider mb-2 block" style={{ color: "#777" }}>
                    <Clock className="w-3 h-3 inline mr-1" /> Saat
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full border text-white px-4 py-3 text-sm transition-colors appearance-none"
                    style={{ backgroundColor: "#090909", borderColor: "rgba(255,255,255,0.08)" }}
                  >
                    <option value="">Saat seçin...</option>
                    {["09:00","09:30","10:00","10:30","11:00","11:30","12:00","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider mb-2 block" style={{ color: "#777" }}>
                  <MessageSquare className="w-3 h-3 inline mr-1" /> Not (İsteğe Bağlı)
                </label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Özel isteklerinizi belirtin..."
                  rows={3}
                  className="w-full border text-white px-4 py-3 text-sm transition-colors resize-none placeholder:text-[#555]"
                  style={{ backgroundColor: "#090909", borderColor: "rgba(255,255,255,0.08)" }}
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
                className="w-full text-white font-semibold uppercase tracking-wider py-4 rounded-none transition-all duration-300"
                style={{ backgroundColor: "#c9a96e" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#e0c68b"; e.currentTarget.style.boxShadow = "0 0 20px rgba(201,169,110,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#c9a96e"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <Send className="w-4 h-4 mr-2" /> Randevu Gönder
              </Button>
            </form>
          </RevealText>

          <RevealText delay={0.4}>
            <div className="space-y-4">
              <a
                href={`https://wa.me/905551234567?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="text-white p-5 cursor-pointer transition-shadow duration-300"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    <span className="font-bold uppercase tracking-wider">WhatsApp</span>
                  </div>
                  <p className="text-white/80 text-xs">Anında randevu alın, hızlı iletişim</p>
                </motion.div>
              </a>

              <a
                href={`mailto:slickstyle@gmail.com?subject=${gmailSubject}&body=${gmailBody}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="text-white p-5 cursor-pointer transition-shadow duration-300"
                  style={{ background: "linear-gradient(to right, #c9a96e, #a88942)" }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-6 h-6" />
                    <span className="font-bold uppercase tracking-wider">E-Posta</span>
                  </div>
                  <p className="text-white/80 text-xs">slickstyle@gmail.com</p>
                </motion.div>
              </a>

              <a href="tel:+905551234567">
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="border text-white p-5 cursor-pointer transition-colors duration-300"
                  style={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-6 h-6" style={{ color: "#c9a96e" }} />
                    <span className="font-bold uppercase tracking-wider">Ara</span>
                  </div>
                  <p className="text-xs" style={{ color: "#777" }}>0555 123 45 67</p>
                </motion.div>
              </a>

              <div className="border p-5" style={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5" style={{ color: "#c9a96e" }} />
                  <span className="font-bold uppercase tracking-wider text-sm">Çalışma Saatleri</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: "#777" }}>Pazartesi - Cumartesi</span>
                    <span className="text-white font-medium">09:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "#777" }}>Pazar</span>
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

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactCards = [
    {
      icon: Phone,
      title: "Telefon",
      lines: ["+90 555 123 45 67", "+90 216 345 67 89"],
      accent: "#c9a96e",
      pulse: true,
    },
    {
      icon: Phone,
      title: "WhatsApp",
      lines: ["+90 555 123 45 67", "Anında yanıt alın"],
      accent: "#25D366",
      badge: true,
    },
    {
      icon: Mail,
      title: "E-Posta",
      lines: ["slickstyle@gmail.com", "info@slickstyle.com"],
      accent: "#c9a96e",
    },
  ];

  return (
    <section id="iletisim" className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#0e0e0e" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <RevealText className="text-center mb-16">
          <span className="uppercase tracking-[0.3em] text-sm font-medium" style={{ color: "#c9a96e" }}>İletişim</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4" style={{ color: "#f0f0f0" }}>
            Bize <span className="text-gradient-gold">Ulaşın</span>
          </h2>
          <div className="w-20 h-1 mx-auto" style={{ backgroundColor: "#c9a96e" }} />
        </RevealText>

        <div className="grid lg:grid-cols-2 gap-8">
          <RevealText delay={0.2}>
            <div className="space-y-4">
              {contactCards.map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
                  whileHover={{ y: -4 }}
                  className="relative p-6 border overflow-hidden cursor-pointer group"
                  style={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.06)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${card.accent}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  }}
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: `linear-gradient(to right, ${card.accent}, #e0c68b)` }} />
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <motion.div
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        animate={card.pulse ? { boxShadow: ["0 0 0 0 rgba(201,169,110,0.4)", "0 0 0 12px rgba(201,169,110,0)"] } : {}}
                        transition={card.pulse ? { duration: 2, repeat: Infinity } : {}}
                        style={{ backgroundColor: `${card.accent}15`, border: `1px solid ${card.accent}30` }}
                      >
                        <card.icon className="w-6 h-6" style={{ color: card.accent }} />
                      </motion.div>
                      {card.badge && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ backgroundColor: "#25D366" }}>
                          ✓
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold uppercase mb-1" style={{ color: "#f0f0f0" }}>{card.title}</h3>
                      {card.lines.map((line, i) => (
                        <p key={i} className="text-sm" style={{ color: "#777" }}>{line}</p>
                      ))}
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: card.accent }} />
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="p-6 border"
                style={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5" style={{ color: "#c9a96e" }} />
                  <h3 className="text-lg font-bold uppercase" style={{ color: "#f0f0f0" }}>Adres</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#777" }}>
                  Atatürk Cad. No: 42<br />
                  Kadıköy, İstanbul
                </p>
              </motion.div>
            </div>
          </RevealText>

          <RevealText delay={0.4}>
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl" style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.3), rgba(201,169,110,0.05), rgba(201,169,110,0.3))" }} />
              <div className="relative rounded-xl overflow-hidden" style={{ border: "1px solid rgba(201,169,110,0.2)" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.5!2d28.98!3d41.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAyJzEwLjgiTiAyOMKwNTknMjQuMCJF!5e0!3m2!1str!2str!4v1234567890"
                  width="100%"
                  height="500"
                  style={{ border: 0, filter: "brightness(0.7) contrast(1.1) saturate(0)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
                <div className="absolute bottom-4 right-4">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
                    style={{ backgroundColor: "#c9a96e" }}
                  >
                    <MapPin className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: "#090909" }} className="border-t" >
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(to bottom right, #c9a96e, #a88942)" }}>
                  <Scissors className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-lg font-extrabold uppercase tracking-[0.15em] text-white">Slick</span>
                  <span className="text-[10px] uppercase tracking-[0.35em] font-medium ml-1" style={{ color: "#c9a96e" }}>Style</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#777" }}>
                Erkekler için premium berber hizmeti. Modern teknikler ve geleneksel ustalığın mükemmel birleşimi.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 rounded-full border flex items-center justify-center hover:border-[#c9a96e]/50 hover:bg-[#c9a96e]/10 transition-all duration-300" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <Instagram className="w-4 h-4" style={{ color: "#777" }} />
                </a>
                <a href="#" className="w-9 h-9 rounded-full border flex items-center justify-center hover:border-[#c9a96e]/50 hover:bg-[#c9a96e]/10 transition-all duration-300" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <Facebook className="w-4 h-4" style={{ color: "#777" }} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider text-sm mb-4" style={{ color: "#f0f0f0" }}>Hızlı Erişim</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm transition-colors hover:text-[#c9a96e]" style={{ color: "#777" }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider text-sm mb-4" style={{ color: "#f0f0f0" }}>Hizmetler</h4>
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s.name}>
                    <a href="#hizmetler" className="text-sm transition-colors hover:text-[#c9a96e]" style={{ color: "#777" }}>
                      {s.name} - {s.price}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider text-sm mb-4" style={{ color: "#f0f0f0" }}>İletişim</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm" style={{ color: "#777" }}>
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "#c9a96e" }} />
                  <span>Kadıköy, İstanbul</span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: "#777" }}>
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#c9a96e" }} />
                  <span>+90 555 123 45 67</span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: "#777" }}>
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#c9a96e" }} />
                  <span>info@slickstyle.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: "#777" }}>
                  <Clock className="w-4 h-4 flex-shrink-0" style={{ color: "#c9a96e" }} />
                  <span>Pzt - Cmt: 09:00 - 21:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "#777" }}>
            © 2024 Slick Style. Tüm hakları saklıdır.
          </p>
          <p className="text-xs" style={{ color: "#555" }}>
            Premium Berber Deneyimi
          </p>
        </div>
      </div>
    </footer>
  );
}

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
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
          style={{ backgroundColor: "#c9a96e", boxShadow: "0 0 20px rgba(201,169,110,0.3)" }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <main style={{ backgroundColor: "#090909" }} className="min-h-screen">
      <Navbar />
      <HeroSection />
      <MarqueeSection1 />
      <ServicesSection />
      <MarqueeSection2 />
      <AboutSection />
      <ProductsSection />
      <MarqueeSection3 />
      <GallerySection />
      <BlogSection />
      <TestimonialsSection />
      <MarqueeSection4 />
      <AppointmentSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
