'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Server, RefreshCw ,SquareArrowOutUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ServerObservabilityPage() {
  const params = useParams()
  const projectId = params.projectid as string
  const { resolvedTheme } = useTheme()
  const [iframeKey, setIframeKey] = useState(0)

  const iframeSrc = "http://voice-ai.superu.ai:3000/d/admnpgl/voice-ai-superu-ai-monitoring?orgId=1&from=now-1h&to=now&timezone=browser&refresh=5s"

  const handleRefresh = () => setIframeKey(k => k + 1)

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Toolbar */}
      <div className="flex-none border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            WebRTC Server Observability
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="h-7 w-7 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="Refresh"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <a href={iframeSrc} target="_blank" rel="noopener noreferrer" className='flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'>
        <SquareArrowOutUpRight className="w-4 h-4" />
        Open in new tab
      </a>

      {/* Iframe */}
      <div className={`flex-1 overflow-hidden ${resolvedTheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <iframe
          key={iframeKey}
          src={iframeSrc}
          className="w-full h-full border-0"
          title="Server Observability Dashboard"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
