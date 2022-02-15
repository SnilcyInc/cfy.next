const fetcher = ({ url, args }: { url: string; args: any }) => {
  console.log('fetcher', { url, args })

  const req = fetch(url, {
    method: 'POST',
    body: JSON.stringify(args),
  })

  return req.then((res) => res.json())
}

export default fetcher
