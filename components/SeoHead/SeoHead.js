import Head from 'next/head'

const SeoHead = () => {
  const title = process.env.NEXT_PUBLIC_TITLE
  const description = process.env.NEXT_PUBLIC_DESCRIPTION_TEXT
  const image =
    'https://nftstorage.link/ipfs/bafybeieey2oiswv6274lx7khmmw24kwkbyfiss2vjtf6oeo6sj7cb4mn2q'
  const url = 'https://www.newfestivaltoken.art/'

  return (
    <Head>
      {/* MAIN SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={image} />
      <link rel="icon" href={image} />
      <link rel="apple-touch-icon" href={image} />
      {/* TWITTER */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
      {/* OG */}
      <meta name="og:url" content={url} />
      <meta name="og:title" content={title} />
      <meta property="og:image" content={image} />
    </Head>
  )
}

export default SeoHead
