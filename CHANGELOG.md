# Değişim Günlüğü (Changelog)

Bu dosyada projeye ait tüm önemli güncellemeler, yeni özellikler ve düzeltmeler sürümler halinde listelenmektedir.

## [V1.1] - 2026-07-18
### Eklenenler (Yeni Özellikler)
- **Akıllı Arama Çubuğu (Search Bar):** Üst gezinme çubuğuna sektör ve meslek arayabileceğiniz dinamik bir arama kutusu eklendi. Anahtar kelimeler ile mesleklere saniyeler içinde erişilebiliyor.
- **Tarayıcı Geçmişi Entegrasyonu (History API):** Uygulama içi sayfalar arası geçişler (Sektörler -> Meslekler -> Detaylar) artık tarayıcının "Geri" ve "İleri" tuşları ile tam uyumlu hale getirildi. 
- **Dinamik Sekme Başlıkları:** Kullanıcının bulunduğu sayfaya göre tarayıcı sekme isminin dinamik olarak değişmesi sağlandı (Örn: "Diş Hekimliği ve Yapay Zeka - KSBÜ").
- **Görsel Yükleme Efekti (Skeleton Loader):** Detay sayfalarındaki yüksek çözünürlüklü görseller sunucudan indirilirken şık bir parıltı (skeleton) animasyonu gösterilecek şekilde ayarlandı.
- **Yukarı Çık Butonu (Scroll-to-Top):** Uzun sayfalarda kolaylık sağlamak için sayfanın sağ alt köşesine yumuşak geçişli bir yukarı çık butonu eklendi.
- **Favicon:** Tarayıcı sekmeleri için projeye ait özel site ikonu (logo.png) eklendi.
- **Yeni Yapay Zeka Görselleri:** Kalan 10 meslek için yüksek çözünürlüklü, otomasyon ve yapay zekayı hissettiren yeni jeneratif görseller üretilip sisteme entegre edildi.

### Değişenler
- **Logo Yönlendirmeleri:** KSBÜ logosu tıklanabilir hale getirildi ve doğrudan üniversitenin bağlantısına (https://www.ksbu.edu.tr/defaultx) yönlendirilmesi sağlandı. Yapay Zeka Topluluğu logosu ise site içinde her an "Ana Sayfaya (Sektörlere) Dönüş" görevi üstlendi.
- Arama çubuğunun detay ekranlarında göz yormaması için gizlenme kuralı eklendi.

---

## [V1.0] - İlk Sürüm
### Eklenenler
- 34 mesleği 3 ana sektör altında listeleyen temel mimari (Single Page Application) kuruldu.
- Glassmorphism (Cam efektli) tasarım sistemi ve hareketli arkaplan animasyonları eklendi.
- `data.json` tabanlı dinamik veri çekme altyapısı oluşturuldu.
- İlk 24 meslek için yüksek çözünürlüklü yapay zeka görselleri üretildi.
