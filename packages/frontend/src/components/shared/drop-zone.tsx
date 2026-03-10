import { Upload, Music } from 'lucide-react'
import { cn } from '@/utils'
import { useRef } from 'react'

interface DropZoneProps {
  onFileSelect: (file: File) => void
  accept?: string
  label?: string
  sublabel?: string
  fileName?: string | null
  className?: string
  multiple?: boolean
}

export function DropZone({
  onFileSelect,
  accept = 'audio/*',
  label = 'Drop audio file here',
  sublabel = 'or click to browse',
  fileName,
  className,
  multiple = false,
}: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) onFileSelect(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFileSelect(file)
  }

  return (
    <div
      className={cn(
        'border-2 border-dashed border-white/20 rounded-xl p-8',
        'hover:border-[#0a84ff]/50 hover:bg-[#0a84ff]/5',
        'transition-all duration-200 cursor-pointer',
        'flex flex-col items-center gap-3 text-center',
        fileName && 'border-[#32d74b]/40 bg-[#32d74b]/5',
        className,
      )}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={handleChange}
      />
      {fileName ? (
        <>
          <Music size={28} className="text-[#32d74b]" />
          <div>
            <p className="text-sm font-medium text-[#32d74b]">{fileName}</p>
            <p className="text-xs text-white/40 mt-1">Click to replace</p>
          </div>
        </>
      ) : (
        <>
          <Upload size={28} className="text-white/30" />
          <div>
            <p className="text-sm font-medium text-white/60">{label}</p>
            <p className="text-xs text-white/30 mt-1">{sublabel}</p>
          </div>
        </>
      )}
    </div>
  )
}
