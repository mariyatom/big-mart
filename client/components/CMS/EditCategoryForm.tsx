import '../../styles/EditCategoryForm.scss'

interface EditCategoryFormProps {
  formData: {
    category: string
    link: string
    image: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
}

function EditCategoryForm({
  formData,
  onChange,
  onSubmit,
}: EditCategoryFormProps) {
  const imageSrc =
    formData.image.trim() !== ''
      ? formData.image
      : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
  return (
    <form className="admin-edit-category-form" onSubmit={onSubmit}>
      <label className="admin-label">
        Category Name:
        <input
          className="admin-input"
          type="text"
          name="category"
          value={formData.category}
          onChange={onChange}
          required
        />
      </label>
      <label className="admin-label">
        Link:
        <input
          className="admin-input"
          type="text"
          name="link"
          value={formData.link}
          onChange={onChange}
          required
        />
      </label>
      <label className="admin-label">
        Image URL:
        <div className="admin-image-preview">
          <img
            className="admin-edit-cate-img"
            src={imageSrc}
            alt="category preview"
          />
        </div>
        <input
          className="admin-input"
          type="text"
          name="image"
          value={formData.image}
          onChange={onChange}
        />
      </label>
      <button className="admin-button" type="submit">
        Save Changes
      </button>
    </form>
  )
}

export default EditCategoryForm
