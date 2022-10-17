import { useContext } from "react";
import ProductsContext from "../../context/ManageProductsContext";
import c from "./form.module.css";

function Form() {
  const productsContxt = useContext(ProductsContext);
  const {
    loading,
    error,
    textData,
    imagePreviewed,
    onChangeTextData,
    getProduct,
    imagePreview,
  } = productsContxt;

  return error ? (
    <p>{error}</p>
  ) : loading ? (
    <p>Loading...</p>
  ) : (
    <form encType="multipart/form-data" onSubmit={getProduct}>
      <p>
        <label htmlFor="title">Title</label>
      </p>
      <input
        type="text"
        id="title"
        name="title"
        value={textData.title}
        onChange={onChangeTextData}
        required
      />

      <p>
        <label htmlFor="image">Image</label>
      </p>
      <div className={c.previewBox}>
        <input
          type="file"
          id="image"
          name="image"
          accept=""
          className={c.imagePicker}
          onChange={imagePreview}
          required
        />
        <img
          src={imagePreviewed}
          id="image-preview"
          alt={textData.title}
          className={c.previewer}
          style={{ display: imagePreviewed ? "block" : "none" }}
        />
      </div>

      <p>
        <label htmlFor="summary">Summary</label>
      </p>
      <input
        type="text"
        id="summary"
        name="summary"
        maxLength="250"
        value={textData.summary}
        onChange={onChangeTextData}
        required
      />

      <p>
        <label htmlFor="price">Price</label>
      </p>
      <input
        type="number"
        id="price"
        name="price"
        min="0.01"
        step="0.01"
        value={textData.price}
        onChange={onChangeTextData}
        required
      />

      <p>
        <label htmlFor="instock">In Stock</label>
      </p>
      <input
        type="number"
        id="instock"
        name="instock"
        min="0"
        step="1"
        value={textData.instock}
        onChange={onChangeTextData}
        required
      />

      <p>
        <label htmlFor="description">Description</label>
      </p>
      <textarea
        id="description"
        name="description"
        rows="7"
        value={textData.description}
        onChange={onChangeTextData}
        required
      ></textarea>

      <p>
        <button type="reset" className="btn alt-reset">
          Reset
        </button>
        <button className="btn" type="submit">
          Save
        </button>
      </p>
    </form>
  );
}

export default Form;
