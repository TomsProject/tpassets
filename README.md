# https://assets.projectoms.com/
Hello! This repository is used to store some static resources from TomsProject (Because he has no money to buy cloud storge & fast CDN.)

But only GitHub's storage is not enough, we need a fast, stable and safe content delivery network to deliver this static files to users all around the world. And that's where the Vercel comes in.

Vercel is a serverless sevice but it also provide a custom content delivery network using AGA (AWS Global Accelerator, An global anycast network based on Amazon infrastructures which is ten time faster than CloudFront.)

Thanks to Vercel, we can have a better network performance with Vercel AGA.

AGA's one big problem is that it dosn't support IPv6, so we use Cloudflare CDN to slove this.

That's all about this repository and I hope you'll enjoy it!

[![Powered by Vercel](https://raw.githubusercontent.com/abumalick/powered-by-vercel/master/powered-by-vercel.svg)](https://vercel.com?utm_source=powered-by-vercel)

---
## For visiters in mainland China

As we all konw, China's GFW make global internet very slow, so we need a local content delivery network provider to provide a faster internet service for users in China.

After trying Alibaba, Tencent, Qiniu, Upyun and Baidu AI Cloud, we found Tencent's CDN is suitable for us, Althouth it dosn't support anycast, but it is useful enough.

Tencent's CDN dosn't support TLS 1.3 & Brotli Compression now, and this will be sloved as fast as possible.

Toms Project, 2021
