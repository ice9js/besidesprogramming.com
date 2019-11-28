/**
 * Production app settings
 */
const settings = {
	env: 'production',
	app: {
		name: 'Besides Programming',
		host: 'https://besidesprogramming.com',
		gtmId: 'GTM-KN4FS4P',
		disqusShortname: 'besidesprogramming',
		paths: {
			uploads: '/wp-content/uploads'
		},
	},
	api: {
		host: 'https://besidesprogramming.com/wp-json/wp/v2',
	},
	photon: {
		enabled: true,
		host: 'https://i0.wp.com'
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
