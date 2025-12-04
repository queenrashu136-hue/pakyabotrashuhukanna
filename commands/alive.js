module.exports = {
  pattern: "alive",
  desc: "Check if bot is online",
  category: "general",
  use: ".alive",
  filename: __filename,

  execute: async (conn, message, m, { from, reply, sender }) => {
    try {
      // Bot PP
      let botPp;
      try {
        botPp = await conn.profilePictureUrl(conn.user.id, "image");
      } catch {
        botPp = "https://files.catbox.moe/ojxs8m.jpg";
      }

      // System & uptime
      const os = require("os");
      const uptime = process.uptime();
      const days = Math.floor(uptime / 86400);
      const hours = Math.floor((uptime % 86400) / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);

      const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
      const usedMem = ((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(1);

      const senderTag = "@" + sender.split("@")[0];
      const date = new Date().toLocaleString("fr-FR", { hour12: false });

      // Alive message
      const caption = `
╭───『 𝐒𝐘𝐒𝐓𝐄𝐌 𝐒𝐓𝐀𝐓𝐔𝐒 』
│ Bot : *Qᴜᴇᴇɴ Aᴋᴜᴍᴀ V2*
│ Uptime : *${days}d ${hours}h ${minutes}m ${seconds}s*
│ User : ${senderTag}
│ Date : *${date}*
╰────────────────────• 

⟢ System: *${os.type()} ${os.release()}*
⟢ CPU: *${os.cpus().length} Cores*
⟢ RAM: *${usedMem}GB / ${totalMem}GB*

⟢ Status: ✅ Online & Operational
`.trim();

      await conn.sendMessage(from, {
        image: { url: botPp },
        caption,
        mentions: [sender]
      }, { quoted: message });

    } catch (error) {
      console.error("Alive error:", error);
      reply("❌ Unable to display system status.");
    }
  }
};
