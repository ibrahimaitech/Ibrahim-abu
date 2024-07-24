import { Styles } from "../lib/Styles.js";
import fs from "fs";
import fetch from "node-fetch";
import { xpRange } from "../lib/levelling.js";
import moment from "moment-timezone";
const defaultMenu = {
	before: `
 *Salam* : %name
 *uptime* : %uptime
%readMore`,
	header: `┏━━⬣ ≼ %category `,
	body: "┃ ⎔ %cmd ",
	footer: "┗━━⬣  ",
	after: `*B O B I Z*`,
};
const handler = async (m, { conn, usedPrefix: _P, isOwner, isPremium }) => {
	const Help = Object.values(global.plugins)
		.filter((p) => (isOwner ? !p?.disabled : !p?.disabled && !p?.owner))
		.map((p) => {
			return {
				help: Array.isArray(p?.help) ? p?.help : p?.help ? [p?.help] : "",
				tags: Array.isArray(p?.tags) ? p?.tags[0] : p?.tags ? [p?.tags] : "",
				prefix: p?.customPrefix ? true : false,
				limit: p?.limit,
				premium: p?.premium,
				enabled: !p?.disabled,
				owner: isOwner ? p.owner : false,
			};
		});
	let tags = {};
	Help.forEach((p) => {
		if (p.tags && p.tags.length) {
			Object.assign(tags, {
				[p.tags]: Array.isArray(p.tags)
					? p.tags.map(
							(v) =>
								v.charAt(v.length >= 1 ? 0 : v.length).toUpperCase() +
								v.slice(1),
					  )
					: [p.tags][0],
			});
		}
	});
	conn.menu = conn.menu ? conn.menu : {};
	const before = conn.before || defaultMenu.before;
	const header = conn.header || defaultMenu.header;
	const body = conn.body || defaultMenu.body;
	const footer = conn.footer || defaultMenu.footer;
	const after = conn.after || defaultMenu.after;

	let text = [
		before,
		...Object.keys(tags)
			.sort()
			.map((tag) => {
				return header.replace(
					/%category/g,
					`${tags[tag]}` +
						" ≽\n" +
						[
							...Help.filter(
								(menu) =>
									menu.tags &&
									menu.tags.includes(tag) &&
									menu.help &&
									!menu.owner,
							).map((menu) => {
								return menu.help
									.map((help) => {
										return body
											.replace(/%cmd/g, menu.prefix ? help : "%P" + help)
											.replace(/%islimit/g, menu.limit ? "(🅛)" : "")
											.replace(/%isPremium/g, menu.premium ? "(🅟)" : "")
											.trim();
									})
									.join("\n");
							}),
							footer,
						].join("\n"),
				);
			}),
		after,
	].join("\n");
	text =
		typeof conn.menu === "string"
			? conn.menu
			: typeof conn.menu === "object"
			? text
			: "";
	const name = await conn.getName(m.sender);
	let wibh = moment.tz("Africa/Kenya").format("HH");
	let wibm = moment.tz("Africa/Kenya").format("mm");
	let wibs = moment.tz("Africa/Kenya").format("ss");
	let wit = moment.tz("Africa/Kenya").format("HH:mm:ss");
	let wita = moment.tz("Africa/Kenya").format("HH:mm:ss");
	let wktuwib = `${wibh}.${wibm}.${wibs}`;

	const more = String.fromCharCode(8206);
	const readMore = more.repeat(4001);
	const mp3 = "http://cdn.sazumi.moe/file/8r7rms.m4a";
	let _muptime;
	if (process.send) {
		process.send("uptime");
		_muptime =
			(await new Promise((resolve) => {
				process.once("message", resolve);
				setTimeout(resolve, 1000);
			})) * 1000;
	}
	const muptime = clockString(_muptime);
	let uptime = `${muptime}`;

	let d = new Date(new Date() + 3600000);
	let locale = "ar";
	let week = d.toLocaleDateString(locale, { weekday: "long" });
	let date = d.toLocaleDateString(locale, {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
	let dateIslamic = Intl.DateTimeFormat(locale + "-TN-u-ca-islamic", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(d);
	let time = d.toLocaleTimeString(locale, {
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	});
	let selamat = `${ucapan()}`;
	let tagme = `@${m.sender.replace(/@.+/, "")}`;
	let stats = `${isOwner ? "Owner" : isPremium ? "Premium" : "Free"}`;
	let tagname = `@${m.sender.replace(/@.+/, "")}`;
	let mode = global.opts["self"] ? "Private" : "Publik";

	const replace = {
		"%": "%",
		P: _P,
		name,
		wktuwib,
		readMore,
		tagname,
		mode,
		selamat,
		uptime,
		stats,
		week,
		date,
		tagme,
		dateIslamic,
		who: "@" + m.sender.replace(/[^0-9]/g, ""),
	};
	text = text.replace(
		new RegExp(
			`%(${Object.keys(replace)
				.sort((a, b) => b.length - a.length)
				.join("|")})`,
			"g",
		),
		(_, name) => "" + replace[name],
	);

	await conn
		.sendMessage(
			m.chat,
			{
				text: Styles(text),
				mentions: [m.sender],
				contextInfo: {
					forwardingScore: 9999999,
					isForwarded: false,
					mentionedJid: [m.sender],
					externalAdReply: {
						showAdAttribution: false,
						renderLargerThumbnail: true,
						title: `إضغط هنا لمتابعة صانع البوت في حسابه `,
						containsAutoReply: true,
						mediaType: 1,
						thumbnailUrl: `https://telegra.ph/file/29e49761b9b813a814afb.jpg`,
						mediaUrl: ``,
						sourceUrl: "https://www.instagram.com/ibrahimtechofficial1",
					},
				},
			},
			{ quoted: m },
		)
		.then(() =>
			conn.sendMessage(
				m.chat,
				{
					audio: { url: mp3 },
					ptt: true,
					mimetype: "audio/mpeg",
					fileName: "vn.mp3",
					waveform: [
						0, 3, 58, 44, 35, 32, 2, 4, 31, 35, 44, 34, 48, 13, 0, 54, 49, 40,
						1, 44, 50, 51, 16, 0, 3, 40, 39, 46, 3, 42, 38, 44, 46, 0, 0, 47, 0,
						0, 46, 19, 20, 48, 43, 49, 0, 0, 39, 40, 31, 18, 29, 17, 25, 37, 51,
						22, 37, 34, 19, 11, 17, 12, 16, 19,
					],
				},
				{ quoted: m },
			),
		);
};

handler.help = ["menuaall"];
handler.command = ["menuall","menu"];

export default handler;

function ucapan() {
	const time = moment.tz("Africa/kenya").format("HH");
	let res = "🐯";
	if (time >= 4) {
		res = "(Good Morning)";
	}
	if (time >= 10) {
		res = "(Good Morning)";
	}
	if (time >= 15) {
		res = "(Good Evening)";
	}
	if (time >= 18) {
		res = "(Good Evening)";
	}
	return res;
}

function clockString(ms) {
	let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
	let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
	let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
	return [h, " H ", m, " M ", s, " S "]
		.map((v) => v.toString().padStart(2, 0))
		.join("");
}

function pickRandom(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
