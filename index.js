var posthtml = require('posthtml');

module.exports = function (opts) {
	var suffix = opts && opts.idSuffix || 'tab';

	return function AriaTabs(tree) {
		var tabs = {};

		walkTabLists(tree);

		walkTabPanels(tree);

		function walkTabLists(parentNode, isTablist) {
			parentNode.forEach(function (node) {
				// if already in a tab list
				if (isTablist) {
					// conditionally transform list items
					if (node.tag === 'li') {
						node.attrs = node.attrs || {};

						node.attrs.role = 'presentation';
					}

					// conditionally transform tabs
					if (node.attrs && /^#/.test(node.attrs.href)) {
						var id       = node.attrs.href.slice(1);
						var isActive = node.attrs['aria-selected'];

						node.attrs.id = id + '-' + suffix;
						node.attrs.role = 'tab';
						node.attrs['aria-controls'] = id;

						if (isActive) {
							node.attrs['aria-selected'] = 'true';
						}

						// save tab reference
						tabs[id] = isActive;
					}
				}

				// detect tab lists
				if (node.attrs && node.attrs.role === 'tablist') {
					isTablist = true;
				}

				// conditionally walk children
				if (node.content) {
					walkTabLists(node.content, isTablist);
				}
			});
		}

		function walkTabPanels(parentNode, isTablist) {
			parentNode.forEach(function (node) {
				// conditionally define tab panels
				if (node.attrs && node.attrs.id in tabs) {
					var id = node.attrs.id;

					node.attrs.role = 'tabpanel';

					node.attrs['aria-labelledby'] = id + '-' + suffix;

					if (!tabs[id]) {
						node.attrs.hidden = true;
					}
				}

				// conditionally walk children
				if (node.content) {
					walkTabPanels(node.content, isTablist);
				}
			});
		}
	};
};

module.exports.process = function (contents, options) {
	return posthtml().use(module.exports(options)).process(contents);
};
