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
  ChevronDown,
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

// ===== Animation Helper Variants =====
const blurReveal = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

const flipIn = {
  hidden: { opacity: 0, scaleX: 0, transformOrigin: "left" },
  visible: (delay: number) => ({
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.5, delay },
  }),
};

const clipReveal = {
  hidden: { opacity: 0, clipPath: "circle(0% at 50% 50%)" },
  visible: (delay: number) => ({
    opacity: 1,
    clipPath: "circle(100% at 50% 50%)",
    transition: { duration: 0.7, delay },
  }),
};

const rotateSlideUp = {
  hidden: { opacity: 0, y: 40, rotateX: 15 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, delay },
  }),
};

const slideFromSide = {
  hidden: (custom: { dir: number; delay: number }) => ({
    opacity: 0,
    x: custom.dir * 60,
  }),
  visible: (custom: { dir: number; delay: number }) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: custom.delay },
  }),
};

// ===== Utility Components =====

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
    <div
      className="overflow-hidden whitespace-nowrap border-y border-[rgba(255,255,255,0.04)] py-3"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <motion.div
        className="flex gap-12 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((t, i) => (
          <span
            key={i}
            className="uppercase tracking-[0.3em] text-sm flex items-center gap-4"
            style={{ color: "rgba(255,255,255,0.15)" }}
          >
            <span>{t}</span>
            <Scissors
              className="w-3 h-3"
              style={{ color: "rgba(223,255,0,0.3)" }}
            />
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
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
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
            backgroundColor: "rgba(223,255,0,0.3)",
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

// ===== Navigation =====

