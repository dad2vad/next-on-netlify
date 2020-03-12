import { useRouter } from 'next/router';
import useSWR from 'swr';
import Cors from 'micro-cors'
import allQ from './q.json'

function fetcher(url) {
  return fetch(url).then(r => r.json());
}
//  /api/randomQuote?author=ow
function TO(quote) {
    
    const res = fetch('https://api.telegram.org/bot910695234:AAEOuJFDArfyMfnyUcbzFQcMzUw06Df2f6o/sendMessage?chat_id=986940575&text=' + JSON.stringify(quote, null,4), {
      method: 'POST'
    })
    const json = res.json()
  }


const cors = Cors({
  allowMethods: ['GET', 'HEAD'],
})

function handler(req, res) {
    TO('quote')
  res.json({ message: 'Hello Everyone!' })
}



export default function Index() {
   cors(handler)
  const { query } = useRouter();
  
  const { data, error } = useSWR(
    `/api/l${query.author ? '?author=' + query.author : ''}`,
    fetcher
  )

  // The following line has optional chaining, added in Next.js v9.1.5,
  // is the same as `data && data.author`
  const author = data?.author;
  let quote = data?.quote;
  let xx = JSON.stringify(allQ,null,4)
// TO(quote)a
  if (!data) quote = 'Loading...';
  if (error) quote = 'Failed to fetch the quote.';

  return (
    <main className="center">
      <div className="quote">{quote}</div>
      {author && <span className="author">- {xx}</span>}

 

    </main>
  );
}