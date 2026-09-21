import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import hero from "@/assets/hero.jpg";
import panch from "@/assets/panch.jpg";
import dishBiryani from "@/assets/veg biryani.png";
import dishTandoori from "@/assets/panner tikka.png";
import dishDosa from "@/assets/dish-dosa.jpg";
import dishDessert from "@/assets/dish-dessert.jpg";
import dishChai from "@/assets/dish-chai.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import galleryChef from "@/assets/gallery-chef.jpg";
import galleryFamily from "@/assets/gallery-family.jpg";
import gallerySpices from "@/assets/gallery-spices.jpg";
import inVideo from "@/assets/in.mp4";
import famVideo from "@/assets/fam.mp4";
import ctaFinal from "@/assets/cta-final.jpg";
import lalviVideo from "@/assets/lalvi.mp4";

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Lally Restaurant",
  description:
    "A pure vegetarian fine dining restaurant serving authentic Indian, Chinese and street food cuisine. Every meal tells a story.",
  servesCuisine: ["Indian", "Vegetarian", "Chinese", "South Indian", "Street Food"],
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Beti Cir, near maa, beside uday patil hospital, Bank colony",
    addressLocality: "Bidar",
    addressRegion: "Karnataka",
    postalCode: "585402",
    addressCountry: "IN",
  },
  telephone: "+91 90000 12345",
  openingHours: ["Mo-Su 11:30-23:00"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2847",
  },
  acceptsReservations: "True",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lally Restaurant — Pure Veg Fine Dining in Bidar" },
      {
        name: "description",
        content:
          "Lally is a pure vegetarian restaurant in Bidar serving authentic Indian, Chinese and street food specialties. Reserve a table for an unforgettable evening.",
      },
      { name: "keywords", content: "best restaurant in Bidar, pure veg restaurant, fine dining, vegetarian food, restaurant near me" },
      { property: "og:title", content: "Lally Restaurant — Every Meal Tells A Story" },
      {
        property: "og:description",
        content: "Pure veg fine dining in Bidar. Crafted with passion. Served with pride.",
      },
      { property: "og:type", content: "restaurant" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: hero },
      { name: "twitter:title", content: "Lally Restaurant — Every Meal Tells A Story" },
      { name: "twitter:description", content: "Pure veg fine dining in Bidar. Crafted with passion. Served with pride." },
      { name: "twitter:image", content: hero },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(restaurantSchema) },
    ],
  }),
  component: Home,
});

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { href: "#menu", label: "Menu" },
    { href: "#about", label: "About" },
    { href: "#gallery", label: "Gallery" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || menuOpen ? "bg-linen-cream/90 backdrop-blur-md border-b border-olive-ink/15" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8 md:py-5 lg:px-10">
          {/* Desktop left links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {links.slice(0, 3).map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[14px] tracking-wide text-olive-ink transition-opacity hover:opacity-60"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger - mobile & tablet */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[110] flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <div className="flex flex-col items-center gap-[5px]">
              <span
                className={`hamburger-line ${menuOpen ? "translate-y-[3.25px] rotate-45" : ""}`}
              />
              <span
                className={`hamburger-line ${menuOpen ? "-translate-y-[3.25px] -rotate-45" : ""}`}
              />
            </div>
          </button>

          {/* Logo - always centered */}
          <a href="#top" className="font-display text-2xl tracking-tight text-olive-ink md:text-3xl lg:text-3xl">
            LALLY
          </a>

          {/* Desktop right links + reserve */}
          <div className="hidden items-center gap-8 lg:flex">
            <ul className="flex items-center gap-8">
              {links.slice(3).map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[14px] tracking-wide text-olive-ink transition-opacity hover:opacity-60"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#reserve"
              className="rounded-full border border-olive-ink px-5 py-2 text-[13px] tracking-wider text-olive-ink transition-colors hover:bg-olive-ink hover:text-linen-cream"
            >
              Reserve Table
            </a>
          </div>

          {/* Tablet & mobile reserve button */}
          <a
            href="#reserve"
            className="rounded-full border border-olive-ink px-4 py-1.5 text-xs tracking-wider text-olive-ink lg:hidden"
          >
            Reserve
          </a>
        </nav>
      </header>

      {/* Full-screen mobile/tablet menu overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? "mobile-menu-open" : ""}`}>
        <div className="flex flex-col items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="menu-link"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reserve"
            onClick={() => setMenuOpen(false)}
            className="mt-6 rounded-full border border-olive-ink px-8 py-3 text-[14px] tracking-wider text-olive-ink transition-colors hover:bg-olive-ink hover:text-linen-cream"
          >
            Reserve a Table
          </a>
        </div>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
      <video
        src={lalviVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-olive-ink/30 via-transparent to-olive-ink/55" />
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20 md:pt-32 lg:px-10 lg:pb-24">
        <p className="label-caps mb-6 text-linen-cream/90 md:mb-8">Fresh Ingredients · Timeless Flavors · Bidar</p>
        {/* Mobile: stacked. Tablet/Desktop: split grid */}
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-10">
          <h1 className="text-display col-span-1 max-w-[8ch] text-linen-cream md:col-span-7">
            Every Meal<br />Tells a Story.
          </h1>
          <div className="col-span-1 md:col-span-5">
            <p className="max-w-md font-serif text-base leading-snug text-linen-cream/90 md:text-lg lg:text-xl">
              Inspired by nature.<br />Served with pride.<br />
              <span className="text-linen-cream/60">A celebration of pure vegetarian craftsmanship.</span>
            </p>
            <a
              href="#reserve"
              className="mt-6 inline-flex items-center gap-3 border-b border-linen-cream pb-1 text-sm tracking-wider text-linen-cream transition-opacity hover:opacity-70 md:mt-8"
            >
              Reserve a Table
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Heritage() {
  return (
    <section id="about" className="bg-linen-cream py-24 md:py-32 lg:py-48">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
          <div className="md:col-span-6 lg:col-span-7">
            <img
              src={panch}
              alt="A Lally chef carefully presenting a steaming tandoori dish"
              width={1400}
              height={1750}
              loading="lazy"
              className="w-full rounded-[20px] object-cover"
            />
          </div>
          <div className="flex flex-col justify-between md:col-span-6 lg:col-span-5">
            <div>
              <p className="label-caps mb-6 text-olive-ink/70 md:mb-8">— Our Heritage</p>
              <h2 className="text-heading text-olive-ink">
                Food that people<br />genuinely<br />remember.
              </h2>
            </div>
            <div className="mt-10 space-y-5 font-serif text-[16px] leading-relaxed text-olive-ink/85 md:mt-12 md:space-y-6 md:text-[17px]">
              <p>
                Lally Restaurant began with a simple vision — to serve
                food that people genuinely remember.
              </p>
              <p>
                Founded in 2026, Lally may be new, but its commitment
                to quality is timeless. Every dish is prepared with
                carefully selected ingredients, authentic flavors, and
                attention to every detail.
              </p>
              <p>
                What started as a passion for great food has quickly
                become a place where families, friends, and food lovers
                gather to enjoy memorable meals.
              </p>
              <p>
                Because trust isn't built by years alone — it's built
                one plate, one guest, and one experience at a time.
              </p>
              <a href="#menu" className="ghost-link ghost-link-hover mt-6 inline-flex">
                Read the full story
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const dishes = [
  {
    img: dishBiryani,
    name: "Veg Dum Biryani",
    desc: "Fragrant basmati rice layered with saffron-infused vegetables, fresh herbs, and royal spices, sealed and slow-cooked in the traditional dum style.",
    no: "01",
    span: "md:col-span-6 lg:col-span-7 lg:row-span-2",
    aspect: "aspect-[4/5]",
  },
  {
    img: dishTandoori,
    name: "Paneer Tikka",
    desc: "Premium cottage cheese marinated in a signature blend of yogurt and spices, flame-roasted in the tandoor and finished with a delicate smoky aroma.",
    no: "02",
    span: "md:col-span-6 lg:col-span-5",
    aspect: "aspect-[4/5]",
  },
  {
    img: dishDosa,
    name: "Ghee Roast Dosa",
    desc: "Fermented thirty-six hours, crisp at the edges, served with three chutneys.",
    no: "03",
    span: "md:col-span-6 lg:col-span-5",
    aspect: "aspect-[4/5]",
  },
  {
    img: dishDessert,
    name: "Saffron Gulab Jamun",
    desc: "Khoya pearls bathed in cardamom honey, finished with edible silver leaf.",
    no: "04",
    span: "md:col-span-6 lg:col-span-6",
    aspect: "aspect-[4/5]",
  },
  {
    img: dishChai,
    name: "Brass Pot Masala Chai",
    desc: "Hand-pulled, finished tableside from a polished brass kettle into clay kulhads.",
    no: "05",
    span: "md:col-span-6 lg:col-span-6",
    aspect: "aspect-[4/5]",
  },
];

function Signature() {
  return (
    <section className="bg-buttery-peach py-24 md:py-32 lg:py-48">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-caps mb-5 text-olive-ink/70 md:mb-6">— Signature</p>
            <h2 className="text-heading text-olive-ink">
              Five plates,<br />five quiet rituals.
            </h2>
          </div>
          <p className="max-w-sm font-serif text-[15px] leading-relaxed text-olive-ink/80 md:text-base">
            Each dish at Lally is built from a single, stubborn idea:
            a fire, a grain, a hand. Nothing else.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-6 lg:gap-8">
          {dishes.map((d) => (
            <article key={d.no} className={`group ${d.span ?? ""}`}>
              <div className={`relative overflow-hidden rounded-[20px] ${d.aspect}`}>
                <img
                  src={d.img}
                  alt={d.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4 md:mt-5 md:gap-6">
                <div>
                  <h3 className="font-display text-xl text-olive-ink md:text-2xl lg:text-3xl">{d.name}</h3>
                  <p className="mt-1.5 max-w-md font-serif text-[14px] leading-snug text-olive-ink/75 md:mt-2 md:text-[15px]">
                    {d.desc}
                  </p>
                </div>
                <span className="label-caps shrink-0 text-olive-ink/50">№ {d.no}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const reasons = [
  { n: "01", t: "Fresh Ingredients", d: "Sourced from family farms within a day's drive." },
  { n: "02", t: "Expert Chefs", d: "A kitchen led by three generations of practice." },
  { n: "03", t: "Authentic Recipes", d: "Unmodified, unhurried, written in memory." },
  { n: "04", t: "Hygienic Kitchen", d: "An open kitchen, audited weekly, washed nightly." },
  { n: "05", t: "Family Dining", d: "Tables built for shared bowls and slow evenings." },
  { n: "06", t: "Attentive Service", d: "Trained to disappear when the food arrives." },
];

function WhyLally() {
  return (
    <section className="bg-squeeze-bottle-green py-24 md:py-32 lg:py-48">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10">
        <div className="mb-14 max-w-3xl md:mb-20">
          <p className="label-caps mb-5 text-olive-ink/70 md:mb-6">— Why Lally</p>
          <h2 className="text-heading text-olive-ink">
            People don't come<br />here just to eat.
          </h2>
        </div>
        <div className="grid grid-cols-1 divide-y divide-olive-ink/30 border-y border-olive-ink/30 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <div
              key={r.n}
              className={`flex flex-col gap-5 py-10 md:px-8 md:py-12 lg:px-10 ${
                i >= 2 ? "md:border-t md:border-olive-ink/30" : ""
              } ${i >= 4 ? "lg:border-t lg:border-olive-ink/30" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="label-caps text-olive-ink/60">№ {r.n}</span>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                  <circle cx="11" cy="11" r="10.5" stroke="#111111" />
                </svg>
              </div>
              <h3 className="font-display text-2xl text-olive-ink md:text-3xl lg:text-4xl">{r.t}</h3>
              <p className="max-w-xs font-serif text-[14px] leading-relaxed text-olive-ink/80 md:text-[15px]">
                {r.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote:
      "Lovely place and tasty food. Fully hygienic and friendly staff. Do visit the restaurant 👌",
    name: "Pallavi Mangane",
    via: "Google Reviews · ★ 5.0",
  },
  {
    quote:
      "Best restaurant! Must visit once for tasty and delicious foods.",
    name: "Soban Sama",
    via: "Google Reviews · ★ 5.0",
  },
  {
    quote:
      "Food quality is too good, very tasty. Very cooperative staff. And peace ambience.... Loved the food. If u visit try Honey Chilly Paneer is too tasty.",
    name: "Samuel Walsangkar",
    via: "Google Reviews · ★ 5.0",
  },
];

function Testimonials() {
  return (
    <section className="bg-linen-cream py-24 md:py-32 lg:py-48">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10">
        <div className="mb-14 grid grid-cols-1 gap-6 md:mb-20 md:grid-cols-12 md:items-end md:gap-8">
          <p className="label-caps text-olive-ink/70 md:col-span-3">— Customer Trust</p>
          <h2 className="text-heading text-olive-ink md:col-span-9">
            Trusted by thousands<br />of food lovers.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col gap-6 border-t border-olive-ink/30 pt-8 md:gap-8 md:pt-10">
              <span className="font-display text-4xl leading-none text-olive-ink md:text-5xl">"</span>
              <blockquote className="font-serif text-[17px] leading-relaxed text-olive-ink md:text-[19px]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-auto">
                <div className="font-serif text-[15px] text-olive-ink md:text-base">{t.name}</div>
                <div className="label-caps mt-1 text-olive-ink/60">{t.via}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="bg-linen-cream pb-24 md:pb-32 lg:pb-48">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10">
        <div className="mb-12 flex items-end justify-between md:mb-16">
          <div>
            <p className="label-caps mb-5 text-olive-ink/70 md:mb-6">— Gallery</p>
            <h2 className="text-heading text-olive-ink">In the room.</h2>
          </div>
          <span className="hidden font-serif text-sm text-olive-ink/60 md:block">
            Frames from an ordinary Tuesday.
          </span>
        </div>
        {/* Mobile: single column. Tablet: 2-col. Desktop: asymmetric 12-col */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-4 lg:gap-6">
          <div className="md:col-span-7">
            <video
              src={inVideo}
              autoPlay
              muted
              loop
              playsInline
              className="aspect-[4/3] w-full rounded-[20px] object-cover"
            />
          </div>
          <div className="md:col-span-5 md:mt-12 lg:mt-20">
            <img src={galleryChef} alt="Chef finishing a plate" loading="lazy" className="aspect-[4/5] w-full rounded-[20px] object-cover" />
          </div>
          <div className="md:col-span-5 lg:col-span-4">
            <img src={galleryInterior} alt="Lally dining room at dusk" loading="lazy" className="aspect-[3/4] w-full rounded-[20px] object-cover" />
          </div>
          <div className="md:col-span-5 md:-mt-8 lg:col-span-6 lg:-mt-12">
            <video
              src={famVideo}
              autoPlay
              muted
              loop
              playsInline
              className="aspect-[4/3] w-full rounded-[20px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const menu = [
  {
    cat: "Starters",
    items: [
      ["Paneer Tikka", "", "₹249"],
      ["Hara Bhara Kebab", "", "₹219"],
      ["Crispy Corn Masala", "", "₹199"],
    ],
  },
  {
    cat: "Main Course",
    items: [
      ["Paneer Butter Masala", "", "₹289"],
      ["Kadai Paneer", "", "₹299"],
      ["Dal Makhani", "", "₹249"],
    ],
  },
  {
    cat: "Chinese",
    items: [
      ["Veg Hakka Noodles", "", "₹229"],
      ["Veg Manchurian Dry", "", "₹239"],
      ["Chilli Paneer", "", "₹269"],
    ],
  },
  {
    cat: "Rice & Biryani",
    items: [
      ["Veg Dum Biryani", "", "₹249"],
      ["Paneer Tikka Biryani", "", "₹289"],
      ["Jeera Rice", "", "₹169"],
    ],
  },
  {
    cat: "Desserts",
    items: [
      ["Gulab Jamun (2 pcs)", "", "₹99"],
      ["Gajar Ka Halwa", "", "₹149"],
      ["Rabdi Kulfi", "", "₹159"],
    ],
  },
  {
    cat: "Beverages",
    items: [
      ["Sweet Lassi", "", "₹129"],
      ["Fresh Lime Soda", "", "₹99"],
      ["Masala Buttermilk", "", "₹89"],
    ],
  },
];

function Menu() {
  const [active, setActive] = useState(0);
  return (
    <section id="menu" className="bg-mustard-sun py-24 md:py-32 lg:py-48">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-caps mb-5 text-olive-ink/70 md:mb-6">— The Menu</p>
            <h2 className="text-heading text-olive-ink">An edited evening.</h2>
          </div>
          <p className="max-w-sm font-serif text-[15px] text-olive-ink/80 md:text-base">
            Pure veg. Six categories. Freshly prepared, always the same quality.
          </p>
        </div>

        {/* Mobile: horizontal scroll. Tablet/Desktop: flex-wrap */}
        <div className="-mx-5 mb-12 flex gap-2.5 overflow-x-auto px-5 md:-mx-8 md:mb-16 md:gap-3 md:px-8 md:flex-wrap md:overflow-visible lg:-mx-10 lg:px-10">
          {menu.map((m, i) => (
            <button
              key={m.cat}
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-full border border-olive-ink px-4 py-2 text-[12px] tracking-wider transition-colors md:px-5 md:text-[13px] ${
                active === i
                  ? "bg-olive-ink text-linen-cream"
                  : "bg-transparent text-olive-ink hover:bg-olive-ink/10"
              }`}
            >
              {m.cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-0">
          {menu[active].items.map(([name, desc, price]) => (
            <div
              key={name}
              className="grid grid-cols-12 items-baseline gap-4 border-t border-olive-ink/30 py-6 last:border-b md:gap-6 md:py-7"
            >
              <h3 className="col-span-12 font-display text-2xl text-olive-ink md:col-span-5 md:text-3xl lg:text-4xl">
                {name}
              </h3>
              <p className="col-span-8 font-serif text-[14px] leading-snug text-olive-ink/80 md:col-span-5 md:text-[15px]">
                {desc}
              </p>
              <span className="col-span-4 text-right font-serif text-base text-olive-ink md:text-lg">
                {price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reserve() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    guests: "",
    date: "",
    time: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `🍽️ *Reservation Request*\n\n👤 Name: ${formData.name}\n📱 Mobile: ${formData.mobile}\n👥 Guests: ${formData.guests}\n📅 Date: ${formData.date}\n⏰ Time: ${formData.time}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919591226593?text=${encoded}`, "_blank");
  };

  return (
    <section id="reserve" className="bg-linen-cream py-24 md:py-32 lg:py-48">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-10">
        <div className="mb-12 text-center md:mb-16">
          <p className="label-caps mb-5 text-olive-ink/70 md:mb-6">— Reservations</p>
          <h2 className="text-heading text-olive-ink">Reserve your table.</h2>
          <p className="mx-auto mt-6 max-w-lg font-serif text-[15px] text-olive-ink/75 md:mt-8 md:text-base">
            We hold a quiet number of seats each evening. Tell us when you'd like to be at ours.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
        >
          <Field label="Name" name="name" type="text" placeholder="Full name" value={formData.name} onChange={handleChange} />
          <Field label="Mobile" name="mobile" type="tel" placeholder="10 digit number" value={formData.mobile} onChange={handleChange} maxLength={10} pattern="[0-9]{10}" />
          <Field label="Guests" name="guests" type="number" placeholder="2" min={1} max={20} value={formData.guests} onChange={handleChange} />
          <Field label="Date" name="date" type="date" value={formData.date} onChange={handleChange} />
          <Field label="Time" name="time" type="time" value={formData.time} onChange={handleChange} />
          <div className="flex items-end">
            <button
              type="submit"
              className="h-[54px] w-full rounded-full border border-olive-ink bg-olive-ink px-8 text-[13px] tracking-wider text-linen-cream transition-colors hover:bg-transparent hover:text-olive-ink md:h-[58px] md:text-[14px]"
            >
              Request Reservation →
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  min,
  max,
  maxLength,
  pattern,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  min?: number;
  max?: number;
  maxLength?: number;
  pattern?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="label-caps text-olive-ink/60">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        min={min}
        max={max}
        maxLength={maxLength}
        pattern={pattern}
        value={value}
        onChange={onChange}
        required
        className="h-[54px] rounded-full border border-olive-ink bg-transparent px-5 font-serif text-[15px] text-olive-ink placeholder:text-olive-ink/40 focus:bg-buttery-peach focus:outline-none md:h-[58px] md:px-6 md:text-base"
      />
    </label>
  );
}

function Location() {
  return (
    <section id="contact" className="bg-buttery-peach py-24 md:py-32 lg:py-48">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
          <div className="md:col-span-5">
            <p className="label-caps mb-5 text-olive-ink/70 md:mb-6">— Find Us</p>
            <h2 className="text-heading text-olive-ink">Find us.</h2>
            <dl className="mt-10 space-y-8 font-serif text-olive-ink md:mt-14 md:space-y-10">
              <div>
                <dt className="label-caps mb-2 text-olive-ink/60">Address</dt>
                <dd className="text-[16px] leading-snug md:text-lg">
                  Lally restaurant, Beti Cir,<br />near maa, beside uday patil hospital,<br />Bank colony, Bidar, Karnataka 585402
                </dd>
              </div>
              <div>
                <dt className="label-caps mb-2 text-olive-ink/60">Hours</dt>
                <dd className="text-[16px] leading-snug md:text-lg">
                  Mon — Sun · 11:30 — 23:00<br />
                  Kitchen closes 22:30
                </dd>
              </div>
              <div>
                <dt className="label-caps mb-2 text-olive-ink/60">Contact</dt>
                <dd className="text-[16px] leading-snug md:text-lg">
                  +91 90000 12345<br />
                  hello@lally.restaurant
                </dd>
              </div>
            </dl>
          </div>
          <div className="md:col-span-7">
            <div className="overflow-hidden rounded-[20px] border border-olive-ink/20">
              <iframe
                title="Lally Restaurant location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.89!2d77.5067777!3d17.916801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcec7626c03ca65%3A0xb0b5a844fd1ab97c!2sLally+restaurant,+Beti+Cir,+near+maa,+beside+uday+patil+hospital,+Bank+colony,+Bidar,+Karnataka+585402!5e0!3m2!1sen!2sin!4v1719000000000!5m2!1sen!2sin"
                width="100%"
                height="400"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full md:h-[480px] lg:h-[560px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="experience" className="relative h-[80svh] min-h-[480px] w-full overflow-hidden md:h-[90svh] md:min-h-[560px]">
      <img
        src={ctaFinal}
        alt="An intimate candle-lit table set at Lally"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-olive-ink/55" />
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col items-center justify-center px-5 text-center md:px-10">
        <h2 className="text-display max-w-[16ch] text-linen-cream">
          Good food.<br />Great memories.
        </h2>
        <p className="mt-8 max-w-md font-serif text-base text-linen-cream/85 md:mt-10 md:text-lg">
          Join us for your next dining experience.
        </p>
        <a
          href="#reserve"
          className="mt-10 inline-flex items-center gap-3 border-b border-linen-cream pb-2 text-sm tracking-[0.2em] uppercase text-linen-cream transition-opacity hover:opacity-70 md:mt-12"
        >
          Reserve a Table
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-linen-cream py-12 md:py-16">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-5 px-5 text-center md:px-10">
        <div className="font-display text-3xl text-olive-ink md:text-4xl">LALLY</div>
        <p className="font-serif text-[13px] text-olive-ink/60 md:text-sm">
          © {new Date().getFullYear()} Lally Restaurant. Cooked slowly. Served warmly.
        </p>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <main className="bg-linen-cream text-olive-ink">
      <Nav />
      <Hero />
      <Heritage />
      <Signature />
      <WhyLally />
      <Testimonials />
      <Gallery />
      <Menu />
      <Reserve />
      <Location />
      <FinalCTA />
      <Footer />
    </main>
  );
}