const navLinks = [
  { label: "Anasayfa", href: "#anasayfa", icon: Award, desc: "Ana sayfaya dön" },
  {
    label: "Hizmetler",
    href: "#hizmetler",
    icon: Scissors,
    desc: "Hizmetlerimizi keşfedin",
  },
  {
    label: "Ürünler",
    href: "#urunler",
    icon: Gem,
    desc: "Premium bakım ürünleri",
  },
  { label: "Galeri", href: "#galeri", icon: ZoomIn, desc: "Çalışmalarımız" },
  { label: "Blog", href: "#blog", icon: Hash, desc: "Son yazılarımız" },
  { label: "İletişim", href: "#iletisim", icon: Mail, desc: "Bize ulaşın" },
];

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-7 h-5 relative flex flex-col justify-between">
      <motion.span
        animate={
          isOpen
            ? { rotate: 45, y: 8, width: 28 }
            : { rotate: 0, y: 0, width: 28 }
        }
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
        className="block h-[2px] origin-left rounded-full"
        style={{ backgroundColor: "#DFFF00" }}
      />
      <motion.span
        animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        className="block h-[2px] rounded-full"
        style={{ width: 20, backgroundColor: "#DFFF00" }}
      />
      <motion.span
        animate={
          isOpen
            ? { rotate: -45, y: -8, width: 28 }
            : { rotate: 0, y: 0, width: 14 }
        }
        transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
        className="block h-[2px] origin-left rounded-full ml-auto"
        style={{ backgroundColor: "#DFFF00" }}
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Top bar - neon orange */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          scrolled
            ? "opacity-0 pointer-events-none -translate-y-full"
            : "opacity-100"
        }`}
      >
        <div style={{ backgroundColor: "#FF6B00" }} className="text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-1.5">
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="tel:+905533261747"
                className="flex items-center gap-1.5 text-[11px] sm:text-xs tracking-wide hover:opacity-80 transition-opacity"
              >
                <Phone className="w-3 h-3" />
                <span>0553 326 17 47</span>
              </a>
              <a
                href="mailto:info@canbaykuaför.com"
                className="hidden sm:flex items-center gap-1.5 text-[11px] sm:text-xs tracking-wide hover:opacity-80 transition-opacity"
              >
                <Mail className="w-3 h-3" />
                <span>info@canbaykuaför.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:flex items-center gap-1.5 text-[11px] sm:text-xs tracking-wide">
                <Clock className="w-3 h-3" />
                Pzt - Cmt: 09:00 - 21:00
              </span>
              <div className="flex items-center gap-2 ml-2">
                <a
                  href="#"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "top-0 bg-black/85 backdrop-blur-2xl border-b border-white/[0.04] shadow-[0_1px_3px_rgba(255,255,255,0.06)]"
            : "top-[32px] bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-22">
            <a
              href="#anasayfa"
              className="flex items-center gap-3 group relative"
            >
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="relative w-11 h-11 flex items-center justify-center overflow-hidden rounded-full"
              >
                <Image src="/canbay-icon.png" alt="Canbay" width={44} height={44} className="object-cover" />
              </motion.div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-lg lg:text-xl font-extrabold uppercase tracking-[0.15em] text-white group-hover:text-[#DFFF00] transition-colors duration-300"
                >
                  Canbay
                </span>
                <span
                  className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-medium -mt-0.5"
                  style={{ color: "#DFFF00" }}
                >
                  K u a f ö r
                </span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: scrolled ? 0 : 30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden sm:block h-[2px] ml-2"
                style={{
                  background: "linear-gradient(to right, #DFFF00, transparent)",
                }}
              />
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-[13px] uppercase tracking-[0.15em] font-medium hover:text-[#DFFF00] transition-colors duration-300 group"
                  style={{ color: "#888" }}
                >
                  <span className="relative z-10">{link.label}</span>
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: "rgba(223,255,0,0.1)" }}
                  />
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full group-hover:w-5 transition-all duration-300"
                    style={{ backgroundColor: "#DFFF00" }}
                  />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <motion.a
                href="#randevu"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden sm:flex items-center gap-2 font-bold uppercase tracking-[0.12em] text-[12px] px-5 py-2.5 relative overflow-hidden group"
                style={{
                  background: "linear-gradient(to right, #DFFF00, #B8D900)",
                  color: "#000",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 2,
                  }}
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

      {/* Mobile menu */}
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
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
              className="fixed top-0 right-0 bottom-0 z-[56] w-full max-w-md lg:hidden"
              style={{ backgroundColor: "#000000" }}
            >
              <div className="flex flex-col h-full">
                <div
                  className="flex items-center justify-between p-6 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
                    >
                      <Image src="/canbay-icon.png" alt="Canbay" width={32} height={32} className="object-cover" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-[0.15em] text-white">
                      Menü
                    </span>
                  </div>
                  <motion.button
                    onClick={() => setMobileOpen(false)}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 flex items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(223,255,0,0.1)" }}
                  >
                    <X className="w-4 h-4" style={{ color: "#DFFF00" }} />
                  </motion.button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <div className="p-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="rounded-xl p-6 mb-6 border"
                      style={{
                        backgroundColor: "rgba(223,255,0,0.08)",
                        borderColor: "rgba(223,255,0,0.2)",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg, #DFFF00, #B8D900)",
                          }}
                        >
                          <Calendar className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm uppercase tracking-wider">
                            Randevu Al
                          </div>
                          <div className="text-xs" style={{ color: "#888" }}>
                            Hemen online randevu
                          </div>
                        </div>
                      </div>
                      <a
                        href="#randevu"
                        onClick={() => setMobileOpen(false)}
                        className="block w-full text-center py-3 rounded-lg font-bold uppercase tracking-wider text-sm text-black"
                        style={{
                          background:
                            "linear-gradient(to right, #DFFF00, #B8D900)",
                        }}
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
                        transition={{
                          delay: 0.15 + i * 0.07,
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-all duration-300"
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border"
                          style={{
                            borderColor: "rgba(255,255,255,0.06)",
                            backgroundColor: "rgba(255,255,255,0.02)",
                          }}
                        >
                          <link.icon
                            className="w-5 h-5"
                            style={{ color: "#DFFF00" }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className="font-semibold uppercase tracking-[0.08em] text-white group-hover:text-[#DFFF00] transition-colors text-sm"
                          >
                            {link.label}
                          </div>
                          <div className="text-xs truncate" style={{ color: "#888" }}>
                            {link.desc}
                          </div>
                        </div>
                        <ChevronRight
                          className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: "#DFFF00" }}
                        />
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div
                  className="p-6 border-t"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center justify-center gap-4">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full border flex items-center justify-center hover:border-[#DFFF00]/50 hover:bg-[#DFFF00]/10 transition-all duration-300"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    >
                      <Instagram className="w-4 h-4" style={{ color: "#888" }} />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full border flex items-center justify-center hover:border-[#DFFF00]/50 hover:bg-[#DFFF00]/10 transition-all duration-300"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    >
                      <Facebook className="w-4 h-4" style={{ color: "#888" }} />
                    </a>
                    <a
                      href="tel:+905533261747"
                      className="w-10 h-10 rounded-full border flex items-center justify-center hover:border-[#DFFF00]/50 hover:bg-[#DFFF00]/10 transition-all duration-300"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    >
                      <Phone className="w-4 h-4" style={{ color: "#888" }} />
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

// ===== Hero Section =====

const heroStats = [
  { value: 9, suffix: "+", label: "Yıl Deneyim" },
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
      style={{ backgroundColor: "#000000" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(223,255,0,0.05) 0%, transparent 70%)",
        }}
      />
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
                style={{ backgroundColor: "#DFFF00" }}
              />
              <span
                className="uppercase tracking-[0.3em] text-sm font-medium"
                style={{ color: "#DFFF00" }}
              >
                Hoş Geldiniz
              </span>
            </motion.div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-tight mb-6"
              style={{ color: "#FFFFFF" }}
            >
              {"Pursaklar'ın En İyi Kuaförü"
                .split("")
                .map((char, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.03,
                      delay: 0.5 + idx * 0.015,
                    }}
                    className="inline-block"
                    style={
                      char === " " ? { width: "0.3em" } : {}
                    }
                  >
                    {char === "P" ||
                    char === "E" ||
                    char === "K" ||
                    char === "u" ||
                    char === "ö" ||
                    char === "ü" ? (
                      <span className="text-gradient-neon">{char}</span>
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
              style={{ color: "#BBBBBB" }}
            >
              Profesyonel berber hizmeti. Uzman ellerde, modern tarzda.
              Canbay Kuaför farkıyla.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="flex flex-wrap items-center gap-6"
            >
              <a href="#randevu" className="uv-gradient-btn">
                <span className="uv-gradient-container">
                  <span className="uv-gradient-inner" />
                </span>
                <Calendar className="w-4 h-4 mr-2" />
                Randevu Al
              </a>
              <a
                href="#hizmetler"
                className="uv-stroke-btn"
                data-text="Hizmetlerimiz"
              >
                Hizmetlerimiz
                <span className="uv-stroke-hover" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: y2, opacity }}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div
                className="relative w-[300px] h-[400px] sm:w-[380px] sm:h-[500px] lg:w-[500px] lg:h-[600px] overflow-hidden"
                style={{
                  clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)",
                }}
              >
                <Image
                  src="/canbay-hero.png"
                  alt="Canbay Kuaför"
                  fill
                  className="object-cover"
                  priority
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.3), transparent 50%)",
                  }}
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -bottom-4 -left-4 text-black p-4 rounded-sm"
                style={{ backgroundColor: "#DFFF00" }}
              >
                <div className="text-2xl font-bold">2016+</div>
                <div className="text-xs uppercase tracking-wider">
                  Yıl Deneyim
                </div>
              </motion.div>
              <div
                className="absolute top-4 left-4 w-20 h-20 border-t-2 border-l-2 rounded-tl-sm"
                style={{ borderColor: "rgba(223,255,0,0.4)" }}
              />
              <div
                className="absolute bottom-4 right-4 w-20 h-20 border-b-2 border-r-2 rounded-br-sm"
                style={{ borderColor: "rgba(223,255,0,0.4)" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div
          className="grid grid-cols-4 border-t"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            backgroundColor: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(20px)",
          }}
        >
          {heroStats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`text-center py-5 border-r ${idx === 3 ? "border-r-0" : ""}`}
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="text-xl sm:text-2xl font-bold"
                style={{ color: "#DFFF00" }}
              >
                {stat.isDecimal ? (
                  "4.9"
                ) : (
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                  />
                )}
              </div>
              <div
                className="text-[10px] sm:text-xs uppercase tracking-wider mt-1"
                style={{ color: "#888" }}
              >
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
    <MarqueeBanner
      text="CANBAY KUAFÖR • PROFESYONEL BERBER • MODERN TARZ • ERKEK BAKIM • PURSAKLAR •"
      speed={25}
    />
  );
}

// ===== Services Section =====

const services = [
  {
    icon: Scissors,
    name: "Saç Kesimi",
    desc: "Modern fade, klasik kesim ve özel tasarım teknikleri ile yüz hatlarınıza en uygun saç modelini birlikte belirliyoruz.",
    duration: "45 dk",
    tag: "En Popüler",
    image: "/canbay-interior-1.png",
    detailDesc:
      "Modern fade, klasik kesim ve özel tasarım teknikleri ile yüz hatlarınıza en uygun saç modelini birlikte belirliyoruz. Uzman berberlerimiz son trendleri takip ederek size benzersiz bir stil yaratır.",
  },
  {
    icon: Crown,
    name: "Sakal Tıraşı",
    desc: "Sakalınızın doğal formunu koruyarak, profesyonel araçlar ve tekniklerle düzgün, bakımlı bir görünüm sağlıyoruz.",
    duration: "30 dk",
    tag: "",
    image: "/canbay-interior-2.png",
    detailDesc:
      "Sakalınızın doğal formunu koruyarak, profesyonel araçlar ve tekniklerle düzgün, bakımlı bir görünüm sağlıyoruz.",
  },
  {
    icon: Sparkles,
    name: "Cilt Bakımı",
    desc: "Derin temizlik, nemlendirme ve canlandırma işlemlerini kapsayan profesyonel cilt bakımı.",
    duration: "60 dk",
    tag: "Premium",
    image: "/canbay-interior-3.png",
    detailDesc:
      "Derin temizlik, nemlendirme ve canlandırma işlemlerini kapsayan profesyonel cilt bakımı. Cilt tipinize özel ürünler ve teknikler.",
  },
  {
    icon: Flame,
    name: "Saç Şekillendirme",
    desc: "Saç tipinize uygun profesyonel şekillendirme ürünleri ve teknikleriyle gün boyu kalıcı stiller oluşturuyoruz.",
    duration: "30 dk",
    tag: "",
    image: "/canbay-exterior-1.png",
    detailDesc:
      "Saç tipinize uygun profesyonel şekillendirme ürünleri ve teknikleriyle gün boyu kalıcı stiller oluşturuyoruz.",
  },
  {
    icon: Droplets,
    name: "Saç Tedavisi",
    desc: "Keratin bakımı, protein tedavisi ve saç derisi masajı ile saç sağlığınızı içten dışa destekliyoruz.",
    duration: "50 dk",
    tag: "Yeni",
    image: "/canbay-exterior-2.png",
    detailDesc:
      "Keratin bakımı, protein tedavisi ve saç derisi masajı ile saç sağlığınızı içten dışa destekliyoruz.",
  },
  {
    icon: Gem,
    name: "Klasik Tıraş",
    desc: "Geleneksel ustura ile sıcak havlu uygulaması. Otantik berber ritüeli yaşayın.",
    duration: "40 dk",
    tag: "",
    image: "/canbay-logo.png",
    detailDesc:
      "Geleneksel ustura ile sıcak havlu uygulaması. Otantik berber ritüeli yaşayın.",
  },
  {
    icon: Brush,
    name: "Ağda Bakımı",
    desc: "Profesyonel ağda uygulaması ile pürüzsüz ve temiz bir cilt elde edin.",
    duration: "30 dk",
    tag: "",
    image: "/canbay-interior-2.png",
    detailDesc:
      "Profesyonel ağda uygulaması ile pürüzsüz ve temiz bir cilt elde edin. Yüz ve boyun bölgesi dahil.",
  },
  {
    icon: Zap,
    name: "Modern Fade",
    desc: "Skin fade, taper fade ve drop fade gibi modern kesim teknikleri ile trend bir görünüm.",
    duration: "50 dk",
    tag: "Trend",
    image: "/canbay-hero.png",
    detailDesc:
      "Skin fade, taper fade ve drop fade gibi modern kesim teknikleri ile trend bir görünüm.",
  },
];

function PromoSparkles() {
  const sparkles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    top: `${5 + Math.random() * 90}%`,
    size: Math.random() * 5 + 2,
    delay: Math.random() * 3,
    duration: 1.5 + Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white/90"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.8, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const promoRef = useRef(null);
  const isPromoInView = useInView(promoRef, {
    once: true,
    margin: "-100px",
  });
  const [expandedIdx, setExpandedIdx] = useState(-1);

  return (
    <section
      id="hizmetler"
      className="relative py-24 lg:py-32"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <RevealText>
          <div className="flex items-start gap-6 mb-16">
            <div className="hidden lg:flex flex-col items-center">
              <div
                className="w-[2px] h-20"
                style={{ backgroundColor: "#FF6B00" }}
              />
              <span
                className="text-[10px] font-bold tracking-[0.4em] uppercase mt-3"
                style={{
                  color: "#FF6B00",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                SERVICES
              </span>
              <div
                className="w-[2px] flex-1 mt-3"
                style={{ backgroundColor: "rgba(255,107,0,0.2)" }}
              />
            </div>
            <div>
              <span
                className="uppercase tracking-[0.3em] text-sm font-medium"
                style={{ color: "#FF6B00" }}
              >
                Ne Yapıyoruz
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4"
                style={{ color: "#FFFFFF" }}
              >
                Hizmetlerimiz
              </h2>
              <p
                className="text-lg max-w-md"
                style={{ color: "#BBBBBB" }}
              >
                Erkek Bakımının En İyileri
              </p>
            </div>
          </div>
        </RevealText>

        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          {services.map((s, idx) => {
            const anims = [
              {
                initial: { opacity: 0, x: -40 },
                animate: { opacity: 1, x: 0 },
              },
              {
                initial: { opacity: 0, x: 40 },
                animate: { opacity: 1, x: 0 },
              },
              {
                initial: { opacity: 0, scale: 0.9 },
                animate: { opacity: 1, scale: 1 },
              },
              {
                initial: { opacity: 0, y: 40 },
                animate: { opacity: 1, y: 0 },
              },
            ];
            const anim = anims[idx % anims.length];
            const isExpanded = expandedIdx === idx;
            return (
              <motion.div
                key={s.name}
                initial={anim.initial}
                animate={isInView ? anim.animate : anim.initial}
                transition={{ duration: 0.5, delay: 0.05 + idx * 0.08 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="group relative border overflow-hidden transition-all duration-500 cursor-pointer"
                style={{
                  backgroundColor: "#111111",
                  borderColor: "rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255,107,0,0.3)";
                  e.currentTarget.style.boxShadow =
                    "0 0 25px rgba(255,107,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="absolute top-0 left-0 w-full h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{
                    background: "linear-gradient(to right, #FF6B00, #FF8C3A)",
                  }}
                />

                <div className="relative h-28 sm:h-36 overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6), transparent 60%)",
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    {s.tag && (
                      <span
                        className="text-[9px] uppercase tracking-widest px-2 py-0.5 font-bold"
                        style={{
                          color: "#000",
                          backgroundColor: "#DFFF00",
                        }}
                      >
                        {s.tag}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: "rgba(255,107,0,0.1)",
                      }}
                    >
                      <s.icon
                        className="w-4 h-4"
                        style={{ color: "#FF6B00" }}
                      />
                    </div>
                    <h3
                      className="text-sm sm:text-base font-bold uppercase group-hover:text-[#FF6B00] transition-colors duration-300 leading-tight text-white"
                    >
                      {s.name}
                    </h3>
                  </div>
                  <p
                    className="text-xs leading-relaxed mb-3 line-clamp-2"
                    style={{ color: "#888" }}
                  >
                    {s.desc}
                  </p>

                  {/* Detayları Gör button */}
                  <motion.button
                    onClick={() =>
                      setExpandedIdx(isExpanded ? -1 : idx)
                    }
                    className="w-full py-2 rounded-md text-[11px] sm:text-xs uppercase tracking-wider font-bold relative overflow-hidden cursor-pointer"
                    style={{
                      backgroundColor: "rgba(255,107,0,0.12)",
                      color: "#FF6B00",
                      border: "1px solid rgba(255,107,0,0.2)",
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-md"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(255,107,0,0)",
                          "0 0 18px 3px rgba(255,107,0,0.25)",
                          "0 0 0 0 rgba(255,107,0,0)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-1.5">
                      {isExpanded ? "Kapat" : "Detayları Gör"}
                      <motion.span
                        animate={
                          isExpanded ? { rotate: 180 } : { rotate: 0 }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-3 h-3" />
                      </motion.span>
                    </span>
                  </motion.button>

                  {/* Expandable detail panel */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div
                          className="pt-3 mt-3 border-t"
                          style={{
                            borderColor:
                              "rgba(255,107,0,0.15)",
                          }}
                        >
                          <p
                            className="text-xs leading-relaxed"
                            style={{ color: "#BBBBBB" }}
                          >
                            {s.detailDesc}
                          </p>
                          <div
                            className="flex items-center gap-3 mt-3 text-[10px] sm:text-xs"
                            style={{ color: "#BBBBBB" }}
                          >
                            <span className="flex items-center gap-1">
                              <Clock
                                className="w-3 h-3"
                                style={{
                                  color: "#FF6B00",
                                }}
                              />
                              {s.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star
                                className="w-3 h-3"
                                style={{
                                  color: "#FF6B00",
                                }}
                              />
                              4.9
                            </span>
                          </div>
                          <a
                            href="#randevu"
                            className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold mt-2"
                            style={{ color: "#DFFF00" }}
                          >
                            Randevu Al{" "}
                            <ChevronRight className="w-3 h-3" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Promo Banner */}
        <div className="mt-16" ref={promoRef}>
          <div
            className="relative overflow-hidden"
            style={{
              clipPath:
                "polygon(2% 0%, 98% 0%, 100% 100%, 0% 100%)",
            }}
          >
            <div
              className="relative py-14 sm:py-20 px-6 sm:px-12 lg:px-20"
              style={{
                background:
                  "linear-gradient(135deg, #FF6B00 0%, #DFFF00 50%, #FF6B00 100%)",
                backgroundSize: "200% 200%",
              }}
            >
              {/* Animated diagonal stripes */}
              <motion.div
                className="absolute inset-0 opacity-[0.12]"
                animate={{ backgroundPosition: ["0 0", "80px 80px"] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 18px, rgba(255,255,255,0.15) 18px, rgba(255,255,255,0.15) 36px)",
                  backgroundSize: "80px 80px",
                }}
              />
              <motion.div
                className="absolute inset-0 opacity-[0.06]"
                animate={{
                  backgroundPosition: ["0 0", "-60px 60px"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, transparent, transparent 25px, rgba(255,255,255,0.2) 25px, rgba(255,255,255,0.2) 50px)",
                  backgroundSize: "60px 60px",
                }}
              />
              <PromoSparkles />
              <div
                className="absolute top-0 left-0 w-32 h-32"
                style={{
                  background:
                    "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1), transparent 70%)",
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-32 h-32"
                style={{
                  background:
                    "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1), transparent 70%)",
                }}
              />

              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isPromoInView
                      ? { opacity: 1, y: 0 }
                      : {}
                  }
                  transition={{ duration: 0.6 }}
                >
                  <span
                    className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.4em] text-white/70 border border-white/30 px-5 py-1.5 mb-5 font-medium"
                  >
                    Yeni Müşterilere Özel
                  </span>
                </motion.div>

                <motion.h3
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black uppercase text-white mb-3"
                  style={{
                    textShadow:
                      "2px 4px 12px rgba(0,0,0,0.5)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isPromoInView
                      ? { opacity: 1, scale: 1 }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.15,
                  }}
                >
                  İLK ZİYARETİNİZE
                </motion.h3>

                <motion.div
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-8xl font-black mb-5"
                  style={{
                    color: "#000000",
                    textShadow:
                      "0 0 40px rgba(0,0,0,0.2), 2px 4px 12px rgba(0,0,0,0.3)",
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={
                    isPromoInView
                      ? { opacity: 1, scale: 1 }
                      : {}
                  }
                  transition={{
                    duration: 0.7,
                    delay: 0.3,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  %50 İNDİRİM
                </motion.div>

                <motion.p
                  className="text-black/80 mb-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-medium"
                  initial={{ opacity: 0 }}
                  animate={
                    isPromoInView ? { opacity: 1 } : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.5,
                  }}
                >
                  Canbay Kuaför&apos;e hoş geldiniz! İlk randevunuza özel{" "}
                  <strong>%50 indirim</strong> fırsatını kaçırmayın.
                  Sınırlı süre!
                </motion.p>

                <motion.a
                  href="#randevu"
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      "0 0 40px rgba(255,255,255,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-white text-[#FF6B00] font-black uppercase tracking-[0.15em] text-sm sm:text-base px-10 py-4 rounded-sm shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isPromoInView
                      ? { opacity: 1, y: 0 }
                      : {}
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.7,
                  }}
                >
                  Hemen Randevu Al →
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeSection2() {
  return (
    <MarqueeBanner
      text="SAÇ KESİMİ • SAKAL BAKIMI • CİLT TEDAVİSİ • KLASİK TIRAŞ • ŞEKİLLENDİRME • PREMIUM ÜRÜNLER •"
      speed={35}
    />
  );
}

// ===== About Section =====

const stats = [
  { value: 9, suffix: "+", label: "Yıl Deneyim" },
  { value: 10000, suffix: "+", label: "Müşteri" },
  { value: 5, suffix: "", label: "Uzman Berber" },
  { value: 49, suffix: "", label: "Puan (x10)", isDecimal: true },
];

const timelineItems = [
  {
    year: "2016",
    title: "Kuruluş",
    desc: "Canbay Kuaför ilk kez kapılarını açtı ve Pursaklar'da berber severlerle buluştu.",
    icon: Award,
    animType: "slideLeft",
  },
  {
    year: "2018",
    title: "Büyüme",
    desc: "Müşteri memnuniyeti ile hızla büyüdük, ekibimize yeni ustalar katıldı.",
    icon: MapPin,
    animType: "scaleUp",
  },
  {
    year: "2021",
    title: "Yenilenme",
    desc: "İç mekanımızı tamamen yeniledik, modern ekipmanlara geçtik.",
    icon: Crown,
    animType: "fadeRotate",
  },
  {
    year: "2024",
    title: "Dijital Dönüşüm",
    desc: "Online randevu sistemi ve dijital müşteri deneyimine geçtik.",
    icon: Zap,
    animType: "slideRight",
  },
];

function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const timelineRef = useRef(null);
  const isTimelineInView = useInView(timelineRef, {
    once: true,
    margin: "-80px",
  });
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, {
    once: true,
    margin: "-50px",
  });

  const getTimelineAnim = (type: string, delay: number) => {
    switch (type) {
      case "slideLeft":
        return {
          initial: { opacity: 0, x: -60 },
          animate: isTimelineInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: -60 },
          transition: {
            duration: 0.6,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        };
      case "scaleUp":
        return {
          initial: { opacity: 0, scale: 0.5 },
          animate: isTimelineInView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.5 },
          transition: {
            duration: 0.6,
            delay,
            type: "spring",
            stiffness: 200,
          },
        };
      case "fadeRotate":
        return {
          initial: { opacity: 0, rotate: -8, y: 20 },
          animate: isTimelineInView
            ? { opacity: 1, rotate: 0, y: 0 }
            : { opacity: 0, rotate: -8, y: 20 },
          transition: { duration: 0.7, delay },
        };
      case "slideRight":
        return {
          initial: { opacity: 0, x: 60 },
          animate: isTimelineInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: 60 },
          transition: {
            duration: 0.6,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        };
      default:
        return {};
    }
  };

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Barber stripe background */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #DFFF00 0px, #DFFF00 1px, transparent 1px, transparent 30px)",
        }}
      />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-[5%] w-24 h-[2px] pointer-events-none"
        style={{ backgroundColor: "rgba(223,255,0,0.15)" }}
        animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [1, 1.3, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-[8%] w-16 h-16 rounded-full border pointer-events-none"
        style={{ borderColor: "rgba(223,255,0,0.1)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-[3%] w-[2px] h-20 pointer-events-none"
        style={{ backgroundColor: "rgba(223,255,0,0.1)" }}
        animate={{ scaleY: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-40 right-[20%] w-3 h-3 rounded-full pointer-events-none"
        style={{ backgroundColor: "rgba(223,255,0,0.2)" }}
        animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        ref={ref}
      >
        <RevealText>
          <div className="text-center mb-16">
            <span
              className="uppercase tracking-[0.3em] text-sm font-medium"
              style={{ color: "#DFFF00" }}
            >
              Hakkımızda
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4"
              style={{ color: "#FFFFFF" }}
            >
              Canbay <span className="text-gradient-neon">Kuaför</span>
            </h2>
          </div>
        </RevealText>

        {/* Split layout with image */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <RevealText>
            <div className="relative">
              <motion.div
                initial={{ width: 0, height: 0 }}
                animate={
                  isInView
                    ? { width: "40px", height: "40px" }
                    : {}
                }
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute top-0 left-0 border-t-2 border-l-2 rounded-tl-sm z-20"
                style={{ borderColor: "#DFFF00" }}
              />
              <div
                className="relative w-full aspect-[4/5] overflow-hidden"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% 85%, 12% 100%)",
                }}
              >
                <Image
                  src="/canbay-interior-2.png"
                  alt="Canbay Kuaför"
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.3), transparent 50%)",
                  }}
                />
              </div>
              <div
                className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 rounded-br-sm z-20"
                style={{ borderColor: "rgba(223,255,0,0.4)" }}
              />
            </div>
          </RevealText>

          <RevealText delay={0.2}>
            <div className="relative">
              <div
                className="absolute -left-6 top-0 w-1 h-20 hidden lg:block"
                style={{ backgroundColor: "#DFFF00" }}
              />
              <p
                className="text-base lg:text-lg leading-relaxed mb-6"
                style={{ color: "#BBBBBB" }}
              >
                Canbay Kuaför, 2016&rsquo;dan beri Pursaklar&rsquo;da
                profesyonel berber hizmeti sunan lider bir kuruluştur. Modern
                teknikler ve geleneksel ustalığın mükemmel birleşimini
                sağlayan ekibimiz, her müşteriye özel bir deneyim
                sunmayı hedeflemektedir.
              </p>
              <p
                className="text-base lg:text-lg leading-relaxed mb-6"
                style={{ color: "#BBBBBB" }}
              >
                Kalite standartlarımızı sürekli yükselterek, sektörde
                yenilikçi yaklaşımımızla fark yaratıyoruz. Müşteri
                memnuniyeti odaklı hizmet anlayışımız, bizi her zaman
                bir adım önde tutar.
              </p>
              <a
                href="#randevu"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-bold transition-colors duration-300 hover:opacity-80"
                style={{ color: "#DFFF00" }}
              >
                Daha Fazla Bilgi{" "}
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </RevealText>
        </div>

        {/* Timeline */}
        <div ref={timelineRef}>
          <RevealText className="text-center mb-12">
            <span
              className="uppercase tracking-[0.3em] text-sm font-medium"
              style={{ color: "#DFFF00" }}
            >
              Yolculuğumuz
            </span>
            <h3
              className="text-2xl sm:text-3xl font-bold uppercase mt-2"
              style={{ color: "#FFFFFF" }}
            >
              Tarihçemiz
            </h3>
          </RevealText>

          <div className="relative max-w-3xl mx-auto">
            <motion.div
              className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-[2px]"
              style={{
                backgroundColor: "rgba(223,255,0,0.2)",
              }}
              initial={{ height: 0 }}
              animate={
                isTimelineInView ? { height: "100%" } : { height: 0 }
              }
              transition={{ duration: 1.2, delay: 0.3 }}
            />

            <div className="space-y-8 sm:space-y-12">
              {timelineItems.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                const anim = getTimelineAnim(
                  item.animType,
                  0.2 + idx * 0.15
                );
                return (
                  <div
                    key={item.year}
                    className={`relative flex items-start gap-4 sm:gap-8 ${
                      isLeft
                        ? "sm:flex-row"
                        : "sm:flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`flex-1 ml-12 sm:ml-0 ${
                        isLeft
                          ? "sm:text-right sm:pr-8"
                          : "sm:text-left sm:pl-8"
                      }`}
                    >
                      <motion.div {...anim}>
                        <div
                          className="text-xs uppercase tracking-[0.2em] mb-1 font-bold"
                          style={{ color: "#DFFF00" }}
                        >
                          {item.year}
                        </div>
                        <h4
                          className="text-lg font-bold uppercase mb-1"
                          style={{ color: "#FFFFFF" }}
                        >
                          {item.title}
                        </h4>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "#888" }}
                        >
                          {item.desc}
                        </p>
                      </motion.div>
                    </div>

                    <motion.div
                      className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10"
                      initial={{ scale: 0 }}
                      animate={
                        isTimelineInView
                          ? { scale: 1 }
                          : { scale: 0 }
                      }
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + idx * 0.15,
                        type: "spring",
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #DFFF00, #B8D900)",
                          boxShadow:
                            "0 0 15px rgba(223,255,0,0.3)",
                        }}
                      >
                        <item.icon className="w-4 h-4 text-black" />
                      </div>
                    </motion.div>

                    <div className="hidden sm:block flex-1" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-20" ref={statsRef}>
          <RevealText className="text-center mb-6">
            <span
              className="uppercase tracking-[0.3em] text-xs font-medium"
              style={{ color: "#DFFF00" }}
            >
              Rakamlarla Biz
            </span>
          </RevealText>
          <div className="overflow-x-auto custom-scrollbar pb-2">
            <div className="flex gap-4 sm:gap-6 min-w-max justify-center sm:justify-start px-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isStatsInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 30 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.12,
                  }}
                  className="flex-shrink-0 px-8 sm:px-12 py-6 border text-center min-w-[160px] sm:min-w-[180px]"
                  style={{
                    backgroundColor: "#111111",
                    borderColor: "rgba(223,255,0,0.15)",
                  }}
                >
                  <div
                    className="text-3xl sm:text-4xl font-bold mb-1"
                    style={{ color: "#DFFF00" }}
                  >
                    {stat.isDecimal ? (
                      <span>4.9</span>
                    ) : (
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                      />
                    )}
                  </div>
                  <div
                    className="text-xs uppercase tracking-wider"
                    style={{ color: "#888" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Products Section =====

const products = [
  {
    name: "Sakal Yağı",
    desc: "Doğal argan yağı ile besleyici sakal yağı. Sakal köklerini güçlendirir.",
    price: "₺150",
    image: "/canbay-interior-1.png",
    tag: "Çok Satan",
  },
  {
    name: "Saç Şekillendirme Kremi",
    desc: "Profesyonel mat görünüm sağlayan şekillendirme kremi. Gün boyu kalıcı tutuş.",
    price: "₺120",
    image: "/canbay-interior-3.png",
    tag: "",
  },
  {
    name: "Tıraş Sonrası Losyon",
    desc: "Yatıştırıcı ve ferahlatıcı etki. Aloe vera ve mentol içeren formül.",
    price: "₺130",
    image: "/canbay-exterior-1.png",
    tag: "Yeni",
  },
  {
    name: "Premium Şampuan",
    desc: "Derin temizlik ve saç derisi bakımı. Doğal aktif maddelerle formüle edilmiş.",
    price: "₺110",
    image: "/canbay-interior-2.png",
    tag: "",
  },
];

function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="urunler"
      className="relative py-24 lg:py-32"
      style={{ backgroundColor: "#000000" }}
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        ref={ref}
      >
        <RevealText className="text-center mb-16">
          <span
            className="uppercase tracking-[0.3em] text-sm font-medium"
            style={{ color: "#FF6B00" }}
          >
            Ürünlerimiz
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4"
            style={{ color: "#FFFFFF" }}
          >
            Bakım Ürünleri
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div
              className="h-[1px] w-12"
              style={{
                backgroundColor: "rgba(255,107,0,0.3)",
              }}
            />
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "#FF6B00" }}
            />
            <div
              className="h-[1px] w-12"
              style={{
                backgroundColor: "rgba(255,107,0,0.3)",
              }}
            />
          </div>
          <p
            className="text-lg max-w-md mx-auto"
            style={{ color: "#BBBBBB" }}
          >
            Premium Kalite
          </p>
        </RevealText>

        <div className="grid sm:grid-cols-2 gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={product.name}
              custom={idx * 0.15}
              variants={flipIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="group flex gap-5 border p-4 transition-all duration-500 cursor-pointer overflow-hidden"
              style={{
                backgroundColor: "#111111",
                borderColor: "rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  "rgba(255,107,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  "rgba(255,255,255,0.06)";
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
                  <div
                    className="absolute top-2 left-2 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 font-medium"
                    style={{ backgroundColor: "#FF6B00" }}
                  >
                    {product.tag}
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <h3
                  className="text-base font-bold uppercase mb-1 group-hover:text-[#FF6B00] transition-colors duration-300 truncate text-white"
                >
                  {product.name}
                </h3>
                <p
                  className="text-xs leading-relaxed mb-3 line-clamp-2"
                  style={{ color: "#888" }}
                >
                  {product.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xl font-bold"
                    style={{ color: "#DFFF00" }}
                  >
                    {product.price}
                  </span>
                  <ChevronRight
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "#FF6B00" }}
                  />
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
    <MarqueeBanner
      text="★ 4.9 PUAN ★ 10.000+ MUTLU MÜŞTERİ ★ 2016'DAN BERİ ★ PROFESYONEL KALITE ★"
      speed={20}
    />
  );
}

// ===== Gallery Section =====

const galleryItems = [
  { src: "/canbay-interior-1.png", alt: "Canbay Kuaför iç mekan", title: "Modern İç Mekan", category: "Mekan", desc: "Şık ve modern iç mekan tasarımımız" },
  { src: "/canbay-exterior-1.png", alt: "Canbay Kuaför dış cephe", title: "Dış Cephe", category: "Mekan", desc: "İstiklal Caddesi üzerindeki şık mağazamız" },
  { src: "/canbay-interior-2.png", alt: "Canbay Kuaför geniş görünüm", title: "Geniş Alan", category: "Mekan", desc: "Konforlu ve ferah çalışma alanlarımız" },
  { src: "/canbay-exterior-2.png", alt: "Canbay Kuaför gece görünüm", title: "Gece Görünüm", category: "Mekan", desc: "Gece aydınlatması ile göz alıcı cephe" },
  { src: "/canbay-interior-3.png", alt: "Canbay Kuaför çalışma alanı", title: "Çalışma Alanı", category: "Hizmet", desc: "Profesyonel ekipman ve uzman kadromuz" },
  { src: "/canbay-logo.png", alt: "Canbay Kuaför logo", title: "Canbay Marka", category: "Marka", desc: "2016'dan beri Pursaklar'ın güvenilir kuaförü" },
];

function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % galleryItems.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goTo = (idx: number) => {
    setActiveIdx(idx);
    setIsAutoPlay(false);
  };

  return (
    <section id="galeri" className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(223,255,0,0.04) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <RevealText className="text-center mb-12">
          <span className="uppercase tracking-[0.3em] text-sm font-medium" style={{ color: "#DFFF00" }}>Portfolyo</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4" style={{ color: "#FFFFFF" }}>
            Dönüşüm <span className="text-gradient-neon">Galerisi</span>
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: "#555" }}>Her kesim bir sanat eseridir</p>
        </RevealText>

        <RevealText delay={0.2}>
          <div className="relative">
            <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-center">
              <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden group" style={{ clipPath: "polygon(0 0, 100% 0, 96% 100%, 0% 100%)" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, scale: 1.08, filter: "blur(8px) brightness(0.6)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(8px) brightness(0.6)" }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute inset-0"
                  >
                    <Image src={galleryItems[activeIdx].src} alt={galleryItems[activeIdx].alt} fill className="object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)" }} />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIdx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                    >
                      <span className="inline-block text-[10px] uppercase tracking-[0.2em] px-3 py-1 mb-3 font-bold" style={{ backgroundColor: "rgba(223,255,0,0.1)", color: "#DFFF00", border: "1px solid rgba(223,255,0,0.3)" }}>
                        {galleryItems[activeIdx].category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-white mb-2">{galleryItems[activeIdx].title}</h3>
                      <p className="text-sm max-w-md" style={{ color: "rgba(255,255,255,0.7)" }}>{galleryItems[activeIdx].desc}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: isAutoPlay ? "#DFFF00" : "#555" }} />
                  <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: isAutoPlay ? "#DFFF00" : "#555" }}>
                    {isAutoPlay ? "OTOMATIK" : "MANUEL"}
                  </span>
                </div>
                <button onClick={() => setIsAutoPlay(!isAutoPlay)} className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center border backdrop-blur-md transition-colors" style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(0,0,0,0.5)" }}>
                  {isAutoPlay ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                </button>
              </div>

              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {galleryItems.map((item, idx) => (
                  <motion.button
                    key={item.src}
                    onClick={() => goTo(idx)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 lg:w-full lg:h-20 overflow-hidden transition-all duration-300 border-2 ${
                      activeIdx === idx ? "border-[#DFFF00] shadow-[0_0_20px_rgba(223,255,0,0.3)]" : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                    style={{ clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
                  >
                    <Image src={item.src} alt={item.alt} fill className="object-cover" />
                    <div className="absolute inset-0" style={{ background: activeIdx === idx ? "rgba(223,255,0,0.15)" : "rgba(0,0,0,0.3)" }} />
                    <div className="absolute bottom-1 left-2 lg:bottom-1.5 lg:left-3">
                      <span className="text-[9px] lg:text-[10px] uppercase tracking-wider font-bold text-white block leading-tight">{item.title}</span>
                    </div>
                    <div className={`absolute top-1 right-1 lg:top-1.5 lg:right-2 w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full transition-colors ${activeIdx === idx ? "bg-[#DFFF00]" : "bg-white/30"}`} />
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={() => goTo((activeIdx - 1 + galleryItems.length) % galleryItems.length)} className="w-12 h-12 border flex items-center justify-center transition-all hover:border-[#DFFF00] hover:bg-[#DFFF00]/10" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <ChevronRight className="w-5 h-5 rotate-180" style={{ color: "#DFFF00" }} />
              </button>
              <div className="flex gap-2">
                {galleryItems.map((_, idx) => (
                  <button key={idx} onClick={() => goTo(idx)} className="h-1 rounded-full transition-all duration-300" style={{ width: activeIdx === idx ? "32px" : "8px", backgroundColor: activeIdx === idx ? "#DFFF00" : "rgba(255,255,255,0.1)" }} />
                ))}
              </div>
              <button onClick={() => goTo((activeIdx + 1) % galleryItems.length)} className="w-12 h-12 border flex items-center justify-center transition-all hover:border-[#DFFF00] hover:bg-[#DFFF00]/10" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <ChevronRight className="w-5 h-5" style={{ color: "#DFFF00" }} />
              </button>
            </div>
          </div>
        </RevealText>
      </div>
    </section>
  );
}

// ===== Blog Section =====

const blogPosts = [
  {
    image: "/canbay-interior-1.png",
    title: "Sakal Bakımının Sırları",
    date: "15 Ocak 2024",
    category: "Bakım",
    author: "Canbay Usta",
    readTime: "5 dk",
    content:
      "Sakal bakımı sadece düzgün bir görünüm için değil, sağlıklı sakal büyümesi için de kritik öneme sahiptir. Doğal yağlar kullanarak sakal köklerini beslemek temel adımlardandır.",
  },
  {
    image: "/canbay-exterior-1.png",
    title: "2024 Erkek Saç Trendleri",
    date: "10 Ocak 2024",
    category: "Trend",
    author: "Canbay Usta",
    readTime: "4 dk",
    content:
      "Bu yılın en popüler saç modelleri arasında textured crop, modern mullet ve curtain bangs öne çıkıyor.",
  },
  {
    image: "/canbay-interior-3.png",
    title: "Doğru Tıraş Teknikleri",
    date: "5 Ocak 2024",
    category: "Rehber",
    author: "Canbay Usta",
    readTime: "6 dk",
    content:
      "Cildinize zarar vermeden profesyonel tıraş yapmak için dikkat etmeniz gereken birkaç önemli nokta var.",
  },
];

function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="blog"
      className="relative py-24 lg:py-32"
      style={{ backgroundColor: "#000000" }}
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        ref={ref}
      >
        <RevealText className="text-center mb-16">
          <div className="flex items-center justify-center gap-6 mb-4">
            <div
              className="h-[1px] w-16 sm:w-24"
              style={{
                backgroundColor: "rgba(255,107,0,0.3)",
              }}
            />
            <span
              className="uppercase tracking-[0.3em] text-sm font-medium"
              style={{ color: "#FF6B00" }}
            >
              Blog
            </span>
            <div
              className="h-[1px] w-16 sm:w-24"
              style={{
                backgroundColor: "rgba(255,107,0,0.3)",
              }}
            />
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase"
            style={{ color: "#FFFFFF" }}
          >
            Son Yazılar
          </h2>
        </RevealText>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={post.title}
              custom={idx * 0.15}
              variants={blurReveal}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ y: -4 }}
              className="group border overflow-hidden transition-all duration-500 cursor-pointer"
              style={{
                backgroundColor: "#111111",
                borderColor: "rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  "rgba(255,107,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  "rgba(255,255,255,0.06)";
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
                    <span
                      className="text-[9px] uppercase tracking-widest px-2 py-0.5 border font-medium"
                      style={{
                        color: "#FF6B00",
                        borderColor: "rgba(255,107,0,0.3)",
                      }}
                    >
                      {post.category}
                    </span>
                    <h3
                      className="text-sm sm:text-base font-bold uppercase mt-2 mb-1 group-hover:text-[#FF6B00] transition-colors duration-300 leading-tight text-white"
                    >
                      {post.title}
                    </h3>
                    <div
                      className="flex items-center gap-3 text-[10px]"
                      style={{ color: "#888" }}
                    >
                      <span className="flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />{" "}
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />{" "}
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#888" }}
                >
                  {post.content}
                </p>
                <div
                  className="mt-4 pt-3 border-t flex items-center justify-between"
                  style={{
                    borderColor:
                      "rgba(255,255,255,0.04)",
                  }}
                >
                  <span
                    className="text-xs"
                    style={{ color: "#888" }}
                  >
                    {post.author}
                  </span>
                  <span
                    className="text-xs uppercase tracking-wider group-hover:text-[#FF6B00] transition-colors"
                    style={{ color: "#555" }}
                  >
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

// ===== Testimonials Section =====

const testimonials = [
  {
    text: "Canbay Kuaför'da aldığım hizmet gerçekten mükemmeldi. Berberler çok uzman ve ilgililer. Kesinlikle tavsiye ederim!",
    name: "Ahmet Yılmaz",
    role: "Müşteri",
  },
  {
    text: "Yıllardır düzenli müşterisiyim. Hiç bir zaman hayal kırıklığına uğramadım.",
    name: "Mehmet Kaya",
    role: "Sadık Müşteri",
  },
  {
    text: "Sakal tıraşı için harika bir yer. Hijyen, kalite ve profesyonellik bir arada.",
    name: "Emre Demir",
    role: "Müşteri",
  },
  {
    text: "Atmosfer çok güzel, personel çok ilgili. Her geldiğimde kendimi özel hissediyorum!",
    name: "Can Öztürk",
    role: "Müşteri",
  },
  {
    text: "Modern bir ortamda geleneksel berber deneyimi yaşadım. Tek kelimeyle muhteşem.",
    name: "Burak Şahin",
    role: "Yeni Müşteri",
  },
  {
    text: "Saç tedavisi hizmeti inanılmazdı. Saçlarım eskisinden çok daha sağlıklı.",
    name: "Ali Çelik",
    role: "Müşteri",
  },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPaused, setIsPaused] = useState(false);
  const doubled = [...testimonials, ...testimonials];

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        ref={ref}
      >
        <RevealText className="text-center mb-16">
          <span
            className="uppercase tracking-[0.3em] text-sm font-medium"
            style={{ color: "#DFFF00" }}
          >
            Yorumlar
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4"
            style={{ color: "#FFFFFF" }}
          >
            Müşteri Yorumları
          </h2>
          <div
            className="w-20 h-1 mx-auto"
            style={{ backgroundColor: "#DFFF00" }}
          />
          <p
            className="mt-4 text-sm flex items-center justify-center gap-2"
            style={{ color: "#888" }}
          >
            <Pause className="w-3.5 h-3.5" />
            Durdurmak için bir karta tıklayın
          </p>
        </RevealText>
      </div>

      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10"
          style={{
            background:
              "linear-gradient(to right, #0a0a0a, transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10"
          style={{
            background:
              "linear-gradient(to left, #0a0a0a, transparent)",
          }}
        />
        <div className="overflow-hidden">
          <div
            className={`flex gap-6 w-max py-4 ${
              isPaused
                ? "animate-scroll-left paused"
                : "animate-scroll-left"
            }`}
            onClick={() => setIsPaused(!isPaused)}
            style={{ cursor: "pointer" }}
          >
            {doubled.map((t, idx) => (
              <motion.div
                key={`${t.name}-${idx}`}
                custom={0.05 * (idx % 6)}
                variants={rotateSlideUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="w-[340px] sm:w-[400px] flex-shrink-0 border p-6 rounded-xl transition-colors duration-300"
                style={{
                  backgroundColor: "#111111",
                  borderColor:
                    "rgba(255,255,255,0.06)",
                }}
              >
                <Quote
                  className="w-8 h-8 mb-4"
                  style={{
                    color: "rgba(223,255,0,0.3)",
                  }}
                />
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "#888" }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      style={{
                        fill: "#DFFF00",
                        color: "#DFFF00",
                      }}
                    />
                  ))}
                </div>
                <div>
                  <p
                    className="font-bold text-sm"
                    style={{ color: "#FFFFFF" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "#888" }}
                  >
                    {t.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeSection4() {
  return (
    <MarqueeBanner
      text="WHATSAPP İLE RANDEVU • HEMEN ARAYIN • ONLINE SİPARİŞ • E-POSTA İLETİŞİM •"
      speed={22}
    />
  );
}

// ===== Appointment Section =====

function AppointmentSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [step, setStep] = useState(1);
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
    setTimeout(() => { setSubmitted(false); setStep(1); setFormData({ name: "", phone: "", service: "", date: "", time: "", note: "" }); }, 4000);
  };

  const canGoNext = () => {
    if (step === 1) return formData.name.length > 0 && formData.phone.length > 0;
    if (step === 2) return formData.service.length > 0;
    return formData.date.length > 0 && formData.time.length > 0;
  };

  const whatsappMessage = encodeURIComponent(
    `Merhaba, randevu almak istiyorum.\nAd: ${formData.name || "..."}\nTelefon: ${formData.phone || "..."}\nHizmet: ${formData.service || "..."}\nTarih: ${formData.date || "..."}\nSaat: ${formData.time || "..."}`
  );
  const gmailSubject = encodeURIComponent("Randevu Talebi - Canbay Kuaför");
  const gmailBody = encodeURIComponent(
    `Merhaba Canbay Kuaför Ekibi,\n\nRandevu almak istiyorum:\n\nAd Soyad: ${formData.name || "..."}\nTelefon: ${formData.phone || "..."}\nHizmet: ${formData.service || "..."}\nTarih: ${formData.date || "..."}\nSaat: ${formData.time || "..."}\nNot: ${formData.note || "..."}\n\nTeşekkürler!`
  );

  const inputClass = "w-full border text-white px-4 py-3 text-sm transition-all placeholder:text-[#555] focus:border-[#DFFF00]";
  const inputStyle = { backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" };

  return (
    <section id="randevu" className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#000000" }}>
      <div className="absolute inset-0 barber-stripe opacity-[0.02]" />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,107,0,0.3), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,107,0,0.3), transparent)" }} />

      <div className="absolute top-20 right-[5%] w-64 h-64 rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #DFFF00, transparent 70%)" }} />
      <div className="absolute bottom-20 left-[5%] w-48 h-48 rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, #DFFF00, transparent 70%)" }} />

      <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -right-20 opacity-[0.02]">
        <Scissors className="w-60 h-60" style={{ color: "rgba(223,255,0,0.15)" }} />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <RevealText className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 border" style={{ borderColor: "rgba(255,107,0,0.2)", backgroundColor: "rgba(255,107,0,0.05)" }}>
            <Calendar className="w-4 h-4" style={{ color: "#FF6B00" }} />
            <span className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: "#FF6B00" }}>Randevu Sistemi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mb-4" style={{ color: "#FFFFFF" }}>
            Online <span className="text-gradient-neon">Randevu</span>
          </h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: "#555" }}>3 kolay adımda randevunuzu oluşturun</p>
        </RevealText>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          <RevealText delay={0.2}>
            <motion.div className="relative border overflow-hidden" style={{ borderColor: "rgba(255,107,0,0.12)", backgroundColor: "rgba(17,17,17,0.9)", backdropFilter: "blur(20px)" }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(to right, transparent, #FF6B00, transparent)" }} />

              <div className="p-6 lg:p-8">
                <div className="flex items-center justify-between mb-8">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center">
                      <motion.div
                        animate={{ scale: step === s ? [1, 1.15, 1] : 1 }}
                        transition={{ duration: 0.4, repeat: step === s ? 2 : 0 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                          step > s ? "text-black" : step === s ? "text-black" : ""
                        }`}
                        style={step >= s
                          ? { background: "linear-gradient(135deg, #FF6B00, #E55E00)", boxShadow: step === s ? "0 0 20px rgba(255,107,0,0.4)" : "none" }
                          : { backgroundColor: "rgba(255,255,255,0.05)", color: "#555", border: "1px solid rgba(255,255,255,0.1)" }
                        }
                      >
                        {step > s ? "✓" : s}
                      </motion.div>
                      {s < 3 && (
                        <div className="w-16 sm:w-24 lg:w-32 h-[2px] mx-2" style={{ backgroundColor: step > s ? "#FF6B00" : "rgba(255,255,255,0.06)", transition: "background-color 0.5s" }} />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold px-2 py-0.5" style={{ backgroundColor: "rgba(255,107,0,0.15)", color: "#FF6B00" }}>
                    Adım {step}/3
                  </span>
                  <span className="text-xs font-medium" style={{ color: "#888" }}>
                    {step === 1 ? "Kişisel Bilgiler" : step === 2 ? "Hizmet Seçimi" : "Tarih & Saat"}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                    {step === 1 && (
                      <div className="space-y-5">
                        <div>
                          <label className="text-[10px] uppercase tracking-[0.15em] mb-2 block font-bold" style={{ color: "#555" }}>
                            <User className="w-3 h-3 inline mr-1" style={{ color: "#FF6B00" }} /> Ad Soyad
                          </label>
                          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Adınızı girin" className={inputClass} style={inputStyle} />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-[0.15em] mb-2 block font-bold" style={{ color: "#555" }}>
                            <Phone className="w-3 h-3 inline mr-1" style={{ color: "#FF6B00" }} /> Telefon
                          </label>
                          <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="05XX XXX XX XX" className={inputClass} style={inputStyle} />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase tracking-[0.15em] mb-2 block font-bold" style={{ color: "#555" }}>
                            <MessageSquare className="w-3 h-3 inline mr-1" style={{ color: "#FF6B00" }} /> Not (İsteğe Bağlı)
                          </label>
                          <textarea value={formData.note} onChange={(e) => setFormData({ ...formData, note: e.target.value })} placeholder="Özel isteklerinizi belirtin..." rows={2} className={`${inputClass} resize-none`} style={inputStyle} />
                        </div>
                      </div>
                    )}
                    {step === 2 && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] uppercase tracking-[0.15em] mb-3 block font-bold" style={{ color: "#555" }}>
                            <Scissors className="w-3 h-3 inline mr-1" style={{ color: "#FF6B00" }} /> Hizmet Seçin
                          </label>
                          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                            {services.map((s) => (
                              <motion.button
                                key={s.name}
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setFormData({ ...formData, service: s.name })}
                                className={`p-3 border text-left transition-all duration-300 ${formData.service === s.name ? "border-[#FF6B00]" : ""}`}
                                style={{
                                  backgroundColor: formData.service === s.name ? "rgba(255,107,0,0.08)" : "rgba(255,255,255,0.02)",
                                  borderColor: formData.service === s.name ? "rgba(255,107,0,0.4)" : "rgba(255,255,255,0.06)",
                                  boxShadow: formData.service === s.name ? "0 0 15px rgba(255,107,0,0.1)" : "none",
                                }}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <s.icon className="w-3.5 h-3.5" style={{ color: formData.service === s.name ? "#FF6B00" : "#555" }} />
                                  <span className="text-xs font-bold uppercase" style={{ color: formData.service === s.name ? "#FF6B00" : "#CCCCCC" }}>{s.name}</span>
                                </div>
                                <span className="text-[10px]" style={{ color: "#888" }}>{s.duration}</span>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    {step === 3 && (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] uppercase tracking-[0.15em] mb-2 block font-bold" style={{ color: "#555" }}>
                              <Calendar className="w-3 h-3 inline mr-1" style={{ color: "#FF6B00" }} /> Tarih
                            </label>
                            <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className={inputClass} style={inputStyle} />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-[0.15em] mb-2 block font-bold" style={{ color: "#555" }}>
                              <Clock className="w-3 h-3 inline mr-1" style={{ color: "#FF6B00" }} /> Saat
                            </label>
                            <select value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className={`${inputClass} appearance-none`} style={inputStyle}>
                              <option value="">Saat seçin...</option>
                              {["09:00","09:30","10:00","10:30","11:00","11:30","12:00","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00"].map((t) => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="p-4 border space-y-3" style={{ borderColor: "rgba(255,107,0,0.15)", backgroundColor: "rgba(255,107,0,0.03)" }}>
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: "#FF6B00" }}>Randevu Özeti</span>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div><span style={{ color: "#888" }}>Ad:</span> <span className="text-white ml-1">{formData.name || "-"}</span></div>
                            <div><span style={{ color: "#888" }}>Tel:</span> <span className="text-white ml-1">{formData.phone || "-"}</span></div>
                            <div><span style={{ color: "#888" }}>Hizmet:</span> <span className="ml-1" style={{ color: "#FF6B00" }}>{formData.service || "-"}</span></div>
                            <div><span style={{ color: "#888" }}>Tarih:</span> <span className="text-white ml-1">{formData.date || "-"} {formData.time}</span></div>
                          </div>
                        </div>

                        <AnimatePresence>
                          {submitted && (
                            <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} className="p-4 text-center" style={{ backgroundColor: "rgba(223,255,0,0.1)", border: "1px solid rgba(223,255,0,0.2)" }}>
                              <Sparkles className="w-6 h-6 mx-auto mb-2" style={{ color: "#DFFF00" }} />
                              <p className="text-sm font-bold" style={{ color: "#DFFF00" }}>Randevu talebiniz alındı!</p>
                              <p className="text-xs mt-1" style={{ color: "#888" }}>En kısa sürede size ulaşacağız.</p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <motion.a
                          href={`https://wa.me/905533261747?text=${whatsappMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-3 w-full py-4 text-white font-bold uppercase tracking-wider text-sm transition-all"
                          style={{ backgroundColor: "#25D366" }}
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                          WhatsApp ile Onayla
                        </motion.a>

                        <Button type="submit" className="w-full font-bold uppercase tracking-wider py-4 text-sm text-black" style={{ backgroundColor: "#DFFF00" }}>
                          <Send className="w-4 h-4 mr-2" /> Randevuyu Tamamla
                        </Button>
                      </form>
                    )}
                  </motion.div>
                </AnimatePresence>

                {step < 3 && (
                  <div className="flex justify-end mt-8">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => canGoNext() && setStep(step + 1)}
                      disabled={!canGoNext()}
                      className="flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      style={{ backgroundColor: canGoNext() ? "#DFFF00" : "rgba(255,255,255,0.05)", color: canGoNext() ? "#000" : "#555" }}
                    >
                      Devam <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                )}

                {step > 1 && step < 4 && (
                  <div className="mt-4">
                    <button type="button" onClick={() => setStep(step - 1)} className="text-xs uppercase tracking-wider flex items-center gap-1 transition-colors" style={{ color: "#888" }}>
                      <ChevronRight className="w-3 h-3 rotate-180" /> Geri Dön
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </RevealText>

          {/* Sidebar */}
          <RevealText delay={0.4}>
            <div className="space-y-3">
              <div className="p-5 border" style={{ borderColor: "rgba(255,107,0,0.1)", backgroundColor: "rgba(17,17,17,0.8)", backdropFilter: "blur(10px)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #FF6B00, #E55E00)" }}>
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block">Çalışma Saatleri</span>
                    <span className="text-[10px]" style={{ color: "#888" }}>Haftaiçi & Cumartesi</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {["Pzt - Cmt", "Pazar"].map((day, idx) => (
                    <div key={day} className="flex justify-between items-center py-1.5 border-b last:border-b-0" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                      <span className="text-xs" style={{ color: "#BBBBBB" }}>{day}</span>
                      <span className={`text-xs font-bold ${idx === 1 ? "text-red-400" : "text-white"}`}>{idx === 1 ? "Kapalı" : "09:00 - 21:00"}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a href={`mailto:info@canbaykuaför.com?subject=${gmailSubject}&body=${gmailBody}`} target="_blank" rel="noopener noreferrer">
                <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="p-4 border flex items-center gap-3 cursor-pointer transition-all" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(17,17,17,0.6)" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(255,107,0,0.1)" }}>
                    <Mail className="w-4 h-4" style={{ color: "#FF6B00" }} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">E-Posta ile İletişim</span>
                    <span className="text-[10px]" style={{ color: "#888" }}>info@canbaykuaför.com</span>
                  </div>
                </motion.div>
              </a>

              <a href="tel:+905533261747">
                <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="p-4 border flex items-center gap-3 cursor-pointer transition-all" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(17,17,17,0.6)" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(255,107,0,0.1)" }}>
                    <Phone className="w-4 h-4" style={{ color: "#FF6B00" }} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Bizi Arayın</span>
                    <span className="text-[10px]" style={{ color: "#888" }}>0553 326 17 47</span>
                  </div>
                </motion.div>
              </a>

              <div className="p-5 text-center" style={{ background: "linear-gradient(135deg, rgba(223,255,0,0.08), rgba(223,255,0,0.02))", border: "1px solid rgba(223,255,0,0.15)" }}>
                <Scissors className="w-6 h-6 mx-auto mb-2" style={{ color: "#DFFF00" }} />
                <p className="text-xs font-bold text-white mb-1">İlk Ziyaretinize Özel</p>
                <p className="text-2xl font-bold text-gradient-neon">%50 İndirim</p>
                <p className="text-[10px] mt-1" style={{ color: "#888" }}>Tüm hizmetlerde geçerli</p>
              </div>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}

// ===== Contact Section =====

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactCards = [
    {
      icon: Phone,
      title: "Telefon",
      lines: ["0553 326 17 47"],
      accent: "#DFFF00",
      pulse: true,
    },
    {
      icon: Phone,
      title: "WhatsApp",
      lines: ["0553 326 17 47", "Anında yanıt alın"],
      accent: "#25D366",
      badge: true,
    },
    {
      icon: Mail,
      title: "E-Posta",
      lines: [
        "info@canbaykuaför.com",
      ],
      accent: "#FF6B00",
    },
  ];

  return (
    <section
      id="iletisim"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        ref={ref}
      >
        <RevealText className="text-center mb-16">
          <span
            className="uppercase tracking-[0.3em] text-sm font-medium"
            style={{ color: "#DFFF00" }}
          >
            İletişim
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4"
            style={{ color: "#FFFFFF" }}
          >
            Bize <span className="text-gradient-neon">Ulaşın</span>
          </h2>
          <div
            className="w-20 h-1 mx-auto"
            style={{ backgroundColor: "#DFFF00" }}
          />
        </RevealText>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="space-y-4">
              {contactCards.map((card, idx) => (
                <motion.div
                  key={card.title}
                  custom={{
                    dir: idx % 2 === 0 ? -1 : 1,
                    delay: 0.2 + idx * 0.15,
                  }}
                  variants={slideFromSide}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ y: -4 }}
                  className="relative p-6 border overflow-hidden cursor-pointer group"
                  style={{
                    backgroundColor: "#111111",
                    borderColor:
                      "rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${card.accent}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.06)";
                  }}
                >
                  <div
                    className="absolute top-0 left-0 w-full h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{
                      background: `linear-gradient(to right, ${card.accent}, #FF8C3A)`,
                    }}
                  />
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <motion.div
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        animate={
                          card.pulse
                            ? {
                                boxShadow: [
                                  "0 0 0 0 rgba(223,255,0,0.4)",
                                  "0 0 0 12px rgba(223,255,0,0)",
                                ],
                              }
                            : {}
                        }
                        transition={
                          card.pulse
                            ? {
                                duration: 2,
                                repeat: Infinity,
                              }
                            : {}
                        }
                        style={{
                          backgroundColor: `${card.accent}15`,
                          border: `1px solid ${card.accent}30`,
                        }}
                      >
                        <card.icon
                          className="w-6 h-6"
                          style={{ color: card.accent }}
                        />
                      </motion.div>
                      {card.badge && (
                        <div
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                          style={{
                            backgroundColor: "#25D366",
                          }}
                        >
                          ✓
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-lg font-bold uppercase mb-1"
                        style={{ color: "#FFFFFF" }}
                      >
                        {card.title}
                      </h3>
                      {card.lines.map((line, i) => (
                        <p
                          key={i}
                          className="text-sm"
                          style={{ color: "#BBBBBB" }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                    <ChevronRight
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: card.accent }}
                    />
                  </div>
                </motion.div>
              ))}

              <motion.div
                custom={{
                  dir: -1,
                  delay: 0.2 + 3 * 0.15,
                }}
                variants={slideFromSide}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="p-6 border"
                style={{
                  backgroundColor: "#111111",
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin
                    className="w-5 h-5"
                    style={{ color: "#DFFF00" }}
                  />
                  <h3
                    className="text-lg font-bold uppercase"
                    style={{ color: "#FFFFFF" }}
                  >
                    Adres
                  </h3>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#BBBBBB" }}
                >
                  Merkez, İstiklal Cd. No:12/A
                  <br />
                  06145 Pursaklar/Ankara
                </p>
              </motion.div>
            </div>
          </div>

          <RevealText delay={0.4}>
            <div className="relative">
              <div
                className="absolute -inset-1 rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(223,255,0,0.3), rgba(223,255,0,0.05), rgba(223,255,0,0.3))",
                }}
              />
              <div
                className="relative rounded-xl overflow-hidden"
                style={{
                  border:
                    "1px solid rgba(223,255,0,0.2)",
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.5!2d32.87!3d39.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDU4JzEyLjAiTiAzMsKwNTInMTIuMCJF!5e0!3m2!1str!2str!4v1234567890"
                  width="100%"
                  height="500"
                  style={{
                    border: 0,
                    filter:
                      "brightness(0.7) contrast(1.1) saturate(0)",
                  }}
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
                    style={{
                      backgroundColor: "#DFFF00",
                    }}
                  >
                    <MapPin className="w-5 h-5 text-black" />
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

// ===== Footer =====

function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#000000" }}
      className="border-t"
    >
      <div
        className="border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden"
                >
                  <Image src="/canbay-icon.png" alt="Canbay" width={40} height={40} className="object-cover" />
                </div>
                <div>
                  <span className="text-lg font-extrabold uppercase tracking-[0.15em] text-white">
                    Canbay
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-[0.35em] font-medium ml-1"
                    style={{ color: "#DFFF00" }}
                  >
                    Kuaför
                  </span>
                </div>
              </div>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: "#888" }}
              >
                Profesyonel berber hizmeti. Modern
                teknikler ve geleneksel ustalığın mükemmel
                birleşimi. 2016&apos;dan beri Pursaklar&apos;da.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border flex items-center justify-center hover:border-[#DFFF00]/50 hover:bg-[#DFFF00]/10 transition-all duration-300"
                  style={{
                    borderColor:
                      "rgba(255,255,255,0.08)",
                  }}
                >
                  <Instagram
                    className="w-4 h-4"
                    style={{ color: "#888" }}
                  />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border flex items-center justify-center hover:border-[#DFFF00]/50 hover:bg-[#DFFF00]/10 transition-all duration-300"
                  style={{
                    borderColor:
                      "rgba(255,255,255,0.08)",
                  }}
                >
                  <Facebook
                    className="w-4 h-4"
                    style={{ color: "#888" }}
                  />
                </a>
              </div>
            </div>

            <div>
              <h4
                className="font-bold uppercase tracking-wider text-sm mb-4"
                style={{ color: "#FFFFFF" }}
              >
                Hızlı Erişim
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:text-[#DFFF00]"
                      style={{ color: "#888" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="font-bold uppercase tracking-wider text-sm mb-4"
                style={{ color: "#FFFFFF" }}
              >
                Hizmetler
              </h4>
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s.name}>
                    <a
                      href="#hizmetler"
                      className="text-sm transition-colors hover:text-[#DFFF00]"
                      style={{ color: "#888" }}
                    >
                      {s.name} - {s.duration}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="font-bold uppercase tracking-wider text-sm mb-4"
                style={{ color: "#FFFFFF" }}
              >
                İletişim
              </h4>
              <div className="space-y-3">
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "#888" }}
                >
                  <MapPin
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "#DFFF00" }}
                  />
                  <span>Pursaklar, Ankara</span>
                </div>
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "#888" }}
                >
                  <Phone
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "#DFFF00" }}
                  />
                  <span>0553 326 17 47</span>
                </div>
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "#BBBBBB" }}
                >
                  <Mail
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "#DFFF00" }}
                  />
                  <span>info@canbaykuaför.com</span>
                </div>
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "#BBBBBB" }}
                >
                  <Clock
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "#DFFF00" }}
                  />
                  <span>Pzt - Cmt: 09:00 - 21:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "#888" }}>
            © 2024 Canbay Kuaför. Tüm hakları saklıdır.
          </p>
          <p className="text-xs" style={{ color: "#555" }}>
            Profesyonel Berber Deneyimi
          </p>
        </div>
      </div>
    </footer>
  );
}

// ===== Scroll To Top =====

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
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
          style={{
            backgroundColor: "#DFFF00",
            boxShadow:
              "0 0 20px rgba(223,255,0,0.3)",
          }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-black" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ===== Page Export =====

export default function Home() {
  return (
    <main
      style={{ backgroundColor: "#000000" }}
      className="min-h-screen"
    >
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
