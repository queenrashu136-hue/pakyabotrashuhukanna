module.exports = {
    pattern: "tagall",
    desc: "Tag all group members",
    category: "group",
    use: ".tagall [message]",
    filename: __filename,

    execute: async (conn, message, m, { args, q, reply, from, isGroup, groupMetadata, sender }) => {
        try {
            if (!isGroup) return reply("❌ This command can only be used in groups.");

            const metadata = await conn.groupMetadata(from);

            // Check admin / owner
            const participant = metadata.participants.find(p => p.id === sender);
            const isAdmin = participant?.admin === 'admin' || participant?.admin === 'superadmin';

            const botNumber = conn.user.id.split(':')[0];
            const senderNumber = sender.split('@')[0];
            const isOwner = botNumber === senderNumber;

            if (!isAdmin && !isOwner) return reply("❌ Only group admins or the bot owner can use this command.");

            const members = metadata.participants.map(p => p.id);
            const admins = metadata.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin');

            const groupName = metadata.subject || "Group";
            const totalMembers = members.length;
            const totalAdmins = admins.length;
            const customMessage = q || "Bonjour à tous";

            const senderTag = "@" + sender.split("@")[0];
            const date = new Date().toLocaleString("fr-FR", { hour12: false });

            let text = `╭───『 Qᴜᴇᴇɴ Aᴋᴜᴍᴀ V2 』\n`;
            text += `│ Group : *${groupName}*\n`;
            text += `│ Membres : *${totalMembers}*\n`;
            text += `│ Admins : *${totalAdmins}*\n`;
            text += `│ User : ${senderTag}\n`;
            text += `│ Message : *${customMessage}*\n`;
            text += `│ Date : *${date}*\n`;
            text += `╰──────────────────────•\n\n`;

            members.forEach(id => {
                text += `⟢ @${id.split('@')[0]}\n`;
            });

            text += `\n⟢ Powered by *Qᴜᴇᴇɴ*`;

            await conn.sendMessage(from, {
                text,
                mentions: members
            }, { quoted: message });

        } catch (e) {
            console.error("tagall error:", e);
            reply("❌ Something went wrong.");
        }
    }
};