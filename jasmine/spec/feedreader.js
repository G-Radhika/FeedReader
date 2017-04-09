$(function() {
	/* This is our first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function() {

		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		it(':URL not undefined and URL not empty', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			});
		});

		it(':name not undefined and URL not empty', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			});
		});
	});

	describe('The Menu', function() {

		it(':Default behaviour ,hide menu', function() {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

		it(':HamburgerIcon clicked, Display/hide Menu', function() {
			//first click - show the Menu
			$('.menu-icon-link').trigger('click');
			expect($('body').hasClass('menu-hidden')).toBe(false);
			//second click -toggle to hide
			$('.menu-icon-link').trigger('click');
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});


	describe('initial Entries', function() {
		beforeEach(function(done) {
			loadFeed(0, done);
		});

		it(':Feed entry length should be atleast 1', function() {
			expect($('.feed .entry').length).toBeGreaterThan(0);
			
		});
	});

	describe('new feed selection', function() {
		var feedContents;
		var defaultTime;

		beforeEach(function(done) {
			defaultTime = jasmine.DEFAULT_TIMEOUT_INTERVAL;
			jasmine.DEFAULT_TIMEOUT_INTERVAL= 10000;
			loadFeed(0, function() {
				console.log('load 0 feed callback');
				feedContents = $('.feed').html();
				loadFeed(1, function() {
					console.log('load 1 feed callback');
					done();
				});
			});
			
		});

		it('changes the feed html', function(done) {
				expect($('.feed').html()).not.toEqual(feedContents);
				done();
		});

		afterEach(function(done) {
			jasmine.DEFAULT_TIMEOUT_INTERVAL = defaultTime;
			done();
		});
	});

}());