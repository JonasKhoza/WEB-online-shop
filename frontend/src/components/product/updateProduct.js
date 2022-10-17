import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import c from "../form/form.module.css";

function UpdateProduct() {
  const params = useParams();
  const Navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [textData, setTextData] = useState({
    title: "",
    summary: "",
    price: "",
    instock: "",
    description: "",
  });
  const [imagePreviewed, setImagePreviewed] = useState("");

  function onChangeTextData(event) {
    const { name, value } = event.target;
    setTextData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    async function getProduct() {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/admin/all-products/${params.id}`
        );
        setLoading(false);
        if (res.ok) {
          const product = await res.json();

          setTextData(product.product);
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    }
    getProduct();
  }, [params.id]);

  /*
   function updateProduct(id) {
    useEffect(() => {
      async function getProduct() {
        try {
          const res = await fetch(`/admin/all-products/${id}`);
          setLoading(false);
          if (res.ok) {
            const product = await res.json();
            setProducts(product);
          }
        } catch (error) {
           console.log(error);
        setError(error.message);
        }
      }
      getProduct();
    }, [id]);
  }
  */
  async function updateProduct(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append("title", textData.title);
    formData.append("image", image);
    formData.append("summary", textData.summary);
    formData.append("price", textData.price);
    formData.append("instock", textData.instock);
    formData.append("description", textData.description);
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/admin/all-products/${params.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      setLoading(false);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        Navigate("/admin/all-products");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  const imagePreviwer = document.getElementById("image-preview");

  function imagePreview(event) {
    setImage(event.target.files[0]);
    const files = event.target.files;

    if (!files || files.length < 0) {
      imagePreviwer.style.display = "none";
      return;
    }
    const pickedImage = files[0];
    setImagePreviewed(URL.createObjectURL(pickedImage));
  }

  return (
    <main>
      <h1>Update Product</h1>
      {loading ? (
        <p style={{ marginTop: "3rem" }}>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        textData && (
          <form encType="multipart/form-data" onSubmit={updateProduct}>
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
              <label htmlFor="stockNumber">In Stock</label>
            </p>
            <input
              type="number"
              id=" instock"
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
                Update
              </button>
            </p>
          </form>
        )
      )}
    </main>
  );
}

export default UpdateProduct;
