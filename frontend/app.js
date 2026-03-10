const apiBase = window.location.origin;

function createProductListItem(product) {
  const item = document.createElement('li');
  item.className = 'product-list__item';

  const meta = document.createElement('div');
  meta.className = 'product-list__meta';

  const name = document.createElement('span');
  name.className = 'product-list__name';
  name.textContent = product.name;

  const category = document.createElement('span');
  category.className = 'product-list__category';
  category.textContent = `Category: ${product.category}`;

  meta.append(name, category);

  const price = document.createElement('span');
  price.className = 'product-list__price';
  price.textContent = `$${Number(product.price).toFixed(2)}`;

  const description = document.createElement('p');
  description.className = 'product-list__description';
  description.textContent = product.description || 'No description provided.';

  item.append(meta, price, description);
  return item;
}

async function fetchProducts() {
  const response = await fetch(`${apiBase}/api/products`);
  if (!response.ok) {
    throw new Error('Failed to load products');
  }

  const products = await response.json();
  return products;
}

async function createProduct(payload) {
  const response = await fetch(`${apiBase}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create product');
  }

  return response.json();
}

async function renderProducts() {
  const list = document.getElementById('productList');
  list.innerHTML = '<li class="product-list__item">Loading…</li>';

  try {
    const products = await fetchProducts();
    list.innerHTML = '';

    if (products.length === 0) {
      list.innerHTML = '<li class="product-list__item">No products yet.</li>';
      return;
    }

    products.forEach((product) => {
      list.appendChild(createProductListItem(product));
    });
  } catch (error) {
    list.innerHTML = '<li class="product-list__item">Unable to load products.</li>';
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

function setupForm() {
  const form = document.getElementById('productForm');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: formData.get('name').trim(),
      category: Number(formData.get('category')),
      price: Number(formData.get('price')),
      description: formData.get('description').trim(),
    };

    if (!payload.name || Number.isNaN(payload.category) || Number.isNaN(payload.price)) {
      return;
    }

    try {
      await createProduct(payload);
      form.reset();
      await renderProducts();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      alert('Could not add product. Please try again.');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupForm();
  renderProducts();
});
