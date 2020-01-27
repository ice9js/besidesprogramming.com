/**
 * Production app settings
 */
const settings = {
	env: 'production',
	app: {
		name: 'The Missing Semicolon',
		description: 'A software engineer\'s journal. By Kuba Birecki.',
		host: 'https://themissingsemicolon.blog',
		port: 3000,
		gtmId: 'GTM-KN4FS4P',
		disqusShortname: 'besidesprogramming',
		twitterHandle: 'ice9js',
		openGraphImage: 'https://themissingsemicolon.blog/andromeda/img/open-graph-default-image.png',
	},
	api: {
		host: 'https://themissingsemicolon.blog/wp-json',
	},
	assets: {
		host: 'https://themissingsemicolon.blog',
		paths: {
			uploads: '/wp-content/uploads'
		},
	},
	photon: {
		enabled: true,
		host: 'https://i0.wp.com',
		sizes: [ 380, 570, 768, 960, 1150, 1920, 2550 ],
	},
	posts: {
		perPage: 10,

		categories: {
			thoughts: {
				id: 2,
				label: 'Thoughts',
			},
			programming: {
				id: 3,
				label: 'Programming',
			},
			travel: {
				id: 4,
				label: 'Travel',
			},
			photos: {
				id: 5,
				label: 'Photos',
			},
		},
	},
	socialLinks: [
		{
			icon: 'rss',
			title: 'RSS Feed',
			url: 'https://themissingsemicolon.blog/feed/',
		},
		{
			icon: ['fab', 'slack-hash'],
			title: 'Slack',
			url: 'https://slackin.themissingsemicolon.blog/',
		},
		{
			icon: ['fab', 'instagram'],
			title: 'Instagram',
			url: 'https://www.instagram.com/ice9js/',
		},
		{
			icon: ['fab', 'twitter'],
			title: 'Twitter',
			url: 'https://twitter.com/ice9js',
		},
		{
			icon: ['fab', 'facebook-f'],
			title: 'Facebook',
			url: 'https://www.facebook.com/themissingsemicolon/',
		},
	],
};

export default settings;
