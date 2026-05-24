export function isTwitchConfigured(): boolean {
  const id = process.env.TWITCH_CLIENT_ID?.trim();
  const secret = process.env.TWITCH_CLIENT_SECRET?.trim();
  return Boolean(id && secret);
}
