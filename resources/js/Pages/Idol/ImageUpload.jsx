import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

export default function ImageUpload() {
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const { data, setData, reset } = useForm({ images: [] });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setError('');
    setSuccess('');
    setPreviews([]);
    if (!files.length) {
      console.log('No files selected');
      return;
    }
    let valid = true;
    let newPreviews = [];
    files.forEach(file => {
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
        setError('Only JPG, PNG, or PDF files are allowed.');
        console.log('Invalid file type:', file.type);
        valid = false;
        return;
      }
      if (file.size > 25 * 1024 * 1024) {
        setError('File size must be 25MB or less.');
        console.log('File too large:', file.size);
        valid = false;
        return;
      }
      if (file.type.startsWith('image/')) {
        newPreviews.push(URL.createObjectURL(file));
      }
    });
    if (!valid) return;
    setData('images', files);
    setPreviews(newPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setUploading(true);
    if (!data.images.length) {
      setError('No files selected.');
      setUploading(false);
      console.log('No files selected');
      return;
    }
    const formData = new FormData();
    data.images.forEach((file, idx) => {
      formData.append('images[]', file);
    });
    console.log('Submitting form with files:', data.images);
    router.post('/upload-image', formData, {
      forceFormData: true,
      onSuccess: (page) => {
        setSuccess('Upload successful!');
        setPreviews([]);
        reset();
        setUploading(false);
      },
      onError: (errors) => {
        setError('Upload failed.');
        setUploading(false);
      },
      onFinish: () => setUploading(false),
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload Photos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          multiple
          onChange={handleFileChange}
          className="mb-4"
        />
        {previews.length > 0 && (
          <div className="mb-4 grid grid-cols-2 gap-2">
            {previews.map((src, idx) => (
              <img key={idx} src={src} alt="Preview" className="max-h-32 rounded" />
            ))}
          </div>
        )}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <button
          type="submit"
          disabled={uploading || !data.images.length}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}