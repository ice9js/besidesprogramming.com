/**
 * Development app settings
 */
const settings = {
	env: 'development',
	app: {
		name: 'Besides Programming',
		description: 'Code is the easy part. A blog about programming and more.',
		host: 'besidesprogramming.localhost',
		port: 3000,
		gaTrackerId: 'UA-88781129-1',
		disqusShortname: 'besidesprogramming-dev',
		twitterHandle: 'ice9js',
		openGraphImage: 'https://besidesprogramming.com/img/open-graph-default-image.png',
	},
	api: {
		host: 'http://besidesprogramming-wp.local/wp-json',
	},
	assets: {
		host: 'https://besidesprogramming-wp.local',
		paths: {
			uploads: '/wp-content/uploads'
		},
	},
	photon: {
		enabled: false,
		host: 'https://i0.wp.com',
		sizes: [ 380, 570, 768, 960, 1150, 1920, 2550 ]
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
			url: 'https://besidesprogramming.com/feed/',
		},
		{
			icon: ['fab', 'slack-hash'],
			title: 'Slack',
			url: 'https://slackin.besidesprogramming.com/',
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
			url: 'https://www.facebook.com/besidesprogramming/',
		},
	],
};

export default settings;
