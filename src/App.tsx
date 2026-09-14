import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  Factory,
  Home,
  Hotel,
  Layers3,
  MapPin,
  Mail,
  Menu,
  MessageCircle,
  MoveHorizontal,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import servicePages from './service-pages.json';

const services = servicePages.map((service) => [service.number, service.title, service.shortDescription] as const);
const SITE_SUSPENDED = true;

function MaintenancePage() {
  return (
    <main className="pzs-maintenance" aria-labelledby="pzs-maintenance-title">
      <div className="pzs-maintenance__grain" aria-hidden="true" />
      <section className="pzs-maintenance__panel">
        <div className="pzs-maintenance__brand" aria-label="ZeminSilim">
          <span>Z</span>
          <div><strong>ZEMİN</strong><small>SİLİM</small></div>
        </div>
        <div className="pzs-maintenance__status"><i aria-hidden="true" /> SERVİS BİLDİRİMİ</div>
        <h1 id="pzs-maintenance-title">Bu site geçici olarak<br />hizmet dışıdır.</h1>
        <p>Servis sağlayıcınız ile iletişime geçiniz.</p>
        <div className="pzs-maintenance__line" aria-hidden="true"><span /></div>
      </section>
      <small className="pzs-maintenance__footer">ZEMİNSİLİM · SİSTEM BİLDİRİMİ</small>
    </main>
  );
}

const faqList = [
  {
    q: 'Zemin silim işlemi nedir ve hangi yüzeylere uygulanır?',
    a: 'Zemin silim; mermer, beton, granit, karo, traverten, mozaik ve paladyen gibi sert yüzeylerde zamanla oluşan çizik, matlık, leke ve kot farklarını kademeli elmas disklerle mikron düzeyinde aşındırıp parlatma ve koruyucu cila uygulama işlemidir.',
  },
  {
    q: 'Zemin silim uygulaması sırasında ortamda toz oluşur mu?',
    a: 'Hayır. Kullandığımız endüstriyel makineler sulu silim sistemi ve yüksek vakumlu toz emiş filtreleriyle çalışır. Yaşam veya çalışma alanlarınız tozdan etkilenmez, çevre eşyalar titizlikle korunur.',
  },
  {
    q: 'Zemin silim ve parlatma m² fiyatları nasıl belirlenir?',
    a: 'Fiyatlandırma; zeminin cinsine (mermer, beton, granit vb.), alanın büyüklüğüne (m²), mevcut yıpranma/çizik derinliğine ve hedeflenen parlaklık seviyesine (mat, saten veya kristalize ayna parlaklığı) göre ücretsiz yerinde keşif sonrası netleştirilir.',
  },
  {
    q: 'Mermer veya beton silimi ne kadar sürer?',
    a: 'Uygulama süresi alanın büyüklüğüne ve deformasyon durumuna bağlıdır. Ortalama 50-150 m² konut, mağaza veya ofis zeminleri genellikle 1-2 iş gününde tamamlanarak kullanıma hazır teslim edilir.',
  },
  {
    q: 'Türkiye genelinde hangi şehirlere hizmet veriyorsunuz?',
    a: 'Merkezimiz İstanbul olmakla birlikte; Türkiye’nin 81 ilindeki villa, otel, fabrika, depo, mağaza ve kurumsal projeler için mobil ekip ve yerinde keşif imkânıyla profesyonel hizmet sunuyoruz.',
  },
];

const caseCards = [
  { title: 'Doğal taş & mermer', label: 'KONUT · OTEL · OFİS', image: '/templates/premium-zemin-silim/mermer-donusum.webp' },
  { title: 'Endüstriyel beton', label: 'FABRİKA · DEPO · OTOPARK', image: '/templates/premium-zemin-silim/beton-silim.webp' },
  { title: 'Traverten & mozaik', label: 'MAĞAZA · LOBİ · VİLLA', image: '/templates/premium-zemin-silim/dogal-tas.webp' },
];

