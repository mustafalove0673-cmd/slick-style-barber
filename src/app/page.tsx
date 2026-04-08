"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
  Twitter,
  ArrowUp,
  Zap,
  Award,
  Users,
  Quote,
  ZoomIn,
  Heart,
  MessageCircle,
} from "lucide-react";

/* ─────────────────── helpers ─────────────────── */

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
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
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#anasayfa" className="flex items-center gap-2 group">
              <Scissors className="w-6 h-6 text-[#e87d2f] transition-transform duration-300 group-hover:rotate-45" />
              <span className="text-xl lg:text-2xl font-bold uppercase tracking-wider">
                Slick <span className="text-[#e87d2f]">Style</span>
              </span>
            </a>

            {/* Desktop links */}
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

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-4">
              <Button
                asChild
                className="hidden sm:inline-flex bg-[#e87d2f] hover:bg-[#f5a623] text-white font-semibold uppercase tracking-wider text-sm px-6 py-2 rounded-none transition-all duration-300 hover:shadow-[0_0_20px_rgba(232,125,47,0.4)]"
              >
                <a href="#iletisim">Randevu Al</a>
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
              >
                <Button
                  asChild
                  className="bg-[#e87d2f] hover:bg-[#f5a623] text-white font-semibold uppercase tracking-wider text-lg px-8 py-3 rounded-none"
                >
                  <a href="#iletisim" onClick={() => setMobileOpen(false)}>
                    Randevu Al
                  </a>
                </Button>
              </motion.div>
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

  const headingText = "Profesyonel Berber Hizmeti";

  return (
    <section
      id="anasayfa"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Decorative orbs */}
      <div className="absolute top-20 right-10 w-[400px] h-[400px] rounded-full bg-[#e87d2f]/5 blur-[120px]" />
      <div className="absolute bottom-20 left-10 w-[300px] h-[300px] rounded-full bg-[#f5a623]/5 blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#e87d2f]/3 blur-[150px]" />

      {/* Animated scissors icon */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-32 right-[15%] opacity-5 hidden lg:block"
      >
        <Scissors className="w-32 h-32 text-[#e87d2f]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <motion.div style={{ y: y1, opacity }} className="relative z-10">
            {/* Label */}
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

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-tight mb-6">
              {headingText.split(" ").map((word, idx) => (
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

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-[#a0a0a0] text-lg lg:text-xl mb-8 max-w-lg leading-relaxed"
            >
              Erkekler için premium bakım deneyimi. Uzman ellerde, modern tarzda.
            </motion.p>

            {/* Buttons */}
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
                <a href="#iletisim">
                  Randevu Al <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#e87d2f] text-[#e87d2f] hover:bg-[#e87d2f]/10 font-semibold uppercase tracking-wider px-8 py-3 rounded-none transition-all duration-300"
              >
                <a href="#hizmetler">Hizmetlerimiz</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right image */}
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
              {/* Orange border frame */}
              <div className="absolute -inset-4 border-2 border-[#e87d2f]/20 rounded-sm" />
              <div className="absolute -inset-8 border border-[#e87d2f]/10 rounded-sm" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[300px] h-[400px] sm:w-[380px] sm:h-[500px] lg:w-[450px] lg:h-[580px]"
              >
                <Image
                  src="/barber-hero.png"
                  alt="Profesyonel berber hizmeti"
                  fill
                  className="object-cover rounded-sm"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/30 to-transparent rounded-sm" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-[#e87d2f]/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#e87d2f] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────── SERVICES SECTION ─────────────────── */

const services = [
  {
    icon: Scissors,
    name: "Saç Kesimi",
    desc: "Modern ve klasik saç kesimi teknikleri ile tarzınıza uygun kesim.",
    price: "$30",
  },
  {
    icon: Scissors,
    name: "Sakal Tıraşı",
    desc: "Sakalınızı şekillendiriyoruz, düzgün ve bakımlı bir görünüm.",
    price: "$15",
  },
  {
    icon: Sparkles,
    name: "Cilt Bakımı",
    desc: "Profesyonel cilt bakımı ile taze ve sağlıklı bir cilt.",
    price: "$40",
  },
  {
    icon: Zap,
    name: "Saç Şekillendirme",
    desc: "Saçlarınızı istediğiniz şekilde şekillendiriyoruz.",
    price: "$25",
  },
  {
    icon: Droplets,
    name: "Saç Tedavisi",
    desc: "Saç sağlığınız için özel bakım ve tedavi uygulamaları.",
    price: "$35",
  },
  {
    icon: Award,
    name: "Klasik Tıraş",
    desc: "Geleneksel usul, sıcak havlu ile rahatlatıcı tıraş deneyimi.",
    price: "$20",
  },
];

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="hizmetler"
      className="relative py-24 lg:py-32"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
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
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{
                y: -8,
                boxShadow: "0 0 30px rgba(232, 125, 47, 0.15)",
              }}
              className="group relative bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] p-6 lg:p-8 transition-all duration-300 hover:border-[#e87d2f]/30 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#e87d2f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 15 }}
                  className="w-14 h-14 flex items-center justify-center bg-[#e87d2f]/10 rounded-sm mb-5 group-hover:bg-[#e87d2f]/20 transition-colors duration-300"
                >
                  <service.icon className="w-7 h-7 text-[#e87d2f]" />
                </motion.div>
                <h3 className="text-xl font-bold uppercase mb-2">{service.name}</h3>
                <p className="text-[#a0a0a0] text-sm leading-relaxed mb-4">
                  {service.desc}
                </p>
                <span className="text-[#e87d2f] text-2xl font-bold">
                  {service.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── ABOUT / STATS SECTION ─────────────────── */

const stats = [
  { value: 15, suffix: "+", label: "Yıl Deneyim" },
  { value: 10000, suffix: "+", label: "Müşteri" },
  { value: 5, suffix: "", label: "Uzman Berber" },
  { value: 4.9, suffix: "", label: "Puan", isDecimal: true },
];

function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="relative py-24 lg:py-32"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#e87d2f]/30 rounded-sm" />
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src="/about.png"
                alt="Slick Style barbershop iç mekan"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/50 to-transparent" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -left-6 top-0 w-1 h-20 bg-[#e87d2f] hidden lg:block" />
            <span className="text-[#e87d2f] uppercase tracking-[0.3em] text-sm font-medium">
              Hakkımızda
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-6">
              Slick Style{" "}
              <span className="text-gradient-orange">Hakkında</span>
            </h2>
            <p className="text-[#a0a0a0] text-base lg:text-lg leading-relaxed mb-8">
              Slick Style, 15 yılı aşkın deneyimiyle erkekler için premium berber hizmeti
              sunan lider bir kuruluştur. Modern teknikler ve geleneksel ustalığın mükemmel
              birleşimini sağlayan ekibimiz, her müşteriye özel bir deneyim sunmayı
              hedeflemektedir. Şık ve rahat ortamımızda, saçınızdan cildinize kadar tüm
              bakım ihtiyaçlarınız profesyonel ellere emanet.
            </p>
            <p className="text-[#a0a0a0] text-base lg:text-lg leading-relaxed mb-10">
              Müşteri memnuniyeti bizim önceliğimizdir. Her ziyaretinizde kendinizi özel
              hissedeceğinizden emin olabilirsiniz.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-[#e87d2f] mb-1">
                    {stat.isDecimal ? (
                      <span>
                        {isInView ? "4.9" : "0"}
                      </span>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── PRODUCTS SECTION ─────────────────── */

const products = [
  {
    name: "Sakal Yağı",
    desc: "Doğal argan yağı ile besleyici sakal yağı",
    price: "$25",
  },
  {
    name: "Saç Kremi",
    desc: "Profesyonel saç şekillendirme kremi",
    price: "$18",
  },
  {
    name: "Tıraş Sonrası",
    desc: "Yatıştırıcı ve ferahlatıcı losyon",
    price: "$22",
  },
];

function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="urunler"
      className="relative py-24 lg:py-32"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#e87d2f] uppercase tracking-[0.3em] text-sm font-medium">
            Ürünlerimiz
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4">
            Bakım Ürünleri
          </h2>
          <div className="w-20 h-1 bg-[#e87d2f] mx-auto mb-4" />
          <p className="text-[#a0a0a0] text-lg max-w-md mx-auto">Premium Kalite</p>
        </motion.div>

        {/* Product main image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative w-full h-[300px] sm:h-[400px] mb-12 overflow-hidden rounded-sm group"
        >
          <Image
            src="/products.png"
            alt="Premium bakım ürünleri"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h3 className="text-2xl lg:text-3xl font-bold uppercase mb-2">
              Premium Bakım Serisi
            </h3>
            <p className="text-[#a0a0a0] max-w-md">
              Profesyonel kullanım için özel olarak geliştirilmiş ürünlerimiz
            </p>
          </div>
        </motion.div>

        {/* Product cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] overflow-hidden transition-all duration-300 hover:border-[#e87d2f]/30"
            >
              <div className="h-48 bg-gradient-to-br from-[#1a1a1a] to-[#252525] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[#e87d2f]/5 group-hover:bg-[#e87d2f]/10 transition-colors duration-300" />
                <Scissors className="w-16 h-16 text-[#e87d2f]/30 group-hover:text-[#e87d2f]/50 transition-all duration-300 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold uppercase mb-2">{product.name}</h3>
                <p className="text-[#a0a0a0] text-sm mb-4">{product.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#e87d2f] text-xl font-bold">{product.price}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#e87d2f] hover:bg-[#e87d2f]/10 hover:text-[#f5a623] p-0"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── GALLERY SECTION ─────────────────── */

const galleryImages = [
  { src: "/gallery-1.png", alt: "Saç kesimi örneği", category: "Kesim" },
  { src: "/gallery-2.png", alt: "Dönüşüm öncesi ve sonrası", category: "Kesim" },
  { src: "/gallery-3.png", alt: "Sakal bakımı", category: "Sakal" },
  { src: "/gallery-4.png", alt: "Saç şekillendirme", category: "Styling" },
  { src: "/gallery-5.png", alt: "Klasik tıraş", category: "Sakal" },
];

const galleryFilters = ["Tümü", "Kesim", "Sakal", "Styling"];

function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("Tümü");

  const filtered =
    activeFilter === "Tümü"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  return (
    <section
      id="galeri"
      className="relative py-24 lg:py-32"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#e87d2f] uppercase tracking-[0.3em] text-sm font-medium">
            Çalışmalarımız
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4">
            Dönüşüm Galerisi
          </h2>
          <div className="w-20 h-1 bg-[#e87d2f] mx-auto" />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {galleryFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-[#e87d2f] text-white"
                  : "bg-[#1a1a1a] text-[#a0a0a0] hover:text-white border border-[rgba(255,255,255,0.08)] hover:border-[#e87d2f]/30"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, idx) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`relative overflow-hidden rounded-sm group cursor-pointer ${
                  idx === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/60 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ZoomIn className="w-10 h-10 text-[#e87d2f]" />
                  </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm uppercase tracking-wider">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── BLOG SECTION ─────────────────── */

const blogPosts = [
  {
    image: "/blog-1.png",
    title: "Sakal Bakımının Sırları",
    excerpt: "Sakalınızı sağlıklı ve şekilli tutmak için profesyonel ipuçları ve öneriler.",
    date: "15 Ocak 2024",
    category: "Bakım",
  },
  {
    image: "/blog-2.png",
    title: "2024 Erkek Saç Trendleri",
    excerpt: "Bu yılın en popüler saç modelleri ve stilleri hakkında her şey.",
    date: "10 Ocak 2024",
    category: "Trend",
  },
  {
    image: "/blog-3.png",
    title: "Doğru Tıraş Teknikleri",
    excerpt: "Cildinize zarar vermeden profesyonel tıraş nasıl yapılır?",
    date: "5 Ocak 2024",
    category: "Rehber",
  },
];

function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="blog"
      className="relative py-24 lg:py-32"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#e87d2f] uppercase tracking-[0.3em] text-sm font-medium">
            Blog
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4">
            Son Yazılar
          </h2>
          <div className="w-20 h-1 bg-[#e87d2f] mx-auto" />
        </motion.div>

        {/* Blog Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] overflow-hidden transition-all duration-300 hover:border-[#e87d2f]/30 cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
                <span className="absolute top-4 left-4 bg-[#e87d2f] text-white text-xs uppercase tracking-wider px-3 py-1">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#a0a0a0] text-sm mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-lg font-bold uppercase mb-3 group-hover:text-[#e87d2f] transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-[#a0a0a0] text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="text-[#e87d2f] text-sm uppercase tracking-wider font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  Devamını Oku <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── TESTIMONIALS SECTION ─────────────────── */

const testimonials = [
  {
    text: "Slick Style'da aldığım hizmet gerçekten mükemmeldi. Berberler çok uzman ve ilgililer. Kesinlikle tavsiye ederim!",
    name: "Ahmet Yılmaz",
    role: "Müşteri",
  },
  {
    text: "10 yıldır düzenli müşterisiyim. Hiç bir zaman hayal kırıklığına uğramadım. Her zaman en iyi hizmeti alıyorum.",
    name: "Mehmet Kaya",
    role: "Sadık Müşteri",
  },
  {
    text: "Sakal tıraşı için harika bir yer. Hijyen, kalite ve profesyonellik bir arada. Fiyatlar da çok makul.",
    name: "Emre Demir",
    role: "Müşteri",
  },
  {
    text: "Atmosfer çok güzel, personel çok ilgili. Her geldiğimde kendimi özel hissediyorum. Teşekkürler Slick Style!",
    name: "Can Öztürk",
    role: "Müşteri",
  },
  {
    text: "İlk kez geldim ve çok memnun kaldım. Modern bir ortamda geleneksel berber deneyimi yaşadım.",
    name: "Burak Şahin",
    role: "Yeni Müşteri",
  },
  {
    text: "Saç tedavisi hizmeti inanılmazdı. Saçlarım eskisinden çok daha sağlıklı görünüyor. Süper!",
    name: "Ali Çelik",
    role: "Müşteri",
  },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#e87d2f] uppercase tracking-[0.3em] text-sm font-medium">
            Yorumlar
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4">
            Müşteri Yorumları
          </h2>
          <div className="w-20 h-1 bg-[#e87d2f] mx-auto" />
        </motion.div>
      </div>

      {/* Scrolling carousel */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#111111] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#111111] to-transparent z-10" />

        <div className="overflow-hidden">
          <div className="animate-scroll-left flex gap-6 w-max py-4">
            {doubledTestimonials.map((t, idx) => (
              <div
                key={`${t.name}-${idx}`}
                className="w-[340px] sm:w-[400px] flex-shrink-0 bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] p-6"
              >
                <Quote className="w-8 h-8 text-[#e87d2f]/30 mb-4" />
                <p className="text-[#a0a0a0] text-sm leading-relaxed mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#e87d2f] text-[#e87d2f]"
                    />
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

/* ─────────────────── CTA SECTION ─────────────────── */

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#e87d2f]/10 via-transparent to-[#e87d2f]/10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e87d2f]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e87d2f]/30 to-transparent" />

      {/* Decorative barber tools */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 left-[10%] opacity-5"
      >
        <Scissors className="w-40 h-40 text-[#e87d2f]" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 right-[10%] opacity-5"
      >
        <Scissors className="w-32 h-32 text-[#e87d2f]" />
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#e87d2f] uppercase tracking-[0.3em] text-sm font-medium">
            Hemen Randevu Alın
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-6">
            Randevunuzu Hemen Alın
          </h2>
          <p className="text-[#a0a0a0] text-lg max-w-2xl mx-auto mb-10">
            Uzman berberlerimizden profesyonel hizmet almak için hemen randevu oluşturun.
            Size en uygun zamanı belirleyelim.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-[#e87d2f] hover:bg-[#f5a623] text-white font-semibold uppercase tracking-wider px-12 py-4 text-lg rounded-none transition-all duration-300 hover:shadow-[0_0_40px_rgba(232,125,47,0.5)]"
            >
              <a href="#iletisim">
                Randevu Oluştur <ChevronRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── CONTACT / MAP SECTION ─────────────────── */

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="iletisim"
      className="relative py-24 lg:py-32"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#e87d2f] uppercase tracking-[0.3em] text-sm font-medium">
            İletişim
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase mt-3 mb-4">
            Bize Ulaşın
          </h2>
          <div className="w-20 h-1 bg-[#e87d2f] mx-auto" />
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: MapPin,
              title: "Adres",
              text: "Bağdat Caddesi No: 123, Kadıköy, İstanbul",
            },
            {
              icon: Phone,
              title: "Telefon",
              text: "+90 (216) 555 0123",
            },
            {
              icon: Mail,
              title: "E-posta",
              text: "info@slickstyle.com",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#1a1a1a] border border-[rgba(255,255,255,0.08)] p-6 text-center group hover:border-[#e87d2f]/30 transition-all duration-300"
            >
              <item.icon className="w-8 h-8 text-[#e87d2f] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-bold uppercase text-sm mb-2">{item.title}</h3>
              <p className="text-[#a0a0a0] text-sm">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── FOOTER ─────────────────── */

const quickLinks = [
  { label: "Anasayfa", href: "#anasayfa" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Ürünler", href: "#urunler" },
  { label: "Galeri", href: "#galeri" },
  { label: "Blog", href: "#blog" },
];

function Footer() {
  return (
    <footer
      className="border-t border-[rgba(255,255,255,0.08)]"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + desc */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="w-5 h-5 text-[#e87d2f]" />
              <span className="text-lg font-bold uppercase tracking-wider">
                Slick <span className="text-[#e87d2f]">Style</span>
              </span>
            </div>
            <p className="text-[#a0a0a0] text-sm leading-relaxed">
              Profesyonel berber hizmeti ile erkekler için premium bakım deneyimi sunuyoruz.
              15 yılı aşkın deneyimimizle hizmetinizdeyiz.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold uppercase text-sm mb-4 tracking-wider">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#a0a0a0] text-sm hover:text-[#e87d2f] transition-colors duration-300 flex items-center gap-2"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold uppercase text-sm mb-4 tracking-wider">İletişim</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#e87d2f] mt-0.5 flex-shrink-0" />
                <span className="text-[#a0a0a0] text-sm">
                  Bağdat Caddesi No: 123, Kadıköy, İstanbul
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#e87d2f] flex-shrink-0" />
                <span className="text-[#a0a0a0] text-sm">+90 (216) 555 0123</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#e87d2f] flex-shrink-0" />
                <span className="text-[#a0a0a0] text-sm">info@slickstyle.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold uppercase text-sm mb-4 tracking-wider">
              Çalışma Saatleri
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-[#a0a0a0] text-sm">Pazartesi - Cumartesi</span>
                <span className="text-white text-sm font-medium">09:00 - 20:00</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-[#a0a0a0] text-sm">Pazar</span>
                <span className="text-[#e87d2f] text-sm font-medium">Kapalı</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(255,255,255,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#a0a0a0] text-sm">
            © {new Date().getFullYear()} Slick Style. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-[#a0a0a0] hover:text-[#e87d2f] transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-[#a0a0a0] hover:text-[#e87d2f] transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-[#a0a0a0] hover:text-[#e87d2f] transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
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

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#e87d2f] hover:bg-[#f5a623] text-white flex items-center justify-center shadow-[0_0_20px_rgba(232,125,47,0.3)] transition-all duration-300"
          aria-label="Yukarı çık"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────── MAIN PAGE ─────────────────── */

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0a0a0a" }}>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ProductsSection />
        <GallerySection />
        <BlogSection />
        <TestimonialsSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
