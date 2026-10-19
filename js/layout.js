/* ==========================================================
   Sparvle 共用 Header / Footer
   ----------------------------------------------------------
   - 頁面中放 <div data-include="header"></div> 與
     <div data-include="footer"></div>，本檔會替換成完整區塊。
   - 本檔必須在 js/plugins.min.js、js/functions.bundle.js 之前載入，
     讓 Canvas 初始化時就能抓到選單。
   - 新增頁面：在 NAV 對應項目把 ready 改成 true（或刪掉 ready）。
   ========================================================== */
(function () {

	// 網站地圖：header 主選單與 footer 網站地圖共用
	// ready: false 代表頁面尚未完成，連結會先指向 "#"
	var NAV = [
		{ title: '關於我們', children: [
			{ title: '企業簡介', href: 'company-introduction.html' },
			{ title: '品牌理念與企業責任', href: 'brand-values-responsibility.html' },
			{ title: '相關認證', href: 'certifications.html' },
			{ title: '核心競爭力', href: 'core-competency.html' },
			{ title: '應用領域', href: 'industrial-applications.html' },
			{ title: '保固聲明', href: 'warranty-statement.html' },
			{ title: '仿冒品辨別', href: 'anti-counterfeiting.html' }
		] },
		{ title: '同盟招募', children: [
			{ title: '經銷', href: 'distributor.html', ready: false },
			{ title: '先行者計劃', href: 'mantiio-smart-plant-pioneer-program.html' }
		] },
		{ title: '最新消息', children: [
			{ title: '專題報導', href: 'knowledge-articles.html', ready: false },
			{ title: '活動與新聞', href: 'event-news.html', ready: false },
			{ title: 'FAQ', href: 'faq.html', ready: false }
		] },
		{ title: '智能數位產品介紹', children: [
			{ title: '數位追溯護照', href: 'digital-traceability-passport.html', ready: false },
			{ title: '智能閥門監控系統', href: 'intelligent-valve-monitor.html', ready: false },
			{ title: '工廠資產管理系統 Mantiio', href: 'asset-management.html', ready: false }
		] },
		{ title: '球閥產品介紹', children: [
			{ title: '全種類 Overview', href: 'products.html' }
		] },
		{ title: '下載專區', href: 'download.html', ready: false },
		{ title: '永續行動', children: [
			{ title: '永續企業', href: 'sustainability.html', ready: false },
			{ title: 'B型企業', href: 'b-corporation.html', ready: false }
		] },
		{ title: '聯絡我們', href: 'contact.html', ready: false }
	];

	var COMPANY = {
		name: '星奧科技',
		address: '台中市西屯區市政北七路186號20樓之9',
		tel: '+886-4-2271-6107',
		fax: '+886-4-2271-6127',
		email: 'info@sparvle.com',
		linkedin: 'https://www.linkedin.com/company/sparvle'
	};

	// 不在選單裡的頁面（例如單一產品頁）可在 header 佔位加上
	// data-current="products.html"，讓選單標示所屬的分類
	var headerSlot = document.querySelector('[data-include="header"]');
	var currentPage = ( headerSlot && headerSlot.getAttribute('data-current') ) ||
		location.pathname.split('/').pop() || 'index.html';
	if ( currentPage.indexOf('.') === -1 ) currentPage += '.html';

	// 開頭是深色滿版圖的頁面，可在 header 佔位加上 data-header-class="dark"
	var headerClass = headerSlot && headerSlot.getAttribute('data-header-class');

	function linkOf(item) {
		if ( item.href ) return item.ready === false ? '#' : item.href;
		// 父選單沒有自己的頁面時，連到第一個已完成的子頁
		var children = item.children || [];
		for ( var i = 0; i < children.length; i++ ) {
			if ( children[i].ready !== false ) return children[i].href;
		}
		return '#';
	}

	function isCurrent(item) {
		if ( item.href === currentPage ) return true;
		return (item.children || []).some(isCurrent);
	}

	function menuItem(item) {
		var html = '<li class="menu-item' + (isCurrent(item) ? ' current' : '') + '">' +
			'<a class="menu-link" href="' + linkOf(item) + '"><div>' + item.title + '</div></a>';
		if ( item.children ) {
			html += '<ul class="sub-menu-container">' + item.children.map(menuItem).join('') + '</ul>';
		}
		return html + '</li>';
	}

	function sitemapColumn(item) {
		var html = '<div class="col"><div class="widget widget_links">' +
			'<h4><a href="' + linkOf(item) + '">' + item.title + '</a></h4>';
		if ( item.children ) {
			html += '<ul>' + item.children.map(function (child) {
				return '<li><a href="' + linkOf(child) + '">' + child.title + '</a></li>';
			}).join('') + '</ul>';
		}
		return html + '</div></div>';
	}

	var header = '' +
		'<header id="header" class="full-header transparent-header' + (headerClass ? ' ' + headerClass : '') + '" data-sticky-class="not-dark">' +
			'<div id="header-wrap">' +
				'<div class="container">' +
					'<div class="header-row">' +

						'<div id="logo">' +
							'<a href="index.html">' +
								'<img class="logo-default" srcset="images/logo.png, images/logo@2x.png 2x" src="images/logo@2x.png" alt="Sparvle Logo">' +
								'<img class="logo-dark" srcset="images/logo-dark.png, images/logo-dark@2x.png 2x" src="images/logo-dark@2x.png" alt="Sparvle Logo">' +
							'</a>' +
						'</div>' +

						'<div class="header-misc">' +
							'<div id="top-search" class="header-misc-icon">' +
								'<a href="#" id="top-search-trigger"><i class="uil uil-search"></i><i class="bi-x-lg"></i></a>' +
							'</div>' +

							// 會員：人形圖示直接連到登入頁（手機版也顯示，選單內不另列「登入」）
							'<div id="top-account" class="header-misc-icon">' +
								'<a href="login.html" title="會員登入" aria-label="會員登入"><i class="uil uil-user"></i></a>' +
							'</div>' +
						'</div>' +

						'<div class="primary-menu-trigger">' +
							'<button class="cnvs-hamburger" type="button" title="Open Mobile Menu">' +
								'<span class="cnvs-hamburger-box"><span class="cnvs-hamburger-inner"></span></span>' +
							'</button>' +
						'</div>' +

						'<nav class="primary-menu">' +
							'<ul class="menu-container">' +
								NAV.map(menuItem).join('') +
							'</ul>' +
						'</nav>' +

						'<form class="top-search-form" action="search.html" method="get">' +
							'<input type="text" name="q" class="form-control" value="" placeholder="Type &amp; Hit Enter.." autocomplete="off">' +
						'</form>' +

					'</div>' +
				'</div>' +
			'</div>' +
			'<div class="header-wrap-clone"></div>' +
		'</header>';

	var footer = '' +
		'<footer id="footer" class="dark">' +
			'<div class="container">' +
				'<div class="footer-widgets-wrap">' +
					'<div class="row col-mb-50">' +

						'<div class="col-lg-3">' +
							'<div class="widget">' +
								'<img src="images/footer-widget-logo.png" alt="Sparvle" class="footer-logo">' +
								'<address class="mb-3">' +
									'<strong>Sparvle（' + COMPANY.name + '）</strong><br>' +
									COMPANY.address +
								'</address>' +
								'<abbr title="Phone Number"><strong>TEL</strong></abbr> ' + COMPANY.tel + '<br>' +
								'<abbr title="Fax"><strong>FAX</strong></abbr> ' + COMPANY.fax + '<br>' +
								'<abbr title="Email Address"><strong>Email</strong></abbr> ' + COMPANY.email +
								'<div class="d-flex align-items-center mt-4">' +
									'<a href="' + COMPANY.linkedin + '" target="_blank" rel="noopener" class="social-icon text-white border-transparent bg-linkedin me-2 mb-0 float-none">' +
										'<i class="fa-brands fa-linkedin"></i><i class="fa-brands fa-linkedin"></i>' +
									'</a>' +
									'<a href="' + COMPANY.linkedin + '" target="_blank" rel="noopener"><small><strong>LinkedIn</strong></small></a>' +
								'</div>' +
							'</div>' +
						'</div>' +

						'<div class="col-lg-9">' +
							'<div class="row row-cols-2 row-cols-md-4 col-mb-30">' +
								NAV.map(sitemapColumn).join('') +
							'</div>' +
						'</div>' +

					'</div>' +
				'</div>' +
			'</div>' +

			'<div id="copyrights">' +
				'<div class="container">' +
					'<div class="row col-mb-30">' +
						'<div class="col-md-6 text-center text-md-start">' +
							'Copyrights &copy; ' + new Date().getFullYear() + ' All Rights Reserved by Sparvle<br>' +
							'<div class="copyright-links"><a href="#">Terms of Use</a> / <a href="#">隱私權政策</a></div>' +
						'</div>' +
						'<div class="col-md-6 text-center text-md-end">' +
							'<i class="bi-envelope"></i> ' + COMPANY.email +
							' <span class="middot">&middot;</span> ' +
							'<i class="fa-solid fa-phone"></i> ' + COMPANY.tel +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</footer>';

	var parts = { header: header, footer: footer };
	document.querySelectorAll('[data-include]').forEach(function (el) {
		var html = parts[el.getAttribute('data-include')];
		if ( html ) el.outerHTML = html;
	});

})();