const legalPages = {
  '/gizlilik-politikasi': {
    kicker: 'KVKK AYDINLATMA METNİ',
    title: 'Gizlilik Politikası',
    updated: '30 Ağustos 2026',
    sections: [
      ['Veri sorumlusu ve kapsam', 'Bu metin, Premium Zemin Silim internet sitesi üzerinden teklif veya iletişim talebi oluşturan ziyaretçilerin kişisel verilerinin işlenmesi hakkında bilgi verir. Veri sorumlusu Premium Zemin Silim’dir. Adres: Esenkent, Leylek Sk No:46 D:1, 34776 Ümraniye/İstanbul. İletişim: premiumzeminsilim@gmail.com ve +90 507 948 08 34.'],
      ['Toplanan bilgiler', 'Teklif formunu kullanmanız hâlinde ad-soyad, telefon, uygulama şehri, seçilen hizmet ile alanın mevcut durumuna ilişkin açıklamalar işlenebilir. Site formu bu bilgileri kendi sunucusunda saklamaz; gönderim işlemi, onayınızla WhatsApp uygulamasına veya web sitesine yönlendirilerek tamamlanır.'],
      ['İşleme amaçları ve hukuki sebep', 'Bilgiler; talebinizi değerlendirmek, keşif planlamak, teklif hazırlamak, sizinle iletişim kurmak ve olası hizmet ilişkisinin kurulması veya ifası amaçlarıyla işlenir. İşleme; talebiniz üzerine sözleşmenin kurulması veya ifasıyla doğrudan ilgili olma, hukuki yükümlülüklerin yerine getirilmesi ve meşru menfaat hukuki sebeplerine dayanabilir.'],
      ['Aktarım ve saklama', 'WhatsApp üzerinden iletişim kurduğunuzda bilgileriniz WhatsApp/Meta altyapısı üzerinden işlenebilir ve ilgili hizmetin kendi gizlilik koşulları geçerli olur. Bilgiler yalnızca hizmetin yürütülmesi, yasal yükümlülükler veya yetkili makam talepleri için gerekli olduğu ölçüde paylaşılır; amaç için gerekli süre ve mevzuattaki zorunlu saklama süreleri boyunca tutulur.'],
      ['Haklarınız', '6698 sayılı KVKK’nın 11. maddesi kapsamındaki bilgi alma, düzeltme, silme veya yok etme, işlemeye itiraz ve kanuna aykırı işleme nedeniyle zararın giderilmesini talep etme haklarınız için premiumzeminsilim@gmail.com adresine veya +90 507 948 08 34 numarasına başvurabilirsiniz. Kimlik doğrulaması ve talebin niteliğine göre ek bilgi istenebilir.'],
    ],
  },
  '/cerez-politikasi': {
    kicker: 'ŞEFFAF TEKNOLOJİ KULLANIMI',
    title: 'Çerez Politikası',
    updated: '30 Ağustos 2026',
    sections: [
      ['Mevcut kullanım', 'ZeminSilim sitesi şu anda reklam, davranışsal takip veya analitik amaçlı çerez kullanmaz. Siteyi görüntülemek için zorunlu olmayan bir çerez yerleştirilmediğinden ayrıca bir çerez onay bandı gösterilmez.'],
      ['Üçüncü taraf bağlantıları', 'Telefon ve WhatsApp bağlantılarını seçtiğinizde üçüncü taraf bir uygulama veya web sitesi açılır. Bu hizmetler kendi çerezlerini ve benzer teknolojilerini kendi politikalarına göre kullanabilir; söz konusu işlemler ZeminSilim sitesinin kontrolü dışındadır.'],
      ['Gelecekteki değişiklikler', 'Analitik, reklam veya zorunlu olmayan başka bir teknoloji eklenirse, bu politika kullanılmaya başlanmadan önce güncellenir ve gerekli olduğu ölçüde ziyaretçiden tercih veya açık onay alınmasını sağlayan bir mekanizma sunulur.'],
      ['Tarayıcı kontrolleri', 'Çerezleri tarayıcınızın ayarlarından görüntüleyebilir, silebilir veya engelleyebilirsiniz. Zorunlu teknolojilerin engellenmesi bazı site işlevlerinin beklenen şekilde çalışmamasına neden olabilir.'],
    ],
  },
  '/kullanim-kosullari': {
    kicker: 'HİZMET VE KULLANIM ÇERÇEVESİ',
    title: 'Kullanım ve Hizmet Koşulları',
    updated: '30 Ağustos 2026',
    sections: [
      ['Sitenin amacı', 'Bu site; zemin silim, taşlama, parlatma ve cila hizmetleri hakkında bilgi sunar ve keşif/teklif talebi iletmeyi kolaylaştırır. Sitedeki genel açıklamalar tek başına kesin fiyat, süre veya sonuç taahhüdü oluşturmaz.'],
      ['Keşif ve teklif', 'Uygulama yöntemi, fiyat, süre ve malzeme seçimi; yüzey türü, metraj, hasar, erişim şartları ve çalışma alanı incelendikten sonra netleşir. Bağlayıcı hizmet kapsamı tarafların yazılı veya kalıcı veri saklayıcısı üzerinden onayladığı teklifte belirlenir.'],
      ['Müşteri sorumlulukları', 'Müşteri, yüzey ve çalışma alanıyla ilgili verdiği bilgilerin doğru olmasını; alanın erişime, elektrik ve su kullanımına ve kararlaştırılan çalışma koşullarına uygun şekilde hazırlanmasını sağlar. Gizli tesisat veya önceden bilinmeyen yapısal sorunlar keşif sırasında ayrıca değerlendirilir.'],
      ['İfa, değişiklik ve iptal', 'Uygulama tarihi, ödeme planı, ek işler ve olası değişiklikler hizmete özel teklifte belirtilir. Mesafeli yöntemle bir tüketici sözleşmesi kurulması hâlinde, yürürlükteki tüketici mevzuatındaki ön bilgilendirme ve cayma hakları saklıdır. Cayma süresi dolmadan hizmete başlanması ancak mevzuatın gerektirdiği açık talep/onay çerçevesinde değerlendirilir.'],
      ['Fikrî haklar ve site kullanımı', 'Sitedeki metin, tasarım, marka öğeleri ve işletmeye ait uygulama görselleri izin olmadan ticari amaçla kopyalanamaz. Site; hukuka aykırı müdahale, otomatik kötüye kullanım veya yanıltıcı talep oluşturmak amacıyla kullanılamaz.'],
      ['Sağlayıcı ve iletişim bilgileri', 'Hizmet sağlayıcı: Premium Zemin Silim. Adres: Esenkent, Leylek Sk No:46 D:1, 34776 Ümraniye/İstanbul. E-posta: premiumzeminsilim@gmail.com. Telefon: +90 507 948 08 34.'],
      ['İletişim ve uyuşmazlıklar', 'Talep, iptal veya şikâyetlerinizi premiumzeminsilim@gmail.com adresine veya +90 507 948 08 34 numarasına iletebilirsiniz. Tüketicilerin yürürlükteki mevzuattan doğan Tüketici Hakem Heyeti, Tüketici Mahkemesi ve diğer başvuru hakları saklıdır.'],
    ],
  },
} as const;

