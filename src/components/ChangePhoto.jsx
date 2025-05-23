import CancelBtn from "../assets/images/buttons/cancel-button.svg";
import UploadBtn from "../assets/images/CloudUpload.png";

const ChangePhoto = ({
  onClose,
  handleFileClick,
  handleFileChange,
  fileInputRef,
  handleUploadPhoto,
  uploadingPhoto,
  selectedFile,
}) => {
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const event = {
        target: {
          files: [file],
        },
      };
      handleFileChange(event);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-change-container">
        <div className="modal-header">
          <h1>Завантажте ваше зображення</h1>
          <img
            src={CancelBtn}
            alt="кнопка закриття"
            onClick={onClose}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div
          className="content-block"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <img src={UploadBtn} alt="кнопка завантаження файлу" />
          {selectedFile ? (
            <p className="selected-file-name">Вибрано: {selectedFile.name}</p>
          ) : (
            <>
              <h2>Перетягніть фото сюди</h2>
              <p>Підтримуваний формат: PNG, JPG</p>
              <p>Або</p>
            </>
          )}
          <a href="#" onClick={handleFileClick}>
            {selectedFile ? "Вибрати інший файл" : "Шукати файл"}
          </a>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <div className="modal-buttons">
          <button className="secondaryBtn" onClick={onClose}>
            Відмінити
          </button>
          <button
            className="primaryBtn"
            onClick={handleUploadPhoto}
            disabled={uploadingPhoto || !selectedFile}
          >
            {uploadingPhoto ? "Завантаження..." : "Завантажити"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePhoto;
