import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ChevronRight,
  Factory,
  Home,
  Hotel,
  Layers3,
  MapPin,
  Menu,
  MessageCircle,
  MoveHorizontal,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

const services = [
  ['01', 'Mermer silim ve cila', 'Matlaşan ve çizilen mermer yüzeylerde dengeli parlaklık.'],
  ['02', 'Beton silim ve cila', 'Fabrika, depo ve otoparklar için dayanıklı yüzey çözümü.'],
  ['03', 'Granit silim ve cila', 'Granit dokusunu koruyan kontrollü parlatma uygulaması.'],
  ['04', 'Karo silim ve cila', 'Eski karo yüzeylerde renk ve doku yenileme.'],
  ['05', 'Paladyen silim ve cila', 'Doğal taş yüzeylerde leke ve matlık giderme.'],
  ['06', 'Traverten silim ve cila', 'Gözenekli taş yapısına uygun hassas yüzey işlemi.'],
  ['07', 'Epoksi zemin taşlama', 'Yeni kaplama öncesi pürüzsüz ve hazır zemin.'],
  ['08', 'Kaymaz yüzey silimi', 'Yoğun kullanılan alanlar için güvenli yüzey dengesi.'],
  ['09', 'Mozaik zemin silimi', 'Eski mozaiklerde özgün dokuyu koruyan restorasyon.'],
];

const caseCards = [
  { title: 'Doğal taş & mermer', label: 'KONUT · OTEL · OFİS', image: '/templates/premium-zemin-silim/mermer-donusum.webp' },
  { title: 'Endüstriyel beton', label: 'FABRİKA · DEPO · OTOPARK', image: '/templates/premium-zemin-silim/beton-silim.webp' },
  { title: 'Traverten & mozaik', label: 'MAĞAZA · LOBİ · VİLLA', image: '/templates/premium-zemin-silim/dogal-tas.webp' },
];

const projectGallery = [
  {
    id: 'mermer',
    label: 'Mermer silimi',
    description: 'Konut ve ticari alanlarda gerçekleştirilen mermer silim, leke giderme ve parlatma uygulamaları.',
    images: Array.from({ length: 6 }, (_, index) => ({
      src: `/templates/premium-zemin-silim/gallery/mermer-${String(index + 1).padStart(2, '0')}.webp`,
      alt: `ZeminSilim mermer silimi uygulaması ${index + 1}`,
    })),
  },
  {
    id: 'basamak',
    label: 'Basamak silimi',
    description: 'Merdiven ve basamaklarda kenar detaylarını koruyan hassas silim ve cila çalışmaları.',
    images: Array.from({ length: 6 }, (_, index) => ({
      src: `/templates/premium-zemin-silim/gallery/basamak-${String(index + 1).padStart(2, '0')}.webp`,
      alt: `ZeminSilim basamak silimi uygulaması ${index + 1}`,
    })),
  },
  {
    id: 'beton-silim',
    label: 'Beton silimi',
    description: 'Beton yüzeylerde dengeli aşındırma, pürüz giderme ve kullanıma hazır zemin uygulamaları.',
    images: Array.from({ length: 2 }, (_, index) => ({
      src: `/templates/premium-zemin-silim/gallery/beton-silim-${String(index + 1).padStart(2, '0')}.webp`,
      alt: `ZeminSilim beton silimi uygulaması ${index + 1}`,
    })),
  },
  {
    id: 'beton-cila',
    label: 'Beton cila',
    description: 'Otopark ve endüstriyel alanlarda dayanıklı, temiz ve kontrollü parlaklığa sahip yüzeyler.',
    images: [
      { src: '/templates/premium-zemin-silim/gallery/beton-cila-01.webp', alt: 'ZeminSilim beton cila uygulaması' },
      { src: '/templates/premium-zemin-silim/gallery/beton-silim-01.webp', alt: 'Beton zeminde silim ve yüzey hazırlığı uygulaması' },
      { src: '/templates/premium-zemin-silim/gallery/beton-silim-02.webp', alt: 'Beton zeminde silim sonrası temiz yüzey görünümü' },
    ],
  },
  {
    id: 'cini',
    label: 'Çini silimi',
    description: 'Desenli çini ve karo zeminlerde özgün dokuyu koruyan temizlik, silim ve yenileme işlemleri.',
    images: Array.from({ length: 3 }, (_, index) => ({
      src: `/templates/premium-zemin-silim/gallery/cini-${String(index + 1).padStart(2, '0')}.webp`,
      alt: `ZeminSilim çini silimi uygulaması ${index + 1}`,
    })),
  },
  {
    id: 'mozaik',
    label: 'Mozaik silimi',
    description: 'Eski mozaik zeminlerde taşı aşındırmadan yapılan yüzey yenileme ve parlatma uygulamaları.',
    images: Array.from({ length: 2 }, (_, index) => ({
      src: `/templates/premium-zemin-silim/gallery/mozaik-${String(index + 1).padStart(2, '0')}.webp`,
      alt: `ZeminSilim mozaik silimi uygulaması ${index + 1}`,
    })),
  },
  {
    id: 'paladyen',
    label: 'Paladyen silimi',
    description: 'Paladyen taş zeminlerde dokuyu öne çıkaran profesyonel silim ve cila çalışmaları.',
    images: Array.from({ length: 5 }, (_, index) => ({
      src: `/templates/premium-zemin-silim/gallery/paladyen-${String(index + 1).padStart(2, '0')}.webp`,
      alt: `ZeminSilim paladyen silimi uygulaması ${index + 1}`,
    })),
  },
];

