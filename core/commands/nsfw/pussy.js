const { RandomRedditPost } = require('../../');

module.exports = {
	name: 'pussy',
	aliases: ['vagina'],
	permissions: ['EMBED_LINKS'],
	permissionLevel: 0,
	description: 'Pussy images',
	usage: '',
	category: 'nsfw',
	guildOnly: false,
	params: false,
	cooldown: 5,
	enabled: true,
	async execute(Juge, message, params) {
		await RandomRedditPost(Juge, message, this);
	}
};
