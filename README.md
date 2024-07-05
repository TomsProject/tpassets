# TPAssets (https://assets.projectoms.com/)
Hello! This repository stores some static resources from TomsProject (Because he has no money to buy cloud storage & fast CDN.)

But only GitHub's storage is not enough, we need a fast, stable, and safe content delivery network to deliver these static files to users all around the world. And that's where the Vercel comes in.

Vercel is a serverless service but it also provides a custom content delivery network using AGA (AWS Global Accelerator, A global anycast network based on Amazon infrastructures that is ten times faster than CloudFront.)

Thanks to Vercel, we can have a better network performance with Vercel AGA.

AGA's one big problem is that it doesn't support IPv6(AWS Supports it now, however Vercel still does not), so we use Cloudflare CDN to solve this.

That's all about this repository and I hope you'll enjoy it!

[![Powered by Vercel](https://raw.githubusercontent.com/abumalick/powered-by-vercel/master/powered-by-vercel.svg)](https://vercel.com?utm_source=powered-by-vercel)

---
## For visitors in mainland China

As we all know, China's GFW makes the global internet very slow, so we need a local content delivery network provider to provide faster internet service for users in China.

After trying Alibaba, Tencent, Qiniu, Upyun, Huawei Cloud, UCloud, Kingsoft Cloud, and Baidu AI Cloud, we found Kingsoft's CDN is suitable for us, although it doesn't support anycast, it is useful enough.

Kingsoft's CDN supports TLS 1.3 & Brotli Compression and even QUIC now!

## For visitors in Russia & CIS
* For Russia invades Ukraine: We don't believe all Russian people really support Putin, the invasion is caused by the Kremlin, not the people. So sanctions on Russian people made no effort, it's Putin and his stupid supporters who should pay for starting a war, that's the reason why I still letting my service available in Russia.

For some reason, AWS & Cloudflare didn't have many POPs in Russia & CIS, which made fetching assets very slow, so we need a local content delivery network provider to provide faster internet service for users in Russia & CIS.

As far as we know, Edgecenter(former Gcore, detail: https://s.tp.je/32K2p )'s CDN is best in Russia & CIS, it supports IPv6, TLS 1.3.

Edgecenter's CDN doesn't support HTTP3/QUIC now(in beta), but this is going to be solved soon.
Edgecenter's CDN does support Brotli Compression now, but we need to buy a very expensive origin shield, so we WON'T FELL INTO THIS TRAP(lol)

Toms Project, 2024
