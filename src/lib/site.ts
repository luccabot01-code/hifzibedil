export const siteName = "Hıfz-ı Bedîl";

export const siteUrl = "https://www.hifzibedil.com";

export const siteDescription =
  "Hıfz-ı Bedîl, Kur'ân-ı Kerîm ezberine alternatif bir yaklaşım sunan, sıralı ezber ve periyodik tekrar esasına göre tasarlanmış bir hafızlık programıdır.";

export function getSiteUrl() {
  const candidate =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : siteUrl);

  try {
    return new URL(candidate);
  } catch {
    return new URL(siteUrl);
  }
}
