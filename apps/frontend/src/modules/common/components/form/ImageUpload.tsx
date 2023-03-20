import { CameraIcon } from '@/modules/common/components/icons/camera';
import { Button } from '../Button';

interface Props {
  image?: string | null;
  loading?: boolean;
  hideActions?: boolean;
  onFileSelected: (file: File | null) => void;
}

export const ImageUpload = ({
  image,
  loading,
  hideActions,
  onFileSelected,
}: Props) => {
  const handleFileUpload = (files: FileList | null) => {
    if (!files?.[0]) {
      return;
    }
    const file = files[0];
    onFileSelected(file);
  };

  return (
    <div className="image-upload">
      <label
        className={`box hidden-input ${
          !image && !loading ? 'visible-icon' : ''
        }`}
      >
        {!image && !loading && <CameraIcon className="camera-icon" />}

        {loading ? (
          <div className="field space loading">
            <h1>Laden...</h1>
          </div>
        ) : (
          <div className="field space loading">
            <input
              id="file_upload"
              name="image"
              type="file"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
            {image && <img className="image-preview" src={image} />}
          </div>
        )}

        {!image && !loading && (
          <div className="not-on-mobile upload-profile-image-text">
            Profilbild auswählen
          </div>
        )}
      </label>

      {image && !loading && !hideActions && (
        <div>
          <Button
            className="mgn-top-20"
            type="error"
            onClick={() => onFileSelected(null)}
          >
            Profilbild entfernen
          </Button>
          <Button type="info" className="mgn-top-20">
            <label htmlFor="file_upload">Profilbild ersetzen</label>
          </Button>
        </div>
      )}
    </div>
  );
};
