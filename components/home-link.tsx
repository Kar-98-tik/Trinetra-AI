
'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function HomeLink() {
  const router = useRouter()

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    router.push(user ? '/protected' : '/')
  }

  return (
    <Link 
      href="/" 
      onClick={handleClick}
      className="flex items-center"
    >
      <Image
        src="/trinetra.png"
        alt="Trinetra AI Logo"
        width={120}
        height={40}
        className="pt-3.5 object-contain transition-transform transform hover:scale-110 drop-shadow-[0_0_10px_rgba(0,162,255,0.8)]"

        width={140}
        height={40}
        priority
      />
    </Link>
  )
}