export default function ZeminSilimPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slider, setSlider] = useState(52);
  const [selectedService, setSelectedService] = useState('Mermer silim ve cila');
  const [galleryPhotoIndexes, setGalleryPhotoIndexes] = useState<Record<string, number>>(() => Object.fromEntries(projectGallery.map((category) => [category.id, 0])));
  const activeService = useMemo(() => services.find((service) => service[1] === selectedService), [selectedService]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      setGalleryPhotoIndexes((current) => Object.fromEntries(projectGallery.map((category) => {
        const photoCount = category.images.length;
        if (photoCount < 2) return [category.id, 0];
        const currentIndex = current[category.id] ?? 0;
        const candidate = Math.floor(Math.random() * (photoCount - 1));
        return [category.id, candidate >= currentIndex ? candidate + 1 : candidate];
      })));
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      'Merhaba ZeminSilim, web sitenizden teklif almak istiyorum.',
      '',
      `Ad Soyad: ${data.get('name') || '-'}`,
      `Telefon: ${data.get('phone') || '-'}`,
      `Yüzey / Hizmet: ${data.get('service') || selectedService}`,
      `Uygulama Şehri: ${data.get('city') || '-'}`,
      `Alan ve Mevcut Durum: ${data.get('details') || '-'}`,
    ].join('\n');
    window.open(`https://wa.me/905079480834?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="pzs-site">
      <div className="pzs-topbar"><div className="pzs-shell"><span><MapPin size={13} /> İstanbul merkezli</span><b>Türkiye geneli profesyonel zemin uygulaması</b><a href="#teklif">Hızlı keşif talebi <ArrowRight size={14} /></a></div></div>

      <header className="pzs-header">
        <div className="pzs-shell pzs-header__inner">
          <a className="pzs-logo" href="#anasayfa" aria-label="ZeminSilim ana sayfa"><img src="/templates/premium-zemin-silim/premium-zemin-logo.svg" alt="" /><span><strong>ZEMİN</strong><small>SİLİM</small></span></a>
          <nav className="pzs-nav" aria-label="Ana menü"><a href="#hizmetler">Hizmetler</a><a href="#donusum">Öncesi / Sonrası</a><a href="#galeri">Uygulamalar</a><a href="#surec">Çalışma Süreci</a></nav>
          <div className="pzs-header__actions"><a className="pzs-header__phone" href="tel:+905079480834"><Phone size={17} /><span>Ücretsiz keşif</span></a><a className="pzs-header__quote" href="#teklif">Teklif al <ArrowRight size={15} /></a><button aria-label="Menüyü aç" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={22} />}</button></div>
        </div>
        {menuOpen && <nav className="pzs-mobile-nav"><a href="#hizmetler" onClick={() => setMenuOpen(false)}>Hizmetler</a><a href="#donusum" onClick={() => setMenuOpen(false)}>Öncesi / Sonrası</a><a href="#galeri" onClick={() => setMenuOpen(false)}>Uygulamalar</a><a href="#surec" onClick={() => setMenuOpen(false)}>Çalışma Süreci</a><a href="#teklif" onClick={() => setMenuOpen(false)}>Teklif al</a></nav>}
      </header>

      <section className="pzs-hero" id="anasayfa">
        <div className="pzs-hero__image"><img src="/templates/premium-zemin-silim/hero-zemin-parlatma.webp" alt="Profesyonel mermer zemin silim ve parlatma uygulaması" fetchPriority="high" decoding="async" /><div className="pzs-hero__shine" /></div>
        <div className="pzs-hero__service-area"><MapPin size={18} /><span><b>İstanbul merkezli</b><small>Türkiye geneli hizmet</small></span></div>
        <div className="pzs-shell pzs-hero__content">
          <p className="pzs-eyebrow"><Sparkles size={14} /> Yüzey restorasyonunda yeni standart</p>
          <h1>Zemini değil,<br /><em>mekânı</em> yeniliyoruz.</h1>
          <p>Mermerden betona, granitten epoksiye; yüzeyin dokusuna uygun profesyonel silim, taşlama ve cila uygulamaları.</p>
          <div className="pzs-hero__actions"><a href="#teklif" className="pzs-button pzs-button--gold">Ücretsiz keşif planla <ArrowRight size={17} /></a><a href="#donusum" className="pzs-hero__link">Dönüşümü gör <MoveHorizontal size={17} /></a></div>
          <div className="pzs-hero__proof"><span><BadgeCheck size={17} /> Yüzeye özel uygulama</span><span><MapPin size={17} /> Türkiye geneli hizmet</span><span><ShieldCheck size={17} /> Kontrollü işçilik</span></div>
        </div>
        <div className="pzs-hero__index"><span>01</span><i /><small>Profesyonel<br />yüzey deneyimi</small></div>
      </section>

      <div className="pzs-marquee" aria-hidden="true"><div>ZEMİNSİLİM <span>•</span> MERMER SİLİM <span>•</span> BETON PARLATMA <span>•</span> GRANİT CİLA <span>•</span> EPOKSİ TAŞLAMA <span>•</span> TRAVERTEN <span>•</span> MOZAİK <span>•</span> MERMER SİLİM <span>•</span> BETON PARLATMA <span>•</span></div></div>

      <section className="pzs-section pzs-transformation" id="donusum">
        <div className="pzs-shell">
          <div className="pzs-heading pzs-heading--light"><div><span>DOKUNARAK İNCELEYİN</span><h2>Fark, yüzeyde<br /><em>kendini gösterir.</em></h2></div><p>Çizgiyi sağa sola hareket ettirin; mat ve yorgun yüzeyin kontrollü silim sonrası görünümünü karşılaştırın.</p></div>
          <div className="pzs-compare" style={{ '--pzs-slider': `${slider}%` } as CSSProperties}>
            <img className="pzs-compare__after" src="/templates/premium-zemin-silim/mermer-sonrasi.webp" alt="Temizlenmiş ve cilalanmış mermer zemin" loading="lazy" decoding="async" />
            <div className="pzs-compare__before"><img src="/templates/premium-zemin-silim/mermer-oncesi.webp" alt="Silim öncesi tozlu, lekeli ve kirli mermer zemin" loading="lazy" decoding="async" /></div>
            <span className="pzs-compare__tag pzs-compare__tag--before">ÖNCESİ</span><span className="pzs-compare__tag pzs-compare__tag--after">SONRASI</span>
            <input aria-label="Öncesi sonrası karşılaştırma" type="range" min="12" max="88" value={slider} onInput={(event) => setSlider(Number(event.currentTarget.value))} onChange={(event) => setSlider(Number(event.target.value))} />
            <div className="pzs-compare__handle"><MoveHorizontal size={17} /></div>
          </div>
        </div>
      </section>

      <section className="pzs-section pzs-gallery" id="galeri">
        <div className="pzs-shell">
          <div className="pzs-gallery__heading">
            <div><span>SAHADAN GERÇEK UYGULAMALAR</span><h2>İşçiliğimizi<br /><em>yakından görün.</em></h2></div>
            <div className="pzs-gallery__copy"><p>İhtiyacınız olan yüzeyi seçin; her hizmetin içinde işletmenin kendi çektiği gerçek uygulama sonuçlarını inceleyin.</p><small><span>25</span> özgün uygulama karesi</small></div>
          </div>
          <div className="pzs-application-grid">
            {projectGallery.map((category, categoryIndex) => {
              const photoIndex = galleryPhotoIndexes[category.id] ?? 0;
              const photo = category.images[photoIndex] ?? category.images[0];
              return <article key={category.id} className="pzs-application-card">
                <div className="pzs-application-card__visual">
                  <img key={`photo-${photo.src}`} src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                  <span><BadgeCheck size={14} /> Gerçek uygulama</span>
                  <small>{String(photoIndex + 1).padStart(2, '0')} / {String(category.images.length).padStart(2, '0')}</small>
                  <i key={`timer-${photo.src}`} />
                </div>
                <div className="pzs-application-card__content"><span>{String(categoryIndex + 1).padStart(2, '0')}</span><div><h3>{category.label}</h3><p>{category.description}</p><a href="#teklif">Bu uygulama için teklif al <ArrowRight size={15} /></a></div></div>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="pzs-section pzs-projects" id="projeler">
        <div className="pzs-shell">
          <div className="pzs-projects__head"><div><span>UYGULAMA ALANLARI</span><h2>Yaşayan yüzeyler,<br />kalıcı sonuçlar.</h2></div><p>Evlerden otellere, mağazalardan endüstriyel tesislere kadar yüzeye ve kullanım yoğunluğuna göre çalışma planı.</p></div>
          <div className="pzs-project-grid">{caseCards.map((card, index) => <article key={card.title}><img src={card.image} alt={card.title} loading="lazy" /><div><span>0{index + 1}</span><p>{card.label}</p><h3>{card.title}</h3><a href="#teklif">Keşif iste <ArrowRight size={16} /></a></div></article>)}</div>
          <div className="pzs-place-row"><span><Home size={18} /> Konut & villa</span><span><Hotel size={18} /> Otel & mağaza</span><span><Building2 size={18} /> Ofis & iş merkezi</span><span><Factory size={18} /> Fabrika & depo</span></div>
        </div>
      </section>

      <section className="pzs-section pzs-services" id="hizmetler">
        <div className="pzs-shell">
          <div className="pzs-heading"><div><span>UZMANLIK ALANLARI</span><h2>Her yüzeyin<br />kendi <em>karakteri</em> var.</h2></div><p>Tek tip uygulama yerine taşın ve zeminin yapısına göre doğru disk, doğru devir ve doğru bitiş seçilir.</p></div>
          <div className="pzs-service-grid">{services.map(([number, title, description]) => <button key={title} onClick={() => { setSelectedService(title); document.getElementById('teklif')?.scrollIntoView({ behavior: 'smooth' }); }}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><i><ChevronRight size={18} /></i></button>)}</div>
        </div>
      </section>

      <section className="pzs-process" id="surec"><div className="pzs-shell pzs-process__grid"><div><span>ÇALIŞMA SÜRECİ</span><h2>Net plan.<br />Temiz uygulama.</h2><p>Zemini tanır, alanı korur, doğru aşamalarla ilerler ve sonucu birlikte kontrol ederiz.</p></div><ol><li><i>01</i><div><h3>Yüzey analizi</h3><p>Malzeme, deformasyon ve alan ölçüsü değerlendirilir.</p></div><Ruler size={20} /></li><li><i>02</i><div><h3>Uygulama planı</h3><p>Disk kademesi, cila ve bitiş yöntemi netleştirilir.</p></div><Layers3 size={20} /></li><li><i>03</i><div><h3>Kontrollü silim</h3><p>Yüzey dengeli biçimde işlenir ve parlatılır.</p></div><Sparkles size={20} /></li><li><i>04</i><div><h3>Son kontrol</h3><p>Parlaklık, temizlik ve yüzey bütünlüğü kontrol edilir.</p></div><Check size={20} /></li></ol></div></section>

      <section className="pzs-quote" id="teklif"><div className="pzs-shell pzs-quote__grid"><div><span>ÜCRETSİZ ÖN DEĞERLENDİRME</span><h2>Zemininizi<br />birlikte yenileyelim.</h2><p>Yüzey türünü ve uygulama alanını iletin; ihtiyacınıza uygun çalışma planını oluşturalım.</p><div><strong>İstanbul merkezli</strong><small>Türkiye genelinde proje ve uygulama</small></div></div><form onSubmit={submitQuote}><label><span>Adınız</span><input name="name" required placeholder="Ad soyad" /></label><label><span>Telefon</span><input name="phone" required inputMode="tel" placeholder="05__ ___ __ __" /></label><label><span>Yüzey türü</span><select name="service" value={selectedService} onChange={(event) => setSelectedService(event.target.value)}>{services.map((service) => <option key={service[1]}>{service[1]}</option>)}</select></label><label><span>Uygulama şehri</span><input name="city" required placeholder="İstanbul" /></label><label className="pzs-quote__wide"><span>Alan ve mevcut durum</span><textarea name="details" placeholder="Yaklaşık m² ve zemindeki sorunları kısaca yazın" /></label><button className="pzs-button pzs-button--gold" type="submit">WhatsApp'tan teklif al <MessageCircle size={17} /></button>{activeService && <small className="pzs-form-note"><Check size={13} /> Seçilen hizmet: {activeService[1]}</small>}</form></div></section>

      <footer className="pzs-footer"><div className="pzs-shell"><div className="pzs-footer__main"><a className="pzs-logo" href="#anasayfa"><img src="/templates/premium-zemin-silim/premium-zemin-logo.svg" alt="" /><span><strong>ZEMİN</strong><small>SİLİM</small></span></a><p>Profesyonel zemin silim, taşlama, parlatma ve cila uygulamaları.</p><a href="#teklif">Keşif talebi <ArrowRight size={15} /></a></div><div className="pzs-footer__bottom"><span>© 2026 ZeminSilim</span><span>İstanbul · Türkiye geneli hizmet</span></div></div></footer>

      <div className="pzs-contact-float"><a className="pzs-contact-float__whatsapp" href="https://wa.me/905079480834?text=Merhaba%20ZeminSilim%2C%20bilgi%20ve%20teklif%20almak%20istiyorum." target="_blank" rel="noreferrer" aria-label="WhatsApp'tan yaz"><MessageCircle size={19} /><span>WhatsApp</span></a><a className="pzs-contact-float__phone" href="tel:+905079480834" aria-label="ZeminSilim'i ara"><Phone size={19} /><span>Ara</span></a></div>

    </main>
  );
}
