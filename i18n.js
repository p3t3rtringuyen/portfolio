/* English / Vietnamese switch.
 *
 * English is the page's own markup. Every translatable element is found by its
 * normalised text (whitespace collapsed) and swapped for the Vietnamese HTML below,
 * so there is no per-element attribute to maintain: reword the English in index.html
 * and add or change the same key here. A key that no element matches is simply unused.
 * Technology names (React, Next.js, TanStack Query …) stay in English on purpose.
 */
(function () {
  var root = document.documentElement;

  var VI = {
    // ---- page chrome
    'Skip to content': 'Bỏ qua, tới nội dung',
    'About': 'Giới thiệu', 'Skills': 'Kỹ năng', 'Projects': 'Dự án', 'Experience': 'Kinh nghiệm', 'Team': 'Đội nhóm', 'Contact': 'Liên hệ',
    'Toggle colour theme': 'Đổi giao diện sáng / tối', 'Toggle theme': 'Đổi giao diện', 'Switch light / dark': 'Đổi giao diện sáng / tối',
    'Switch language': 'Đổi ngôn ngữ',
    'Primary': 'Menu chính', 'Menu': 'Menu', 'Tri Nguyen, home': 'Tri Nguyen, trang chủ',
    'Back to top': 'Lên đầu trang',

    // ---- hero
    'Open to senior frontend roles & freelance projects': '<span class="dot"></span> Sẵn sàng cho vị trí senior frontend & dự án freelance',
    'I build fast, data-heavy web apps that people use all day.': 'Tôi xây dựng những ứng dụng web nhanh, nhiều dữ liệu, được người dùng sử dụng suốt cả ngày.',
    "I'm Tri Nguyen, a Senior Frontend Engineer with 10+ years of experience. I lead small teams and ship React / Next.js products — from an Amazon Ads management platform to e-commerce back-office suites and a national bank's website.":
      'Tôi là <strong>Tri Nguyen</strong>, Senior Frontend Engineer với hơn 10 năm kinh nghiệm. Tôi dẫn dắt các nhóm nhỏ và đưa sản phẩm React / Next.js vào vận hành — từ nền tảng quản lý quảng cáo Amazon, bộ công cụ back-office thương mại điện tử cho đến website của một ngân hàng lớn.',
    'See my work': 'Xem dự án của tôi',
    'Click to copy': 'Nhấn để sao chép', 'Copied ✓': 'Đã sao chép ✓', 'Press Ctrl+C to copy': 'Nhấn Ctrl+C để sao chép',
    'Email address copied': 'Đã sao chép địa chỉ email',
    'Copy email address p3t3rtringuyen@gmail.com': 'Sao chép địa chỉ email p3t3rtringuyen@gmail.com',
    'Highlights': 'Điểm nổi bật',
    'years in web development': 'năm làm phát triển web',
    'production web platforms': 'nền tảng web đã vận hành thực tế',
    'TS/TSX files in my largest codebase': 'file TS/TSX trong codebase lớn nhất của tôi',
    'client projects led as Project Leader': 'dự án khách hàng dẫn dắt với vai trò Project Leader',

    // ---- about
    "I'm a detail-oriented frontend engineer who cares about three things: accessible, responsive interfaces, performance you can measure, and code the next developer can change safely.":
      'Tôi là kỹ sư frontend tỉ mỉ, quan tâm đến ba điều: <strong>giao diện dễ tiếp cận và responsive</strong>, <strong>hiệu năng đo lường được</strong>, và <strong>mã nguồn mà người sau có thể sửa đổi an toàn</strong>.',
    "My recent work is on large, table-heavy operations software — thousands of rows, dozens of columns, strict permissions, and users who live in the product. That has taught me to measure before guessing: profile the real page, find the one component re-rendering fifty rows, and fix it at the layer that owns it.":
      'Công việc gần đây của tôi là phần mềm vận hành quy mô lớn, nhiều bảng dữ liệu — hàng nghìn dòng, hàng chục cột, phân quyền chặt chẽ và người dùng làm việc trong sản phẩm cả ngày. Điều đó dạy tôi đo trước khi đoán: profile trang thật, tìm ra component khiến năm mươi dòng render lại, và sửa ở đúng tầng chịu trách nhiệm.',
    "Before that I led delivery for agency and product teams in Singapore and Vietnam — including a new website for one of Vietnam's largest banks — running Agile sprints, reviewing code and mentoring developers.":
      'Trước đó, tôi dẫn dắt việc bàn giao cho các nhóm agency và product tại Singapore và Việt Nam — trong đó có website mới cho một trong những ngân hàng lớn nhất Việt Nam — điều hành sprint Agile, review code và kèm cặp lập trình viên.',
    'Quick facts': 'Thông tin nhanh',
    'Role': 'Vai trò', 'Based in': 'Nơi ở', 'Education': 'Học vấn', 'Works with': 'Làm việc với', 'Interests': 'Quan tâm',
    'Ho Chi Minh City, Vietnam': 'TP. Hồ Chí Minh, Việt Nam',
    'B.Sc. Software Engineering, Can Tho University': 'Cử nhân Kỹ thuật Phần mềm, Đại học Cần Thơ',
    'Remote & hybrid teams, English-speaking clients': 'Đội nhóm remote & hybrid, khách hàng nói tiếng Anh',
    'Web performance, mobile-first UX, emerging web tech': 'Hiệu năng web, UX ưu tiên di động, công nghệ web mới',

    // ---- skills
    'Frontend core': 'Nền tảng frontend',
    'UI & design systems': 'UI & design system',
    'Data & state': 'Dữ liệu & state',
    'Data-heavy UI': 'Giao diện nhiều dữ liệu',
    'Performance': 'Hiệu năng',
    'Auth, security & architecture': 'Xác thực, bảo mật & kiến trúc',
    'Backend & cloud (working knowledge)': 'Backend & cloud (hiểu biết thực tế)',
    'Quality & tooling': 'Chất lượng & công cụ',
    'Leadership': 'Quản lý & dẫn dắt',
    'Excel import/export': 'Nhập/xuất Excel',
    'Infinite loading': 'Tải vô hạn (infinite loading)',
    'Skeleton loading': 'Skeleton loading',
    'Render profiling': 'Profile render',
    'Memoisation strategy': 'Chiến lược memoisation',
    'Lazy tabs & preloading': 'Lazy tab & preload',
    'Import-cycle debugging': 'Gỡ lỗi import cycle',
    'Role-based access': 'Phân quyền theo vai trò',
    'Modular architecture': 'Kiến trúc module hoá',
    'Micro-frontend shared libs': 'Thư viện dùng chung cho micro-frontend',
    'Spec & test-case writing': 'Viết spec & test case',
    'Code review': 'Review code',
    'Estimation': 'Ước lượng công việc',
    'Mentoring': 'Kèm cặp',
    'Technical writing': 'Viết tài liệu kỹ thuật',

    // ---- projects
    'Selected projects': 'Dự án tiêu biểu',
    "Production systems I've built or taken a major part in. Internal tools are described by what they do and the engineering behind them — client data and URLs are omitted.":
      'Các hệ thống đang vận hành mà tôi đã xây dựng hoặc tham gia chính. Công cụ nội bộ được mô tả qua chức năng và phần kỹ thuật phía sau — dữ liệu và URL của khách hàng được lược bỏ.',
    'Filter projects': 'Lọc dự án',
    'All': 'Tất cả', 'E-commerce platform': 'Nền tảng thương mại điện tử', 'Client work': 'Dự án khách hàng',

    'Ads Management Platform': 'Nền tảng quản lý quảng cáo',
    'A web console for managing Amazon advertising — Sponsored Products, Brands and Display — across many seller accounts: campaigns, ad groups, targeting, bidding rules, budgets, history and reports.':
      'Web console quản lý quảng cáo Amazon — Sponsored Products, Brands và Display — trên nhiều tài khoản người bán: chiến dịch, nhóm quảng cáo, targeting, quy tắc đặt giá thầu, ngân sách, lịch sử và báo cáo.',
    'Led a v2 redesign with a modular + atomic architecture and an in-house design-system package (Storybook-documented), so shared visuals change once instead of per screen.':
      '<b>Dẫn dắt bản thiết kế lại v2</b> với kiến trúc module + atomic và <b>gói design system</b> nội bộ (có tài liệu Storybook), để giao diện dùng chung chỉ sửa một lần thay vì từng màn hình.',
    'Upgraded the stack in phases — Next 12 / React 17 / MUI 5 → Next 15 / React 19 / MUI 7; replaced Redux with hooks, moment with dayjs, and removed ~24,000 lines of verified dead code.':
      '<b>Nâng cấp stack theo từng giai đoạn</b> — Next 12 / React 17 / MUI 5 → <b>Next 15 / React 19 / MUI 7</b>; thay Redux bằng hooks, moment bằng dayjs và loại bỏ ~24.000 dòng code chết đã được kiểm chứng.',
    'Fixed a table render bottleneck: ticking one row re-rendered 50×28 cells (4–8 s in dev). A selection store plus transition-based updates brought the checkbox response to ~50–180 ms.':
      '<b>Sửa nút thắt render của bảng</b>: tick một dòng khiến 50×28 ô render lại (4–8 giây ở môi trường dev). Một selection store cùng cập nhật theo transition đưa phản hồi của checkbox xuống <b>~50–180 ms</b>.',
    'URL-as-state navigation: a typed page → tab → sub-tab → modal tree so every view is linkable, Back-button-safe and refresh-safe.':
      '<b>Điều hướng URL-as-state</b>: cây trang → tab → sub-tab → modal có kiểu dữ liệu, để mọi màn hình đều chia sẻ được liên kết, an toàn với nút Back và khi tải lại trang.',
    'Skeleton loaders that match real row heights (no layout shift), lazy-loaded tabs with idle preloading, per-tab listing state.':
      'Skeleton loader khớp chiều cao dòng thật (không nhảy layout), tab lazy-load có preload khi rảnh, trạng thái danh sách riêng cho từng tab.',
    'Wrote the functional spec, technical spec, API spec and test cases for the product, kept in sync with the code.':
      'Viết <b>đặc tả chức năng, đặc tả kỹ thuật, đặc tả API và test case</b> cho sản phẩm, luôn đồng bộ với code.',

    'Promotion & Coupon Manager': 'Quản lý khuyến mãi & coupon',
    'Back-office app to create deals, coupons and bulk promotions, track their history and logs, and manage who can do what.':
      'Ứng dụng back-office để tạo deal, coupon và khuyến mãi hàng loạt, theo dõi lịch sử và log, đồng thời quản lý ai được làm gì.',
    'Next.js App Router app with Keycloak sign-in and role-based pages.': 'Ứng dụng Next.js App Router với đăng nhập Keycloak và các trang phân quyền theo vai trò.',
    'Large tables with virtualization and infinite loading; Excel import/export with styled sheets.': 'Bảng dữ liệu lớn với virtualization và tải vô hạn; nhập/xuất Excel với sheet có định dạng.',
    'Refactored the History feature into a clean module and documented it with a changelog.': 'Tái cấu trúc tính năng <b>History</b> thành một module gọn gàng và ghi tài liệu bằng changelog.',

    'Master Data Management': 'Quản lý dữ liệu gốc (Master Data)',
    'Single source of truth for product codes, product prices, rate cards, warehouse CBM and product classification, with role-based access control.':
      'Nguồn dữ liệu gốc duy nhất cho mã sản phẩm, giá sản phẩm, bảng giá cước, CBM kho và phân loại sản phẩm, có phân quyền theo vai trò.',
    'Product-code listing and pricing screens built on configurable filter/column tables.': 'Màn hình danh sách mã sản phẩm và giá, xây trên bảng có bộ lọc/cột cấu hình được.',
    "Shared UI consumed from a common component library across the portal's modules.": 'UI dùng chung lấy từ thư viện component chung cho các module của portal.',
    'Developer-experience guardrails: Husky, commitlint, ESLint flat config, written onboarding docs.': 'Rào chắn cho trải nghiệm lập trình viên: Husky, commitlint, ESLint flat config, tài liệu onboarding bằng văn bản.',

    'Product Catalog': 'Danh mục sản phẩm',
    'Catalog operations for ASINs and part numbers: requests and approvals, bulk list-price updates, spreadsheet generation and recommendation views.':
      'Vận hành danh mục cho ASIN và part number: yêu cầu và phê duyệt, cập nhật giá niêm yết hàng loạt, tạo bảng tính và màn hình gợi ý.',
    'Request-management workflow with history, detail views and bulk operations.': 'Quy trình quản lý yêu cầu với lịch sử, màn hình chi tiết và thao tác hàng loạt.',
    'Rich media: video player with overlays and seek controls, image galleries with Swiper.': 'Đa phương tiện: trình phát video có lớp phủ và điều khiển tua, thư viện ảnh với Swiper.',
    'Live updates via server-sent events; sanitised rich content with DOMPurify.': 'Cập nhật trực tiếp qua server-sent events; nội dung rich text được làm sạch bằng DOMPurify.',

    'Company Portal': 'Cổng thông tin công ty',
    'The portal shell that ties the internal tools together: single sign-on, user management, profiles, promotions and upload history.':
      'Khung portal kết nối các công cụ nội bộ: đăng nhập một lần (SSO), quản lý người dùng, hồ sơ, khuyến mãi và lịch sử tải lên.',
    'Central user-management and permission screens used by every module.': 'Màn hình quản lý người dùng và phân quyền tập trung, dùng chung cho mọi module.',
    'Dashboards with Chart.js, animated transitions with Framer Motion.': 'Dashboard với Chart.js, hiệu ứng chuyển cảnh với Framer Motion.',
    'Turborepo-ready structure and a shared component package.': 'Cấu trúc sẵn sàng cho Turborepo và một gói component dùng chung.',

    'Multi-tenant real-estate sites': 'Website bất động sản đa khách hàng (multi-tenant)',
    'A platform that generates a branded website per real-estate agency, each with its own UI template, on a server-side rendered stack.':
      'Nền tảng tạo website riêng thương hiệu cho từng công ty bất động sản, mỗi nơi một mẫu giao diện riêng, chạy trên stack render phía server.',
    'Led the team as Project Leader and frontend developer.': 'Dẫn dắt nhóm với vai trò <b>Project Leader</b> kiêm lập trình viên frontend.',
    'Remix for the client sites, Next.js admin dashboard, Puck Editor for drag-and-drop landing pages.': 'Remix cho các website khách, dashboard quản trị Next.js, Puck Editor để kéo-thả landing page.',

    'Water-tank management system': 'Hệ thống quản lý bể nước',
    'Monitor water tanks, assign repair tasks to staff and report statistics, with a staff mobile app.': 'Giám sát bể nước, giao việc sửa chữa cho nhân viên và báo cáo thống kê, kèm ứng dụng di động cho nhân viên.',
    'Project Leader and frontend developer for the Next.js admin dashboard; Flutter app for iOS and Android.': '<b>Project Leader</b> kiêm lập trình viên frontend cho dashboard quản trị Next.js; ứng dụng Flutter cho iOS và Android.',

    'Figma file manager': 'Trình quản lý file Figma',
    "An app for managing designers' Figma files, building reporting plans and sending reminders by Slack or email.": 'Ứng dụng quản lý file Figma của designer, lập kế hoạch báo cáo và gửi nhắc việc qua Slack hoặc email.',
    'Integrated the Figma REST and Plugin APIs and the Slack API; Project Leader and frontend developer.': 'Tích hợp Figma REST API, Plugin API và Slack API; <b>Project Leader</b> kiêm lập trình viên frontend.',

    'Techcombank website revamp': 'Làm mới website Techcombank',
    "A completely new public website for one of Vietnam's largest banks, with content managed by a headless CMS.": 'Website công khai hoàn toàn mới cho một trong những ngân hàng lớn nhất Việt Nam, nội dung quản lý bằng headless CMS.',
    'Project Leader and frontend developer; Next.js client site with Strapi as the admin back-office.': '<b>Project Leader</b> kiêm lập trình viên frontend; website Next.js với Strapi làm back-office quản trị.',

    'PropertyGuru campaign pages': 'Trang chiến dịch PropertyGuru',
    'Custom headless CMS and campaign pages for a leading property portal in Southeast Asia.': 'Headless CMS tuỳ biến và các trang chiến dịch cho một cổng bất động sản hàng đầu Đông Nam Á.',
    'Project Leader and frontend developer; Nuxt (Vue) front end on an Express.js CMS.': '<b>Project Leader</b> kiêm lập trình viên frontend; frontend Nuxt (Vue) trên CMS Express.js.',

    "Official website of Sentosa, Singapore's island resort destination: attractions, deals, shop and membership.": 'Website chính thức của Sentosa, khu nghỉ dưỡng trên đảo của Singapore: điểm tham quan, ưu đãi, cửa hàng và thành viên.',
    'Frontend developer on the customer-facing website.': '<b>Lập trình viên frontend</b> cho website dành cho khách hàng.',
    'Built responsive pages and reusable components for the attraction, deal, shop and membership journeys.': 'Xây các trang responsive và component tái sử dụng cho hành trình tham quan, ưu đãi, mua sắm và thành viên.',
    'Worked on accessibility, performance and cross-browser behaviour for a high-traffic tourism audience.': 'Làm về khả năng tiếp cận, hiệu năng và tương thích đa trình duyệt cho lượng truy cập du lịch lớn.',

    // ---- experience
    'Now': 'Hiện tại',
    'E-commerce & advertising platform': 'Nền tảng thương mại điện tử & quảng cáo',
    'Leading the frontend team across the ads console, promotion, master-data, catalog and portal web apps: design system, performance, architecture and documentation. See projects.':
      'Dẫn dắt nhóm frontend của các ứng dụng web ads console, promotion, master-data, catalog và portal: design system, hiệu năng, kiến trúc và tài liệu. Xem <a href="#projects">dự án</a>.',
    'Led two products for Singapore clients: multi-tenant real-estate sites (Remix, Next.js, Puck) and a water-tank management platform (Next.js, Flutter). Ran sprints in Asana, owned delivery and code review.':
      'Dẫn dắt hai sản phẩm cho khách hàng Singapore: website bất động sản multi-tenant (Remix, Next.js, Puck) và nền tảng quản lý bể nước (Next.js, Flutter). Điều hành sprint trên Asana, chịu trách nhiệm bàn giao và review code.',
    'Techcombank website revamp (Next.js, Strapi), Whitespace Figma manager (React, Figma & Slack APIs), PropertyGuru campaign pages (Nuxt, Express).':
      'Làm mới website Techcombank (Next.js, Strapi), trình quản lý Figma Whitespace (React, Figma & Slack API), trang chiến dịch PropertyGuru (Nuxt, Express).',
    'Senior Frontend Web Developer': 'Senior Frontend Web Developer',
    'Hotel-booking management site for a German railway company (Angular 8, .NET, SQL Server) and the icareonline.com monitoring platform for digital carephones (ES6, ASP.NET MVC, Web API, Redis).':
      'Website quản lý đặt phòng khách sạn cho một công ty đường sắt của Đức (Angular 8, .NET, SQL Server) và nền tảng giám sát icareonline.com cho điện thoại chăm sóc sức khoẻ kỹ thuật số (ES6, ASP.NET MVC, Web API, Redis).',
    'B.Sc. Software Engineering': 'Cử nhân Kỹ thuật Phần mềm',
    'Full software lifecycle: requirements, design, coding, testing and maintenance.': 'Toàn bộ vòng đời phần mềm: yêu cầu, thiết kế, lập trình, kiểm thử và bảo trì.',

    'Can Tho University': 'Đại học Cần Thơ',

    // ---- team
    'Beyond the code': 'Ngoài code',
    'Good software comes from good teams. These are the people and moments behind my work: retreats, year-end parties, shared dinners and badminton on the court.':
      'Phần mềm tốt đến từ những đội nhóm tốt. Đây là những con người và khoảnh khắc đằng sau công việc của tôi: team building, tiệc cuối năm, bữa tối chung và những buổi đánh cầu lông.',
    'What I bring to a team': 'Điều tôi mang đến cho đội nhóm',
    'Collaboration': 'Hợp tác', 'Team spirit': 'Tinh thần đồng đội', 'Healthy competition': 'Cạnh tranh lành mạnh',
    'Badminton team': 'Đội cầu lông', 'Year-end party, 2018': 'Tiệc cuối năm 2018', 'Team retreat': 'Team building', 'Team dinner': 'Bữa tối của nhóm',
    'Team night out': 'Buổi tối đi chơi cùng nhóm', 'Lunch with the team': 'Bữa trưa cùng nhóm', 'On the badminton court': 'Trên sân cầu lông',
    'Team in red sports shirts raising badminton rackets on a court': 'Nhóm mặc áo thể thao đỏ giơ vợt cầu lông trên sân',
    'Standing in front of a year-end party backdrop': 'Đứng trước phông nền tiệc cuối năm',
    'Colleagues posing together outdoors among pine trees': 'Đồng nghiệp chụp ảnh cùng nhau ngoài trời giữa rừng thông',
    'Large group of colleagues smiling around a dinner table': 'Nhóm đông đồng nghiệp cười tươi quanh bàn ăn tối',
    'Colleagues sharing a grill dinner under neon signs': 'Đồng nghiệp cùng ăn tối nướng dưới biển đèn neon',
    'Four smiling colleagues at a table on a restaurant terrace': 'Bốn đồng nghiệp cười tươi tại bàn ở sân thượng nhà hàng',
    'Six colleagues with badminton rackets on an indoor court': 'Sáu đồng nghiệp cầm vợt cầu lông trên sân trong nhà',

    // ---- contact
    "Let's build something good.": 'Hãy cùng làm nên điều gì đó thật tốt.',
    "I'm available for senior frontend roles, project-leader positions and freelance work. Tell me what you're building.":
      'Tôi sẵn sàng cho các vị trí senior frontend, project leader và công việc freelance. Hãy cho tôi biết bạn đang xây dựng điều gì.',
    'Email me': 'Gửi email cho tôi',

    // ---- strings made by script.js
    'Click the card to enlarge it': 'Nhấn vào thẻ để phóng to',
    'Flip the card to see the website of ': 'Lật thẻ để xem website của ',
    'Flip': 'Lật', 'Flip back': 'Lật lại', 'Close': 'Đóng', 'Open in a new tab': 'Mở trong tab mới',
    'Photo viewer': 'Trình xem ảnh', 'Close photo viewer': 'Đóng trình xem ảnh', 'Previous photo': 'Ảnh trước', 'Next photo': 'Ảnh tiếp theo'
  };

  // Words inside "Leader · Senior Frontend Engineer · E-commerce" tags and timeline titles.
  var PARTS = { 'Leader': 'Trưởng nhóm', 'Flagship': 'Chủ lực', 'E-commerce': 'Thương mại điện tử' };

  var META = {
    title: 'Tri Nguyen — Senior Frontend Engineer',
    desc: 'Tri Nguyen, Senior Frontend Engineer với hơn 10 năm xây dựng sản phẩm React và Next.js: công cụ quảng cáo Amazon, bộ back-office thương mại điện tử, website ngân hàng và dashboard SaaS.',
    ogDesc: 'React / Next.js / TypeScript. Design system, bảng dữ liệu lớn, hiệu năng và dẫn dắt nhóm nhỏ.'
  };

  var KEYED = 'p, li, dt, dd, .pill, .tile__cap, .copy__tip, .nav__menu a:not(.btn), .skip, .btn__txt, .stats span, time, .contact h2, h3 small';
  var lang = 'en';

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }
  function t(en) { return lang === 'vi' && Object.prototype.hasOwnProperty.call(VI, en) ? VI[en] : en; }
  window.t = t;

  function parts(text) {
    var out = text.split(' · '), changed = false;
    out = out.map(function (p) { if (PARTS[p]) { changed = true; return PARTS[p]; } return p; });
    return changed ? out : null;
  }

  // Translate one direct text node (first or last non-empty) of a heading, keeping its child markup.
  function headingText(h, last) {
    var nodes = Array.prototype.filter.call(h.childNodes, function (n) { return n.nodeType === 3 && norm(n.nodeValue); });
    var n = last ? nodes[nodes.length - 1] : nodes[0];
    if (!n) return;
    if (n._en === undefined) n._en = n.nodeValue;
    var key = norm(n._en), pad = n._en.match(/^(\s*)[\s\S]*?(\s*)$/);
    var to = lang === 'vi' ? (VI[key] !== undefined ? VI[key] : (parts(key) ? parts(key).join(' · ') : null)) : null;
    n.nodeValue = to === null ? n._en : pad[1] + to + pad[2];
  }

  function apply() {
    var vi = lang === 'vi';
    root.lang = vi ? 'vi' : 'en';

    document.querySelectorAll(KEYED).forEach(function (el) {
      if (el.dataset.en === undefined) {
        // Only keyed text we know about; never remember (or touch) elements nobody translates.
        if (!Object.prototype.hasOwnProperty.call(VI, norm(el.textContent))) return;
        el.dataset.en = el.innerHTML;
        el._key = norm(el.textContent);
      }
      el.innerHTML = vi ? VI[el._key] : el.dataset.en;
    });

    document.querySelectorAll('.section__title').forEach(function (h) { headingText(h, true); });
    document.querySelectorAll('.projects h3, .card h3, .timeline h3').forEach(function (h) { headingText(h, false); });

    document.querySelectorAll('.tag').forEach(function (tag) {
      if (tag.dataset.en === undefined) tag.dataset.en = tag.innerHTML;
      var tmp = document.createElement('div'); tmp.innerHTML = tag.dataset.en;
      var hasB = !!tmp.querySelector('b'), text = norm(tmp.textContent), p = vi ? parts(text) : null;
      tag.innerHTML = p ? (hasB ? '<b>' + p[0] + '</b>' + (p.length > 1 ? ' · ' + p.slice(1).join(' · ') : '') : p.join(' · ')) : tag.dataset.en;
    });

    // Attributes: aria-label, title, alt, and the gallery's caption/alt data.
    document.querySelectorAll('[aria-label], [title], img[alt], [data-alt], [data-caption], [data-lbl]').forEach(function (el) {
      ['aria-label', 'title', 'alt', 'data-alt', 'data-caption', 'data-lbl'].forEach(function (a) {
        if (!el.hasAttribute(a)) return;
        var k = 'en' + a.replace(/-/g, '_');
        if (el.dataset[k] === undefined) {
          if (!Object.prototype.hasOwnProperty.call(VI, norm(el.getAttribute(a)))) return;
          el.dataset[k] = el.getAttribute(a);
        }
        el.setAttribute(a, vi ? VI[norm(el.dataset[k])] : el.dataset[k]);
      });
    });

    document.title = vi ? META.title : 'Tri Nguyen — Senior Frontend Engineer';
    var d = document.querySelector('meta[name="description"]'), o = document.querySelector('meta[property="og:description"]');
    if (d) { if (!d.dataset.en) d.dataset.en = d.content; d.content = vi ? META.desc : d.dataset.en; }
    if (o) { if (!o.dataset.en) o.dataset.en = o.content; o.content = vi ? META.ogDesc : o.dataset.en; }

    window.dispatchEvent(new Event('resize')); // card sizes depend on the text
    document.querySelectorAll('.lang span').forEach(function (s) { s.classList.toggle('is-on', s.dataset.l === lang); });
  }

  function set(next, save) {
    lang = next;
    if (save) { try { localStorage.setItem('lang', next); } catch (e) {} }
    apply();
  }

  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var initial = saved || ((navigator.language || '').toLowerCase().indexOf('vi') === 0 ? 'vi' : 'en');

  var btn = document.querySelector('.lang');
  if (btn) btn.addEventListener('click', function () { set(lang === 'vi' ? 'en' : 'vi', true); });
  if (initial === 'vi') set('vi', false); else apply();
})();
