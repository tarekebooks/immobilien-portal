import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { BasicInfoFormData } from './BasicInfoStep'

type PostAdState = {
  basicInfo: BasicInfoFormData | null
}

type PostAdContextValue = {
  state: PostAdState
  setBasicInfo: (data: BasicInfoFormData) => void
}

const STORAGE_KEY = 'post-ad-basic-info'

const PostAdContext = createContext<PostAdContextValue | null>(null)

const loadStoredBasicInfo = (): BasicInfoFormData | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as BasicInfoFormData
  } catch {
    return null
  }
}

export function PostAdProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PostAdState>(() => ({
    basicInfo: loadStoredBasicInfo(),
  }))

  const setBasicInfo = (data: BasicInfoFormData) => {
    setState((prev) => ({ ...prev, basicInfo: data }))
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      // Ignore storage write errors.
    }
  }

  const value = useMemo<PostAdContextValue>(
    () => ({
      state,
      setBasicInfo,
    }),
    [state],
  )

  return <PostAdContext.Provider value={value}>{children}</PostAdContext.Provider>
}

export function usePostAd() {
  const ctx = useContext(PostAdContext)
  if (!ctx) {
    throw new Error('usePostAd must be used within PostAdProvider')
  }
  return ctx
}
