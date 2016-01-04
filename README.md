# ARIA Tabs

<a href="https://github.com/posthtml/posthtml"><img src="http://posthtml.github.io/posthtml/logo.svg" alt="PostHTML Logo" width="80" height="80" align="right"></a>

[![NPM Version][npm-img]][npm] [![Build Status][ci-img]][ci]

[ARIA Tabs] lets you write accessible tabs with minimal markup. It intelligently appends ARIA roles and attributes to your tabs and panels, where implied or duplicated data would have reduced readability.

```html
<!-- BEFORE -->
<ul role="tablist">
	<li>
		<a href="#foo" aria-selected="true">Foo</a>
	</li>

	<li>
		<a href="#bar">Bar</a>
	</li>

	<li>
		<a href="#qux">Qux</a>
	</li>
</ul>

<section id="foo">
	This is the foo tab.
</section>

<section id="bar">
	This is the bar tab.
</section>

<section id="qux">
	This is the qux tab.
</section>

<!-- AFTER -->
<ul role="tablist">
	<li role="presentation">
		<a href="#foo" aria-selected="true" id="foo-tab" role="tab" aria-controls="foo">Foo</a>
	</li>

	<li role="presentation">
		<a href="#bar" id="bar-tab" role="tab" aria-controls="bar">Bar</a>
	</li>

	<li role="presentation">
		<a href="#qux" id="qux-tab" role="tab" aria-controls="qux">Qux</a>
	</li>
</ul>

<section id="foo" role="tabpanel" aria-labelledby="foo-tab">
	This is the foo tab.
</section>

<section id="bar" role="tabpanel" aria-labelledby="bar-tab" hidden>
	This is the bar tab.
</section>

<section id="qux" role="tabpanel" aria-labelledby="qux-tab" hidden>
	This is the qux tab.
</section>
```

For a [fully accessible implementation], [client.js](client.js) should be included somewhere in the front-end.

## Usage

Add [ARIA Tabs] to your build tool:

```bash
npm install posthtml-aria-tabs --save-dev
```

#### Node

```js
require('posthtml-aria-tabs').process(YOUR_HTML);
```

#### PostHTML

Add [PostHTML] to your build tool:

```bash
npm install posthtml --save-dev
```

Load [ARIA Tabs] as a PostHTML plugin:

```js
posthtml([
	require('posthtml-aria-tabs')()
]).process(YOUR_HTML);
```

#### Gulp

Add [Gulp PostHTML] to your build tool:

```bash
npm install gulp-posthtml --save-dev
```

Enable [ARIA Tabs] within your Gulpfile:

```js
var posthtml = require('gulp-posthtml');

gulp.task('html', function () {
	return gulp.src('./src/*.html').pipe(
		posthtml([
			require('posthtml-aria-tabs')()
		])
	).pipe(
		gulp.dest('.')
	);
});
```

#### Grunt

Add [Grunt PostHTML] to your build tool:

```bash
npm install grunt-posthtml --save-dev
```

Enable [ARIA Tabs] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-posthtml');

grunt.initConfig({
	posthtml: {
		options: {
			use: [
				require('posthtml-aria-tabs')()
			]
		},
		dist: {
			src: '*.html'
		}
	}
});
```

[ci]:      https://travis-ci.org/jonathantneal/posthtml-aria-tabs
[ci-img]:  https://img.shields.io/travis/jonathantneal/posthtml-aria-tabs.svg
[npm]:     https://www.npmjs.com/package/posthtml-aria-tabs
[npm-img]: https://img.shields.io/npm/v/posthtml-aria-tabs.svg

[Gulp PostHTML]:  https://github.com/posthtml/gulp-posthtml
[Grunt PostHTML]: https://github.com/TCotton/grunt-posthtml
[PostHTML]:       https://github.com/posthtml/posthtml

[fully accessible implementation]: http://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel

[ARIA Tabs]: https://github.com/jonathantneal/posthtml-aria-tabs
