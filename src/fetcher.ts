const fetcher = async ({ url, args }: { url: string; args: any }) => {
  console.log('fetcher', { url, args })

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(args),
  })

  return res.json()
}

export default fetcher
