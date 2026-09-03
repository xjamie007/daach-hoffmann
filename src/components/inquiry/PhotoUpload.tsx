'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MAX_PHOTOS, MAX_PHOTO_BYTES, MAX_PHOTO_EDGE, ACCEPTED_PHOTO_TYPES } from '@/lib/inquiry/fields';
import { CloseIcon } from '@/components/ui/icons';
import { cn } from '@/lib/cn';

export interface PreparedPhoto {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  /** Base64, already resized. */
  readonly data: string;
  readonly previewUrl: string;
  readonly bytes: number;
}

/**
 * Photo upload with client-side resizing.
 *
 * Section 12.2 requires images to be reduced to a 2000px edge before upload,
 * and the reason is concrete: a photo from a current phone is eight to twelve
 * megabytes, and five of them over a rural mobile connection is a two-minute
 * upload that people abandon halfway. Resized, the same five come to roughly
 * two megabytes in total.
 *
 * The work happens on a canvas, so nothing leaves the device until the form is
 * submitted. HEIC — what an iPhone produces by default — cannot be decoded by
 * most browsers; that case falls back to sending the original when it is
 * within the size limit, rather than rejecting a photo the visitor can see
 * perfectly well.
 */
export function PhotoUpload({
  photos,
  onChange,
  disabled,
}: {
  readonly photos: readonly PreparedPhoto[];
  readonly onChange: (photos: readonly PreparedPhoto[]) => void;
  readonly disabled?: boolean;
}) {
  const t = useTranslations('form');
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      setError(null);

      const room = MAX_PHOTOS - photos.length;
      if (room <= 0) {
        setError(t('errors.photoMax', { max: MAX_PHOTOS }));
        return;
      }

      const files = Array.from(fileList).slice(0, room);
      if (files.length < fileList.length) {
        setError(t('errors.photoMax', { max: MAX_PHOTOS }));
      }

      setBusy(true);
      const prepared: PreparedPhoto[] = [];

      for (const file of files) {
        if (!(ACCEPTED_PHOTO_TYPES as readonly string[]).includes(file.type)) {
          setError(t('errors.photoType'));
          continue;
        }
        if (file.size > MAX_PHOTO_BYTES) {
          setError(t('errors.photoSize'));
          continue;
        }
        try {
          prepared.push(await prepare(file));
        } catch {
          setError(t('errors.photoType'));
        }
      }

      setBusy(false);
      if (prepared.length > 0) onChange([...photos, ...prepared]);
    },
    [photos, onChange, t],
  );

  function remove(id: string) {
    const target = photos.find((photo) => photo.id === id);
    if (target) URL.revokeObjectURL(target.previewUrl);
    onChange(photos.filter((photo) => photo.id !== id));
    setError(null);
  }

  const full = photos.length >= MAX_PHOTOS;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <label htmlFor={inputId} className="font-heading text-small font-semibold text-ink">
          {t('photos')}
          <span className="ml-2 font-body text-small font-normal text-ink-subtle">
            {t('photosOptional')}
          </span>
        </label>
        <span className="text-small text-ink-subtle" aria-live="polite">
          {t('photosCount', { count: photos.length, max: MAX_PHOTOS })}
        </span>
      </div>

      <p className="text-small text-ink-muted">{t('photosHint')}</p>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled && !full) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          if (!disabled && !full) void handleFiles(event.dataTransfer.files);
        }}
        className={cn(
          'rounded-sm border border-dashed p-5 transition-colors duration-fast ease-out',
          dragging ? 'border-accent bg-accent-500/8' : 'border-border-strong bg-surface-raised',
          (disabled || full) && 'opacity-60',
        )}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          multiple
          accept={ACCEPTED_PHOTO_TYPES.join(',')}
          disabled={disabled || full || busy}
          onChange={(event) => {
            void handleFiles(event.target.files);
            // Allow re-selecting the same file after removing it.
            event.target.value = '';
          }}
          className="block w-full min-h-12 cursor-pointer text-small text-ink-muted file:mr-4 file:min-h-10 file:cursor-pointer file:rounded-sm file:border-0 file:bg-navy-900 file:px-4 file:py-2 file:font-heading file:text-small file:font-semibold file:text-clay-50 hover:file:bg-navy-800 disabled:cursor-not-allowed"
        />
        {busy ? (
          <p className="mt-3 text-small text-ink-muted" aria-live="polite">
            {t('photosPreparing')}
          </p>
        ) : null}
      </div>

      {error ? (
        <p role="alert" className="flex gap-2 text-small font-medium text-red-700">
          <span aria-hidden="true">↳</span>
          {error}
        </p>
      ) : null}

      {photos.length > 0 ? (
        <ul className="mt-1 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((photo) => (
            <li key={photo.id} className="relative">
              <img
                src={photo.previewUrl}
                alt=""
                className="aspect-[4/3] w-full rounded-sm border border-border object-cover"
              />
              <button
                type="button"
                onClick={() => remove(photo.id)}
                className="absolute top-1.5 right-1.5 inline-flex size-9 items-center justify-center rounded-sm bg-navy-900/85 text-clay-50 transition-colors duration-fast ease-out hover:bg-red-600"
              >
                <CloseIcon className="size-4" />
                <span className="sr-only">
                  {t('photosRemove')} — {photo.name}
                </span>
              </button>
              <span className="mt-1.5 block truncate text-[0.75rem] text-ink-subtle">
                {Math.round(photo.bytes / 1024)} KB
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

async function prepare(file: File): Promise<PreparedPhoto> {
  const id = `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_PHOTO_EDGE / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('no 2d context');
    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', 0.82),
    );
    if (!blob) throw new Error('encode failed');

    return {
      id,
      name: file.name,
      type: 'image/jpeg',
      data: await toBase64(blob),
      previewUrl: URL.createObjectURL(blob),
      bytes: blob.size,
    };
  } catch {
    /*
      Decoding failed — almost always HEIC from an iPhone, which Safari can
      display but cannot hand to createImageBitmap. The original is sent
      unchanged; it is within the size limit because that was checked before
      we got here, and a photo the business can open beats a rejection the
      visitor cannot act on.
    */
    return {
      id,
      name: file.name,
      type: file.type,
      data: await toBase64(file),
      previewUrl: URL.createObjectURL(file),
      bytes: file.size,
    };
  }
}

function toBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.slice(result.indexOf(',') + 1));
    };
    reader.readAsDataURL(blob);
  });
}
