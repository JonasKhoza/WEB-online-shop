import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductsContext = createContext({
  products: [],
  loading: false,
  error: "",
});

export function ManageProductsContext(props) {
  const Navigate = useNavigate();

  const [imagePreviewed, setImagePreviewed] = useState("");
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [textData, setTextData] = useState({
    title: "",
    summary: "",
    price: "",
    instock: "",
    description: "",
  });

  const [image, setImage] = useState("");

  function onChangeTextData(event) {
    const { name, value } = event.target;
    setTextData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  async function getProduct(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append("title", textData.title);
    formData.append("image", image);
    formData.append("summary", textData.summary);
    formData.append("price", textData.price);
    formData.append("inStock", textData.instock);
    formData.append("description", textData.description);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/admin/all-products/new", {
        method: "POST",
        body: formData,
      });
      setLoading(false);
      if (res.ok) {
        Navigate("/admin/all-products");
      }
    } catch (err) {
      console.log(err);
      return setError(err.message);
    }
  }
  //UPDATE PRODUCT

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/");
        setLoading(false);
        if (res.ok) {
          const products = await res.json();
          setProducts(products.products);
        } else {
          const error = await res.json();
          setError(error.message);
        }
      } catch (error) {
        setError(error.message);
      }
    }
    getProducts();
  }, []);

  async function deleteProduct(productId) {
    console.log(productId);
    try {
      const res = await fetch(
        `http://localhost:5000/admin/all-products/${productId}`,
        {
          method: "DELETE",
        }
      );
      Navigate("/admin/all-products");
      if (res.ok) {
        setProducts((prevProducts) => {
          return prevProducts.filter((product) => {
            return product._id !== productId;
          });
        });
        console.log("I did");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  function imagePreview(event) {
    setImage(event.target.files[0]);
    const files = event.target.files;
    if (!files || files.length < 0) {
      return;
    }
    const pickedImage = files[0];

    setImagePreviewed(URL.createObjectURL(pickedImage));
  }

  const context = {
    products: products,
    loading: loading,
    error: error,
    textData: textData,
    image: image,

    imagePreviewed: imagePreviewed,
    onChangeTextData: onChangeTextData,
    getProduct: getProduct,
    deleteProduct: deleteProduct,
    imagePreview: imagePreview,
  };

  return (
    <ProductsContext.Provider value={context}>
      {props.children}
    </ProductsContext.Provider>
  );
}

export default ProductsContext;
