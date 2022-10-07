export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const requestJson = await request.json();
  return requestJson;
}

export async function getProductsFromCategoryAndQuery(id, query) {
  let result;
  if (id && query) {
    const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}q=${query}`);
    result = await request.json();
  }
  if (id) {
    const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}`);
    result = await request.json();
  }
  if (query) {
    const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    result = await request.json();
  }
  return result;
}

export async function getProductById(id) {
  const request = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const requestJson = await request.json();
  return requestJson;
}
