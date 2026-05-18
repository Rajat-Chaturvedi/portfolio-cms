/**
 *  skill controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::skill.skill', () => ({
	async find(ctx) {
		if (!ctx.query.sort) {
			ctx.query = {
				...ctx.query,
				sort: ['order:asc', 'createdAt:desc'],
			};
		}

		return await super.find(ctx);
	},
}));
