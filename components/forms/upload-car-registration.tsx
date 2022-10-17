import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'

// Icons
import { ArrowRightIcon } from '@heroicons/react/20/solid'

export interface UploadCarRegistrationProps {}

type FileProps = {
  preview: string
  raw: File | null
}

export const UploadCarRegistration = (props: UploadCarRegistrationProps) => {
  const {} = props
  const [image, setImage] = useState<FileProps>({ preview: '', raw: null })
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const goToStep = (step: number, asPath: string) => {
    router.push(`/?step=${step}`, asPath)
  }

  const handleChange = (event: React.FormEvent) => {
    const target = event.target as HTMLInputElement
    const files = target.files
    if (files?.length) {
      setImage({
        preview: URL.createObjectURL(files[0]),
        raw: files[0],
      })
    }
  }

  const handleDrag = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    setDragActive(false)
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setImage({
        preview: URL.createObjectURL(event.dataTransfer.files[0]),
        raw: event.dataTransfer.files[0],
      })
    }
  }

  const onHandleOpenUploadWindow = () => {
    if (inputRef.current != null) {
      inputRef?.current.click()
    }
  }

  const onHandleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    console.log(image)
  }

  return (
    <>
      <h2 className="font-semibold leading-6 text-indigo-600">5. Upload car registration</h2>
      <form onDragEnter={handleDrag} onSubmit={onHandleSubmit} className="relative">
        <div>
          <label className="block text-sm font-medium text-gray-700">Cover photo</label>
          <div
            className="mt-1 flex justify-center rounded-md border-2 border-dashed hover:border-indigo-600 transition duration-150 ease-in-out border-gray-300 px-6 pt-5 pb-6 cursor-pointer"
            onClick={onHandleOpenUploadWindow}
          >
            <div className="space-y-1 text-center">
              {image.preview ? (
                <img src={image.preview} alt="dummy" width="300" height="300" />
              ) : (
                <>
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
              <div className="flex justify-center text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    ref={inputRef}
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleChange}
                    accept="image/*"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              {dragActive && (
                <div
                  id="drag-file-element"
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className="absolute w-full h-full top-0 right-0 left-0 bottom-0"
                ></div>
              )}
              <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => goToStep(0, '/email')}
          >
            Back
          </button>
          <button
            type="submit"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Finish
            <ArrowRightIcon className="h-5 w-5 text-white ml-2" aria-hidden="true" />
          </button>
        </div>
      </form>
    </>
  )
}
