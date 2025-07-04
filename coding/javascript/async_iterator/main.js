// Ejemplo: Consumir una API paginada ficticia con async iterator
async function* fetchPages() {
  let page = 1,
    hasMore = true;
  while (hasMore) {
    const res = await fetch(`/api/data?page=${page}`);
    const { data, next } = await res.json();
    for (const item of data) yield item;
    hasMore = next;
    page++;
  }
}

(async () => {
  for await (const item of fetchPages()) {
    console.log(item);
  }
})();
