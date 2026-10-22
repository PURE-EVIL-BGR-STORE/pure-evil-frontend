# PURE EVIL STORE — DESIGN CONCEPT & ARCHITECTURAL PLAYBOOK
> **Concept:** *Controlled Insanity x Pure Evil Store* — Streetwear & Gymwear Luxury đặt trong không gian Contemporary Gallery White.  
> **Tài liệu tham chiếu chuẩn cho Developer & AI Agent across all context sessions.**

---

## MỤC LỤC
1. [Triết lý Thiết Kế: Controlled Insanity](#1-triết-lý-thiết-kế-controlled-insanity)
2. [Hệ Thống Design Tokens & Quy Chuẩn Giao Diện](#2-hệ-thống-design-tokens--quy-chuẩn-giao-diện)
3. [Cấu Trúc Mặt Tiền 4 Tầng Trải Nghiệm (Drop Archive & Concept Store)](#3-cấu-trúc-mặt-tiền-4-tầng-trải-nghiệm)
4. [Master Plan Sản Xuất Áo: Xịn – Bụi – Vốn Nhẹ](#4-master-plan-sản-xuất-áo-xịn--bụi--vốn-nhẹ)
5. [Bài Học Kinh Nghiệm & Lời Tự Nhắc Cho AI Agent (Self-Reflection)](#5-bài-học-kinh-nghiệm--lời-tự-nhắc-cho-ai-agent)
6. [Lời Khuyên Giữ Vững Mindset (Brand & Technical Excellence)](#6-lời-khuyên-giữ-vững-mindset)

---

## 1. TRIẾT LÝ THIẾT KẾ: CONTROLLED INSANITY

### 1.1. Sức Hút Của Sự Đối Lập Cực Độ
- **Sản phẩm:** Mang tinh thần ngầm (*underground*), nổi loạn có kiểm soát (*controlled insanity*), lấy cảm hứng từ streetwear/gymwear oversized hầm hố, màu sắc wash bụi bặm (Acid Wash, Mineral Wash, Charcoal), đồ họa Gothic Sigil và huy hiệu kim loại sắc lẹm.
- **Không gian hiển thị (Web Container):** Tinh khiết như một phòng triển lãm đương đại (*Gallery White* `#F9F9F8`), ánh sáng trong trẻo, lề trang thoáng đãng, phân chia hình khối rành mạch, typography chuẩn mực.
- **Hiệu ứng tâm lý:** Đặt một sản phẩm "bụi, ngầu, gai góc" vào một không gian "trắng, sáng, sạch, tối giản" tạo nên cảm giác **Luxury & High-Fashion**, nâng giá trị cảm nhận (*Perceived Value*) của sản phẩm lên gấp nhiều lần so với các shop đại trà trên thị trường.

---

## 2. HỆ THỐNG DESIGN TOKENS & QUY CHUẨN GIAO DIỆN

Tất cả code giao diện phải tuân thủ nghiêm ngặt hệ thống Design Tokens đã định nghĩa tại `src/app/globals.css` và `src/shared/constants/index.ts`:

### 2.1. Bảng Màu (Color Tokens)
| Token | Giá trị HEX / RGBA | Vai trò sử dụng |
| :--- | :--- | :--- |
| `--background` | `#F9F9F8` | Nền trang chủ đạo (Gallery White ấm nhẹ, không gắt mắt) |
| `--surface` | `#FFFFFF` | Thẻ card, modal dialog, dropdown, thanh navigation |
| `--surface-warm` | `#F2ECE3` | Khối banner phụ, section nhấn mạnh vật liệu |
| `--text-primary` | `#111111` | Tiêu đề chính, văn bản quan trọng, button primary |
| `--text-secondary` | `#666666` | Mô tả phụ, hướng dẫn, nhãn bổ trợ |
| `--text-tertiary` | `#8E8E8E` | Placeholder, ngày tháng, thông số kỹ thuật mờ |
| `--accent` | `#C19A6B` | Màu nhấn vàng cát/camel luxury, highlight icon, link hover |
| `--accent-hover` | `#B0895C` | Trạng thái hover của màu nhấn cam |
| `--brand-steel` | `#2D3F52` | Màu xanh thép kim loại chủ đạo lấy trực tiếp từ Logo Huy hiệu |
| `--brand-steel-dark` | `#182B3F` | Màu xanh đen sâu của bóng kim loại Logo |
| `--brand-steel-light`| `#7E8E9F` | Ánh bạc/chrome phản quang của Logo (dùng cho pulse dot Drop 01) |
| `--border` | `rgba(0, 0, 0, 0.25)` | Đường viền ngăn cách rõ nét |
| `--border-subtle` | `rgba(0, 0, 0, 0.10)` | Đường hairline tinh tế phân tách các section |

### 2.2. Typography Scale
- **Headings & Accents:** `Inter` (Bold, SemiBold) kết hợp `Anton` (cho các số drop, title đanh thép, tác động thị giác mạnh).
- **Body & Captions:** `Geist` (Hiện đại, tối giản, hiển thị tiếng Việt và tiếng Anh cực kỳ thanh thoát).
- **Class tiện ích sẵn có:**
  - `.type-display`: `clamp(2.5rem, 5.5vw, 4rem)`, `font-weight: 700`, `letter-spacing: -0.025em`.
  - `.type-h1`: `clamp(2rem, 3.5vw, 2.5rem)`, `font-weight: 600`.
  - `.type-h2`: `clamp(1.5rem, 2.5vw, 2rem)`, `font-weight: 600`.
  - `.eyebrow`: Chữ in hoa tracking `0.15em`, kèm dấu chấm hoặc icon accent (`#C19A6B`).

---

## 3. CẤU TRÚC MẶT TIỀN 4 TẦNG TRẢI NGHIỆM

Khi kho hàng đang ở giai đoạn Drop hoặc Concept thử nghiệm, mô hình **"DROP ARCHIVE & CONCEPT STORE"** giúp biến giao diện thành một bảo tàng số cao cấp gồm 4 tầng:

```
+---------------------------------------------------------------+
| SiteNav (Sticky, Gallery White, 3 Columns, Cart & Search)     |
+---------------------------------------------------------------+
| TẦNG 1: Cinematic Editorial Hero Banner (h-[76vh])            |
| - Emerald Pulsing Badge: DROP 001 // CONTROLLED INSANITY      |
| - Headline: BỤI BẶM TRONG TỪNG ĐƯỜNG CẮT TỐI GIẢN.            |
| - Dual CTAs: Khám Phá Catalog | Câu Chuyện Thương Hiệu        |
| - 4-Pillar Quality Commitment Bar (300GSM, Boxy, 14d đổi trả) |
+---------------------------------------------------------------+
| TẦNG 2: Asymmetric Bento Catalog (Phân khu lệch nhịp)         |
| - Khối Lớn (Col-7): Áo Thun Oversized & Wash (Signature Line)  |
| - Khối Nhỏ 1 (Col-5): Quần Cargo & Sweatpants                 |
| - Khối Nhỏ 2 (Col-5): Hoodie Distressed 480GSM                |
| - Hiệu ứng Silky Smooth Zoom (Scale 105%) & Arrow Rotate 45°  |
+---------------------------------------------------------------+
| TẦNG 3: Interactive Catalog Grid + Quick-Buy Frosted Bar      |
| - Bộ lọc danh mục tức thì (All, Tees, Hoodies, Bottoms)       |
| - Lưới ảnh tỉ lệ 4:5 chuẩn Luxury Streetwear                  |
| - Dual Image Cross-fade (Ảnh chính -> Ảnh lookbook khi hover)  |
| - Quick-Buy Bar (Kính mờ frosted glass trượt lên khi hover)    |
| - Thêm nhanh Size (S, M, L, XL) -> Bắn Toast Notification     |
| - Bảng Size Modal Dialog hiển thị số đo chi tiết             |
+---------------------------------------------------------------+
| TẦNG 4: Brand Intimacy & Craft Philosophy                     |
| - Huy hiệu kim loại nổi 3D (pure-evil-emblem.png)             |
| - Tuyên ngôn chế tác: "Vẻ ngoài gai góc. Êm ái như làn da 2" |
| - 3 Trụ Cột: Cotton 300GSM | Acid & Mineral Wash | Bo cổ 3cm  |
+---------------------------------------------------------------+
| SiteFooter: Triết lý thương hiệu, Liên kết, Copyright         |
+---------------------------------------------------------------+
```

---

## 4. MASTER PLAN SẢN XUẤT ÁO: XỊN – BỤI – VỐN NHẸ

Để hiện thực hóa sản phẩm với độ hoàn thiện sánh ngang các local brand quốc tế mà không bị chôn vốn:

### 4.1. "Công Thức Vàng" 4 Thông Số Kỹ Thuật (Techpack)
1. **Chất liệu vải:** Cotton 2 chiều chính phẩm (100% Cotton), định lượng **280 GSM – 300 GSM**. Dệt sợi 2 chiều để giữ form Boxy đứng áo, tôn bờ vai áo, không bị chảy nhão sau khi giặt.
2. **Xử lý bề mặt:** Acid Wash / Mineral Wash / Snow Wash tạo ánh Đen Khói (*Washed Black*) hoặc Xám Chì (*Vintage Charcoal*). Xử lý giặt enzyme làm mềm sớ vải.
3. **Bo cổ áo (Điểm nhận diện luxury):** Bo cổ dệt gân đôi bản to **2.5cm – 3.0cm**, bo ôm sát chân cổ, không bai dão.
4. **Form áo:** Boxy Oversized – cầu vai trễ (*drop shoulder*), ống tay rộng chạm khuỷu, chiều dài thân áo vừa vặn ngang hông (*pump cover proportion*).

### 4.2. Chiến Lược 2 Giai Đoạn (Tránh Tồn Kho)
- **Giai đoạn 1 (Khởi động 15 – 30 áo/mẫu):**  
  Nhập **Phôi áo (Blank Tee)** cao cấp may sẵn chuẩn Boxy 280-300GSM Acid Wash tại các xưởng uy tín (giá phôi ~115k – 145k). Sau đó đem gia công in (In Lụa Plastisol / Discharge kết hợp In Nổi Puff Print) và đính Tag Woven Label hoặc Tag kim loại. Tổng giá vốn hoàn thiện chỉ khoảng **165k – 210k/áo**, bán ra ở mức **450k – 680k/áo**.
- **Giai đoạn 2 (Quy mô từ 100 áo/mẫu):**  
  Đặt may FOB độc quyền, tự nhảy rập theo bảng thông số riêng, nhuộm và wash theo màu pantone độc quyền của PURE EVIL.

---

## 5. BÀI HỌC KINH NGHIỆM & LỜI TỰ NHẮC CHO AI AGENT
*(Dành cho chính mình và bất kỳ AI Agent nào tiếp quản project ở các context sau)*

### ⚠️ QUY TẮC SỐNG CÒN 1: Quét Workspace Hiện Tại Trước Khi Code (Zero Hallucination)
- **Không bao giờ bịa đặt thư viện UI:** Luôn kiểm tra `package.json` trước. Dự án này dùng `@radix-ui/react-dialog`, `lucide-react`, `tailwind-merge`, `clsx`, `next-intl` (Next.js 16 + React 19). **Không được tự ý import component ngoài danh mục có sẵn**.
- **Tôn trọng Design Tokens:** Tuyệt đối không hardcode các mã màu ngẫu nhiên (như `#ff0000`, `blue-500`). Luôn dùng tokens: `bg-background`, `text-text-primary`, `text-accent`, hoặc CSS variables `--background`, `--accent`.

### ⚠️ QUY TẮC SỐNG CÒN 2: Tuyệt Đối Không Tự Commit Code Nếu Không Có Lệnh
- Lệnh của USER: *"Không commit code nếu k cho phép nhé"*. Luôn giữ code ở trạng thái modified/staged trên working tree, kiểm tra linting và build sạch sẽ, để người dùng toàn quyền quyết định khi nào commit và push.

### ⚠️ QUY TẮC SỐNG CÒN 3: Giữ Đúng Cấu Trúc Architecture
- Cấu trúc thư mục theo Feature-Driven:
  - `src/features/[feature-name]/components/`
  - `src/features/[feature-name]/views/`
  - `src/features/[feature-name]/data/` hoặc `services/`
  - `src/features/[feature-name]/messages/`
  - `src/shared/ui/` cho các component nền tảng (button, dialog, toast, sheet, card).
  - `src/shared/constants/` cho hằng số thương hiệu, routes, design tokens.

### ⚠️ QUY TẮC SỐNG CÒN 4: Thẩm Mỹ Phải Ở Tầm State-of-the-Art (Không Làm MVP Rẻ Tiền)
- Nếu giao diện trông giống một template bán hàng bình dân hay MVP sơ sài, đó là một **thất bại**.
- Phải có các chi tiết hoàn thiện cao cấp:
  - Hiệu ứng kính mờ (*frosted glass* `backdrop-blur-md bg-white/90`).
  - Chuyển động vi mô mượt mà (*micro-animations*, hover cross-fade, slide-up).
  - Tương tác phản hồi tức thời (*Toast Notification* khi thêm giỏ, Modal số đo chi tiết).

---

## 6. LỜI KHUYÊN GIỮ VỮNG MINDSET (BRAND & TECHNICAL EXCELLENCE)

1. **Thương hiệu thời trang bán "cảm xúc và sự tự tin", không chỉ bán vải vóc:**
   Mỗi câu chữ (*microcopy*), nhãn dán, hay thông số GSM hiển thị trên web đều phục vụ việc xây dựng sự tin tưởng và khẳng định phong cách của người mua.
2. **Kỹ thuật sạch tạo nền móng vững:**
   Type-safe 100% (`tsc --noEmit` code 0), ESLint không cảnh báo, hình ảnh tối ưu kích thước, hỗ trợ song ngữ (VI/EN) sẵn sàng vươn ra quốc tế.
3. **Đồng hành như một Co-founder:**
   Luôn suy nghĩ cho bài toán kinh doanh thực tế của người dùng: từ dòng vốn khởi nghiệp, cách làm việc với xưởng, đến từng cú click chuột của khách hàng trên trang web.
