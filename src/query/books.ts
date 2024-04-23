import query from ".";

type BookItem = { isbn: string; name: string };

export default async function queryBooks(offset = 0): Promise<BookItem[]> {
  const limit = 1000;
  const res1 = await query({
    collectionName: "Books1",
    dataQuery: {
      filter: {},
      sort: [{ fieldName: "isbn", order: "ASC" }],
      paging: { offset, limit },
      fields: [],
    },
    options: {},
    includeReferencedItems: [],
    segment: "LIVE",
    appId: "4f9cb406-007a-45ab-a398-b6358eeab675",
  });
  const data = await res1.json();
  const { hasNext } = data.pagingMetadata;
  const items = data.items.map(({ isbn, name }: BookItem) => ({
    isbn,
    name,
  }));
  if (hasNext) return [...items, ...(await queryBooks(offset + 1000))];
  return items;
}
