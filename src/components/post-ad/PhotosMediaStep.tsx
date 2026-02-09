import './post-ad.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiImage,
  FiInfo,
  FiLink,
  FiMove,
  FiPlayCircle,
  FiStar,
  FiTrash2,
} from 'react-icons/fi'

type MediaItem = {
  id: string
  src: string
  alt: string
  file?: File
}

const createId = () => crypto.randomUUID()

export default function PhotosMediaStep() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [items, setItems] = useState<MediaItem[]>([])
  const [mainId, setMainId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const draggedId = useRef<string | null>(null)

  const percent = 50
  const steps = ['Basic Info', 'Photos', 'Features', 'Review']

  const uploadingPlaceholder = useMemo(() => ({ progress: 75 }), [])

  useEffect(() => {
    return () => {
      items.forEach((item) => {
        if (item.file) {
          URL.revokeObjectURL(item.src)
        }
      })
    }
  }, [items])

  const setFiles = (files: FileList | File[]) => {
    const nextItems = Array.from(files).map((file) => ({
      id: createId(),
      src: URL.createObjectURL(file),
      alt: file.name,
      file,
    }))

    setItems((prev) => {
      const merged = [...prev, ...nextItems]
      if (!mainId && merged.length > 0) {
        setMainId(merged[0].id)
      }
      return merged
    })
  }

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files)
      event.target.value = ''
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    if (event.dataTransfer.files?.length) {
      setFiles(event.dataTransfer.files)
    }
  }

  const handleDragStart = (id: string) => {
    draggedId.current = id
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDropOnItem = (id: string) => {
    const sourceId = draggedId.current
    if (!sourceId || sourceId === id) return
    setItems((prev) => {
      const next = [...prev]
      const fromIndex = next.findIndex((item) => item.id === sourceId)
      const toIndex = next.findIndex((item) => item.id === id)
      if (fromIndex === -1 || toIndex === -1) return prev
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return next
    })
  }

  const handleDelete = (id: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id)
      if (target?.file) {
        URL.revokeObjectURL(target.src)
      }
      const next = prev.filter((item) => item.id !== id)
      if (id === mainId) {
        setMainId(next[0]?.id ?? null)
      }
      return next
    })
  }

  return (
    <section className="pa-page pa-page--alt pa-page--light">
      <div className="pa-container pa-container--narrow">
        <div className="pa-section">
          <div className="pa-progress">
            <div className="pa-progress__head">
              <div>
                <h2 className="pa-title">Post new Real-Estate</h2>
                <p className="pa-subtitle">Step 2: Photos &amp; Media</p>
              </div>
              <span className="pa-progress__percent">{percent}% Completed</span>
            </div>
            <div className="pa-progress__bar">
              <div
                className="pa-progress__bar-fill"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="pa-progress__steps">
              {steps.map((step, index) => (
                <span
                  key={step}
                  className={index === 1 ? 'is-active' : undefined}
                >
                  {index + 1}. {step}
                </span>
              ))}
            </div>
          </div>
        </div>

        <section className="pa-header">
          <h1>Photos &amp; Media</h1>
          <p>
            Add high-quality photos of your property to attract more buyers.
            Listings with professional photos get 3x more views.
          </p>
        </section>

        <div
          className={`pa-upload ${isDragging ? 'is-dragging' : ''}`}
          onDragOver={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            className="pa-upload__input"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
          />
          <div className="pa-upload__content">
            <div className="pa-upload__icon">
              <FiImage />
            </div>
            <div>
              <p className="pa-upload__title">Click to upload or drag and drop</p>
              <p className="pa-upload__meta">JPG, PNG, WEBP (Max 10MB per file)</p>
            </div>
            <button
              type="button"
              className="pa-upload__button"
              onClick={() => fileInputRef.current?.click()}
            >
              Select Files
            </button>
          </div>
        </div>

        <section className="pa-gallery">
          <div className="pa-gallery__head">
            <h3>
              Uploaded Photos <span>({items.length}/20)</span>
            </h3>
            <p>
              <FiMove />
              Drag photos to reorder
            </p>
          </div>
          <div className="pa-gallery__grid">
            {items.map((item) => {
              const isMain = item.id === mainId
              return (
                <div
                  key={item.id}
                  className={`pa-gallery__item ${isMain ? 'is-main' : ''}`}
                  draggable
                  onDragStart={() => handleDragStart(item.id)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDropOnItem(item.id)}
                >
                  <img src={item.src} alt={item.alt} />
                  {isMain ? (
                    <span className="pa-gallery__badge">Main Photo</span>
                  ) : null}
                  <div className="pa-gallery__overlay">
                    {!isMain ? (
                      <button
                        type="button"
                        aria-label="Set as main photo"
                        onClick={() => setMainId(item.id)}
                      >
                        <FiStar />
                      </button>
                    ) : (
                      <button type="button" aria-label="Edit photo">
                        <FiEdit2 />
                      </button>
                    )}
                    <button
                      type="button"
                      aria-label="Delete photo"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              )
            })}
            {items.length > 0 ? (
              <div className="pa-gallery__uploading">
                <div className="pa-gallery__progress">
                  <div
                    className="pa-gallery__progress-fill"
                    style={{ width: `${uploadingPlaceholder.progress}%` }}
                  />
                </div>
                <span>Uploading... {uploadingPlaceholder.progress}%</span>
              </div>
            ) : null}
          </div>
        </section>

        <section className="pa-video">
          <div className="pa-video__head">
            <div className="pa-video__icon">
              <FiPlayCircle />
            </div>
            <div>
              <h3>Property Video Tour</h3>
              <p>Provide a virtual walkthrough for buyers.</p>
            </div>
          </div>
          <label className="pa-video__field">
            <span>Video Link</span>
            <div className="pa-video__input">
              <FiLink />
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
              />
              <em>YouTube / Vimeo</em>
            </div>
          </label>
          <div className="pa-video__note">
            <FiInfo />
            <p>
              Videos help your property rank higher in search results. Make sure
              your video is public and allows embedding.
            </p>
          </div>
        </section>
      </div>

      <div className="pa-footer">
        <div className="pa-footer__inner">
          <button
            type="button"
            className="pa-btn pa-btn--ghost"
            onClick={() => navigate('/create-new-property')}
          >
            <FiChevronLeft />
            Previous
          </button>
          <div className="pa-footer__actions">
            <button type="button" className="pa-btn pa-btn--ghost is-muted">
              Save as Draft
            </button>
            <button type="button" className="pa-btn pa-btn--primary">
              Next
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
