import { Command, CommandClient } from 'detritus-client';
import { Permissions } from 'detritus-client/lib/constants';
import { BaseCommand } from '../basecommand';
import CacheCollection from '../../../cache/CacheCollection';
import { Embed } from 'detritus-client/lib/utils';
import { EmbedColors } from '../../../utils/constants';

export const COMMAND_NAME = 'automod show';

export default class AutomodShowCommand extends BaseCommand {
   constructor(client: CommandClient) {
		super(client, {
			name: COMMAND_NAME,
			aliases: ['badwords show'],
			disableDm: true,
			metadata: {
				disableDm: true,
				description: 'Muestra la lista de automod del servidor',
				usage: [`${COMMAND_NAME}`],
				example: [`${COMMAND_NAME}`],
				type: 'Bot Config',
			},
			permissionsClient: [Permissions.EMBED_LINKS],
		});
	}
   async run(context: Command.Context) {
      const guildData = CacheCollection.get(context.guildId)
      const embed = new Embed();
      embed.setTitle(`Automod Words List [${guildData.Modules.Automod.Words.length}/20]`)
      embed.setColor(EmbedColors.MAIN)
      embed.setDescription(guildData.Modules.Automod.Words.map(({Word, Percent}, i) => `**${i + 1} •** \`${Word}\` - **${Percent}%**`).join('\n') || '`Sin palabras establecidas`')
      return context.editOrReply({embeds: [embed]});
   }
}
