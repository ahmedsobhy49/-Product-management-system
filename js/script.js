// DOM elements
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const productCategory = document.querySelector("#product-category");
const productDesc = document.querySelector("#product-desc");
const btnAdd = document.querySelector("#btn-add");
const tableBody = document.querySelector("#table-body");
const search = document.querySelector("#search");
let update = false;
// Local storage initialization
let products = JSON.parse(localStorage.getItem("products")) || [];

// Event listeners
search.addEventListener("keyup", handleSearch);
btnAdd.addEventListener("click", handleAddProduct);

// Initial display of products
updateAndDisplayProducts();

// Functions
function removeProduct(index) {
  products.splice(index, 1);
  updateAndDisplayProducts();
}

function displayProducts(arr) {
  tableBody.innerHTML = arr
    .map((item, index) => generateTableRow(item, index))
    .join("");
}

function generateTableRow(item, index) {
  return `
    <tr class="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Product Name</span>
        ${item.productName}
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Product Price</span>
        ${item.productPrice}$
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Product Category</span>
        ${item.productCategory}
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Product Desc</span>
        ${item.productDesc}
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Actions</span>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded" onclick="handleEdit(${index})">
          Edit
        </button>
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded" onclick="removeProduct(${index})">
          Delete
        </button>
      </td>
    </tr>
  `;
}

function clearInputs() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}

function searchProducts() {
  const searchTerm = search.value.trim().toLowerCase();
  const searchedArray = products.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm)
  );
  displayProducts(searchedArray);
}

function handleSearch(e) {
  e.preventDefault();
  searchProducts();
}

function handleAddProduct(e) {
  e.preventDefault();
  if (
    productName.value !== "" &&
    productPrice.value !== "" &&
    productCategory.value !== ""
  ) {
    if (!update) {
      {
        const product = {
          productName: productName.value.trim(),
          productPrice: productPrice.value.trim(),
          productCategory: productCategory.value.trim(),
          productDesc: productDesc.value.trim(),
        };
        products.push(product);
      }
    } else {
      products.splice(idx, 1, {
        productName: productName.value.trim(),
        productPrice: productPrice.value.trim(),
        productCategory: productCategory.value.trim(),
        productDesc: productDesc.value.trim(),
      });
      btnAdd.textContent = "Add Product";
      update = false;
    }
  }

  updateAndDisplayProducts();
  clearInputs();
}

function updateAndDisplayProducts() {
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts(products);
}

let idx;
function handleEdit(index) {
  idx = index;
  update = true;
  productName.value = products[index].productName;
  productPrice.value = products[index].productPrice;
  productCategory.value = products[index].productCategory;
  productDesc.value = products[index].productDesc;
  btnAdd.textContent = "Update";
}
