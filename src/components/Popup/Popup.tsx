import { useState } from "react";
import styles from "./Popup.module.css";

interface FormPopupProps {
  lat: number;
  lng: number;
  onClose: () => void;
  onSubmit: (formData: FormData) => void; // gửi toàn bộ dữ liệu
}

export default function Popup({ lat, lng, onClose, onSubmit }: FormPopupProps) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    area: "",
    owner: "",
    contact: "",
    address: "",
    email: "",
    status: "on",
    description: "",
    image: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const data = new FormData();
    data.append("lat", lat.toString());
    data.append("lng", lng.toString());
    data.append("name", form.name);
    data.append("type", form.type);
    data.append("area", form.area);
    data.append("owner", form.owner);
    data.append("contact", form.contact);
    data.append("address", form.address);
    data.append("email", form.email);
    data.append("status", form.status);
    data.append("description", form.description);
    console.log(form.image);
    console.log(form.image instanceof File);
    if (form.image instanceof File) {
    data.append("image", form.image);
  } else {
    data.append("image", new Blob([]), "");
  }
    onSubmit(data);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.box}>
        <h3>Thêm mô tả</h3>
        <p>
          <b>Lat:</b> {lat.toFixed(6)} <br />
          <b>Lng:</b> {lng.toFixed(6)}
        </p>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Tên đơn vị</label>
            <input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className={styles.field}>
            <label>Loại hình</label>
            <input name="type" value={form.type} onChange={handleChange} />
          </div>

          <div className={styles.field}>
            <label>Diện tích sản xuất</label>
            <input name="area" value={form.area} onChange={handleChange} />
          </div>

          <div className={styles.field}>
            <label>Chủ đơn vị</label>
            <input name="owner" value={form.owner} onChange={handleChange} />
          </div>

          <div className={styles.field}>
            <label>Liên hệ</label>
            <input name="contact" value={form.contact} onChange={handleChange} />
          </div>

          <div className={styles.field}>
            <label>Địa chỉ</label>
            <input name="address" value={form.address} onChange={handleChange} />
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} />
          </div>

          <div className={styles.field}>
            <label>Trạng thái</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="on">Hoạt động</option>
              <option value="off">Ngừng hoạt động</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Hình ảnh</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          {previewUrl && (
            <div className={styles.imagePreview}>
              <img src={previewUrl} alt="Preview" />
            </div>
          )}
        </div>

        <div className={styles.textareaField}>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Nhập mô tả..."
          />
        </div>

        <div className={styles.buttonRow}>
          <button className={styles.btnPrimary} onClick={handleSubmit}>
            Lưu
          </button>
          <button className={styles.btnSecondary} onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