type LegalPath = keyof typeof legalPages;

function LegalPage({ page }: { page: (typeof legalPages)[LegalPath] }) {
  return <main className="pzs-legal-page">
    <header><div className="pzs-shell"><a className="pzs-logo" href="/"><img src="/templates/premium-zemin-silim/premium-zemin-logo.svg" alt="" /><span><strong>ZEMİN</strong><small>SİLİM</small></span></a><a href="/">Ana sayfaya dön <ArrowRight size={15} /></a></div></header>
    <article className="pzs-shell"><span>{page.kicker}</span><h1>{page.title}</h1><p className="pzs-legal-updated">Son güncelleme: {page.updated}</p>{page.sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}</article>
    <footer><div className="pzs-shell"><nav><a href="/gizlilik-politikasi">Gizlilik</a><a href="/cerez-politikasi">Çerezler</a><a href="/kullanim-kosullari">Kullanım Koşulları</a></nav><span>© 2026 ZeminSilim</span></div></footer>
  </main>;
}

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

function ZeminSilimSite() {
  const legalPage = legalPages[window.location.pathname.replace(/\/$/, '') as LegalPath];
  const serviceSlug = window.location.pathname.match(/^\/hizmetler\/([^/]+)\/?$/)?.[1];
  const seoService = servicePages.find((service) => service.slug === serviceSlug);
  const [menuOpen, setMenuOpen] = useState(false);
  const [slider, setSlider] = useState(52);
  const [selectedService, setSelectedService] = useState(seoService?.title || 'Mermer Silim ve Cila');
  const [galleryPhotoIndexes, setGalleryPhotoIndexes] = useState<Record<string, number>>(() => Object.fromEntries(projectGallery.map((category) => [category.id, 0])));
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
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

  if (legalPage) return <LegalPage page={legalPage} />;

  return (
    <main className="pzs-site">
      <div className="pzs-topbar"><div className="pzs-shell"><span><MapPin size={13} /> Türkiye Geneli Hizmet</span><b>81 İlde Profesyonel Zemin Silim ve Cila</b><a href="#teklif">Ücretsiz Keşif Alın <ArrowRight size={14} /></a></div></div>

      <header className="pzs-header">
        <div className="pzs-shell pzs-header__inner">
          <a className="pzs-logo" href={seoService ? '/' : '#anasayfa'} aria-label="ZeminSilim ana sayfa"><img src="/templates/premium-zemin-silim/premium-zemin-logo.svg" alt="" /><span><strong>ZEMİN</strong><small>SİLİM</small></span></a>
          <nav className="pzs-nav" aria-label="Ana menü"><a href="#hizmetler">Hizmetler</a><a href="#donusum">Öncesi / Sonrası</a><a href="#galeri">Uygulamalar</a><a href="#surec">Çalışma Süreci</a><a href="#sss">Sıkça Sorulanlar</a></nav>
          <div className="pzs-header__actions"><a className="pzs-header__phone" href="tel:+905079480834"><Phone size={17} /><span>Ücretsiz keşif</span></a><a className="pzs-header__quote" href="#teklif">Teklif al <ArrowRight size={15} /></a><button aria-label="Menüyü aç" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={22} />}</button></div>
        </div>
        {menuOpen && <nav className="pzs-mobile-nav"><a href="#hizmetler" onClick={() => setMenuOpen(false)}>Hizmetler</a><a href="#donusum" onClick={() => setMenuOpen(false)}>Öncesi / Sonrası</a><a href="#galeri" onClick={() => setMenuOpen(false)}>Uygulamalar</a><a href="#surec" onClick={() => setMenuOpen(false)}>Çalışma Süreci</a><a href="#sss" onClick={() => setMenuOpen(false)}>Sıkça Sorulanlar</a><a href="#teklif" onClick={() => setMenuOpen(false)}>Teklif al</a></nav>}
      </header>

      {seoService ? <>
        <section className="pzs-service-hero" id="anasayfa">
          <div className="pzs-service-hero__image"><img src={seoService.image} alt={`${seoService.title} uygulaması`} fetchPriority="high" decoding="async" /></div>
          <div className="pzs-shell pzs-service-hero__content">
            <p className="pzs-eyebrow"><Sparkles size={14} /> {seoService.number} · Profesyonel yüzey uygulaması</p>
            <nav aria-label="Sayfa yolu"><a href="/">Anasayfa</a><ChevronRight size={13} /><span>{seoService.title}</span></nav>
            <h1>{seoService.title}</h1>
            <h2>{seoService.heading}</h2>
            <p>{seoService.intro}</p>
            <div className="pzs-hero__actions"><a href="#teklif" className="pzs-button pzs-button--gold">Ücretsiz keşif planla <ArrowRight size={17} /></a><a href="tel:+905079480834" className="pzs-hero__link"><Phone size={17} /> Hemen arayın</a></div>
          </div>
        </section>
        <section className="pzs-service-detail"><div className="pzs-shell">
          <div className="pzs-service-detail__intro"><span>UYGULAMA REHBERİ</span><h2>{seoService.title} nasıl uygulanır?</h2></div>
          <div className="pzs-service-detail__grid">
            <article><span>01</span><h3>Yüzey analizi</h3><p>{seoService.diagnosis}</p></article>
            <article><span>02</span><h3>Uygulama yöntemi</h3><p>{seoService.method}</p></article>
            <article><span>03</span><h3>Hedeflenen sonuç</h3><p>{seoService.result}</p></article>
          </div>
          <div className="pzs-service-detail__uses"><strong>Uygun kullanım alanları</strong>{seoService.useCases.map((item) => <span key={item}><Check size={14} /> {item}</span>)}</div>
        </div></section>
      </> : <section className="pzs-hero" id="anasayfa">
        <div className="pzs-hero__image"><img src="/templates/premium-zemin-silim/hero-zemin-parlatma.webp" alt="Türkiye geneli profesyonel zemin silim ve parlatma uygulaması" fetchPriority="high" decoding="async" /><div className="pzs-hero__shine" /></div>
        <div className="pzs-hero__service-area"><MapPin size={18} /><span><b>Türkiye Geneli</b><small>81 İlde Hizmet & Keşif</small></span></div>
        <div className="pzs-shell pzs-hero__content">
          <p className="pzs-eyebrow"><Sparkles size={14} /> Türkiye Geneli Profesyonel Yüzey Uygulamaları</p>
          <h1>Türkiye Geneli<br /><em>Zemin Silim</em> ve Cila</h1>
          <p>Zemini değil, <em>mekânı</em> yeniliyoruz. Türkiye genelinde mermerden betona, granitten epoksiye; yüzeyin dokusuna uygun profesyonel silim, taşlama, parlatma ve koruyucu cila uygulamaları.</p>
          <div className="pzs-hero__actions"><a href="#teklif" className="pzs-button pzs-button--gold">Ücretsiz keşif planla <ArrowRight size={17} /></a><a href="#donusum" className="pzs-hero__link">Dönüşümü gör <MoveHorizontal size={17} /></a></div>
          <div className="pzs-hero__proof"><span><BadgeCheck size={17} /> Yüzeye özel uygulama</span><span><MapPin size={17} /> 81 İl mobil ekip</span><span><ShieldCheck size={17} /> Tozsuz & garantili işçilik</span></div>
        </div>
        <div className="pzs-hero__index"><span>01</span><i /><small>Profesyonel<br />yüzey deneyimi</small></div>
      </section>}

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
          <div className="pzs-service-grid">{services.map(([number, title, description], index) => <a key={title} href={`/hizmetler/${servicePages[index].slug}`}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><i><ChevronRight size={18} /></i></a>)}</div>
        </div>
      </section>

      <section className="pzs-process" id="surec"><div className="pzs-shell pzs-process__grid"><div><span>ÇALIŞMA SÜRECİ</span><h2>Net plan.<br />Temiz uygulama.</h2><p>Zemini tanır, alanı korur, doğru aşamalarla ilerler ve sonucu birlikte kontrol ederiz.</p></div><ol><li><i>01</i><div><h3>Yüzey analizi</h3><p>Malzeme, deformasyon ve alan ölçüsü değerlendirilir.</p></div><Ruler size={20} /></li><li><i>02</i><div><h3>Uygulama planı</h3><p>Disk kademesi, cila ve bitiş yöntemi netleştirilir.</p></div><Layers3 size={20} /></li><li><i>03</i><div><h3>Kontrollü silim</h3><p>Yüzey dengeli biçimde işlenir ve parlatılır.</p></div><Sparkles size={20} /></li><li><i>04</i><div><h3>Son kontrol</h3><p>Parlaklık, temizlik ve yüzey bütünlüğü kontrol edilir.</p></div><Check size={20} /></li></ol></div></section>

      <section className="pzs-section pzs-faq" id="sss">
        <div className="pzs-shell pzs-faq__grid">
          <div className="pzs-faq__intro">
            <span>MERAK EDİLENLER</span>
            <h2>Sıkça sorulan<br /><em>sorular.</em></h2>
            <p>Zemin silim, parlatma, tozsuz çalışma yöntemi, süreler ve fiyatlandırma süreçleri hakkında en çok merak edilen konular.</p>
            <a href="#teklif">Farklı bir sorunuz mu var? Teklif Alın <ArrowRight size={15} /></a>
          </div>
          <div className="pzs-faq__list">
            {faqList.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={item.q} className="pzs-faq__item">
                  <button
                    className="pzs-faq__button"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  >
                    <span>{item.q}</span>
                    <ChevronDown size={18} />
                  </button>
                  {isOpen && (
                    <div className="pzs-faq__answer">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pzs-quote" id="teklif"><div className="pzs-shell pzs-quote__grid"><div><span>ÜCRETSİZ ÖN DEĞERLENDİRME</span><h2>Zemininizi<br />birlikte yenileyelim.</h2><p>Yüzey türünü ve uygulama alanını iletin; ihtiyacınıza uygun çalışma planını oluşturalım.</p><div><strong>Türkiye Geneli Hizmet</strong><small>81 İlde yerinde keşif ve uygulama</small></div></div><form onSubmit={submitQuote}><label><span>Adınız</span><input name="name" required placeholder="Ad soyad" /></label><label><span>Telefon</span><input name="phone" required inputMode="tel" placeholder="05__ ___ __ __" /></label><label><span>Yüzey türü</span><select name="service" value={selectedService} onChange={(event) => setSelectedService(event.target.value)}>{services.map((service) => <option key={service[1]}>{service[1]}</option>)}</select></label><label><span>Uygulama şehri</span><input name="city" required placeholder="Şehir yazınız" /></label><label className="pzs-quote__wide"><span>Alan ve mevcut durum</span><textarea name="details" placeholder="Yaklaşık m² ve zemindeki sorunları kısaca yazın" /></label><button className="pzs-button pzs-button--gold" type="submit">WhatsApp'tan teklif al <MessageCircle size={17} /></button>{activeService && <small className="pzs-form-note"><Check size={13} /> Seçilen hizmet: {activeService[1]}</small>}</form></div></section>

      <footer className="pzs-footer">
        <div className="pzs-shell">
          <div className="pzs-footer__top">
            <div className="pzs-footer__brand">
              <a className="pzs-logo" href="#anasayfa" aria-label="ZeminSilim ana sayfa">
                <img src="/templates/premium-zemin-silim/premium-zemin-logo.svg" alt="" />
                <span><strong>ZEMİN</strong><small>SİLİM</small></span>
              </a>
              <p>Türkiye genelinde profesyonel zemin silim, taşlama, parlatma ve cila uygulamaları.</p>
              <a className="pzs-footer__cta" href="#teklif">Ücretsiz keşif iste <ArrowRight size={15} /></a>
            </div>

            <nav className="pzs-footer__column" aria-label="Hızlı menü">
              <h2>Hızlı Menü</h2>
              <a href="#anasayfa">Anasayfa</a>
              <a href="#hizmetler">Hizmetlerimiz</a>
              <a href="#galeri">Uygulamalar</a>
              <a href="#surec">Çalışma Süreci</a>
              <a href="#sss">Sıkça Sorulanlar</a>
              <a href="#teklif">Bize Ulaşın</a>
            </nav>

            <nav className="pzs-footer__column" aria-label="Hizmetlerimiz">
              <h2>Hizmetlerimiz</h2>
              {servicePages.slice(0, 5).map((service) => (
                <a key={service.slug} href={`/hizmetler/${service.slug}`}>{service.title}</a>
              ))}
            </nav>

            <div className="pzs-footer__column pzs-footer__contact">
              <h2>İletişim Bilgileri</h2>
              <p><MapPin size={17} /><span>Esenkent, Leylek Sk No:46 D:1<br />34776 Ümraniye/İstanbul</span></p>
              <a href="tel:+905079480834"><Phone size={17} /><span>+90 507 948 08 34</span></a>
              <a href="mailto:premiumzeminsilim@gmail.com"><Mail size={17} /><span>premiumzeminsilim@gmail.com</span></a>
              <a href="https://wa.me/905079480834?text=Merhaba%20ZeminSilim%2C%20bilgi%20ve%20teklif%20almak%20istiyorum." target="_blank" rel="noreferrer"><MessageCircle size={17} /><span>WhatsApp'tan yazın</span></a>
            </div>
          </div>
          <div className="pzs-footer__bottom"><span>© 2026 ZeminSilim. Tüm hakları saklıdır.</span><span>Türkiye Geneli Profesyonel Hizmet · 81 İl</span></div>
          <nav className="pzs-footer__legal" aria-label="Yasal bağlantılar"><a href="/gizlilik-politikasi">Gizlilik Politikası</a><a href="/cerez-politikasi">Çerez Politikası</a><a href="/kullanim-kosullari">Kullanım ve Hizmet Koşulları</a></nav>
        </div>
      </footer>

      <div className="pzs-contact-float"><a className="pzs-contact-float__whatsapp" href="https://wa.me/905079480834?text=Merhaba%20ZeminSilim%2C%20bilgi%20ve%20teklif%20almak%20istiyorum." target="_blank" rel="noreferrer" aria-label="WhatsApp'tan yaz"><MessageCircle size={19} /><span>WhatsApp</span></a><a className="pzs-contact-float__phone" href="tel:+905079480834" aria-label="ZeminSilim'i ara"><Phone size={19} /><span>Ara</span></a></div>

    </main>
  );
}

export default function ZeminSilimPage() {
  return SITE_SUSPENDED ? <MaintenancePage /> : <ZeminSilimSite />;
}
